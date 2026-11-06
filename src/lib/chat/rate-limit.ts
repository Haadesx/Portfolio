import { createHash } from 'node:crypto';

/**
 * Per-client rate limiting for `/api/chat` (E-32).
 *
 * Backends:
 * - `upstash`: used when `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
 *   are configured. A single global window shared by all instances.
 * - `memory`: per-instance fixed window fallback. This is the default and it is
 *   NOT a global limit on serverless — each instance keeps its own counters.
 *   See `docs/chat-operations.md` for the deployment caveat.
 *
 * The limiter never throws: any backend failure falls back to the in-memory
 * window and, if even that misbehaves, the request is allowed so the chat does
 * not become unavailable because of the limiter.
 */

export type RateLimitBackend = 'upstash' | 'memory';

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  limit: number;
  remaining: number;
  backend: RateLimitBackend;
};

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_REQUESTS = 20;
const MIN_WINDOW_MS = 1_000;
const MAX_WINDOW_MS = 24 * 60 * 60 * 1_000;
const MIN_MAX_REQUESTS = 1;
const MAX_MAX_REQUESTS = 10_000;
const MEMORY_CLEANUP_THRESHOLD = 500;
const UPSTASH_TIMEOUT_MS = 1_500;

type MemoryEntry = { count: number; resetAt: number };

const memoryStore = new Map<string, MemoryEntry>();
let lastCleanupAt = 0;

function readPositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value.trim(), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Effective rate-limit configuration (env-driven, safe defaults). */
export function getRateLimitConfig(): {
  windowMs: number;
  max: number;
  disabled: boolean;
} {
  const windowMs = clamp(
    readPositiveInt(process.env.CHAT_RATE_LIMIT_WINDOW_MS, DEFAULT_WINDOW_MS),
    MIN_WINDOW_MS,
    MAX_WINDOW_MS
  );
  const max = clamp(
    readPositiveInt(process.env.CHAT_RATE_LIMIT_MAX, DEFAULT_MAX_REQUESTS),
    MIN_MAX_REQUESTS,
    MAX_MAX_REQUESTS
  );
  // Explicit, test-only escape hatch for local regression runs.
  const disabled =
    (process.env.CHAT_RATE_LIMIT_DISABLED ?? '').trim().toLowerCase() === 'true';
  return { windowMs, max, disabled };
}

function getUpstashCredentials(): { url: string; token: string } | null {
  const url = (process.env.UPSTASH_REDIS_REST_URL ?? '').trim().replace(/\/+$/, '');
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN ?? '').trim();
  if (!url || !token) return null;
  return { url, token };
}

function getConfiguredBackend(): RateLimitBackend {
  return getUpstashCredentials() ? 'upstash' : 'memory';
}

/**
 * Resolve the client identity for rate limiting.
 * Prefers the leftmost `x-forwarded-for` hop, then `x-real-ip`, else "unknown".
 */
export function getClientIp(req: Request): string {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
      const first = forwarded.split(',')[0]?.trim();
      if (first) return first;
    }
    const realIp = req.headers.get('x-real-ip')?.trim();
    if (realIp) return realIp;
  } catch {
    // Ignore malformed headers; fall through to the shared unknown bucket.
  }
  return 'unknown';
}

/**
 * Stable, non-reversible client identifier for logs. Never log the raw IP.
 */
export function hashClientIp(ip: string): string {
  try {
    return createHash('sha256').update(ip).digest('hex').slice(0, 16);
  } catch {
    return 'unavailable';
  }
}

function cleanupMemoryStore(now: number, windowMs: number): void {
  if (memoryStore.size < MEMORY_CLEANUP_THRESHOLD) return;
  if (now - lastCleanupAt < windowMs) return;
  lastCleanupAt = now;
  for (const [key, entry] of memoryStore) {
    if (entry.resetAt <= now) memoryStore.delete(key);
  }
}

function checkMemoryLimit(
  ip: string,
  windowMs: number,
  max: number,
  now: number
): RateLimitResult {
  cleanupMemoryStore(now, windowMs);

  let entry = memoryStore.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    memoryStore.set(ip, entry);
  }

  entry.count += 1;
  const allowed = entry.count <= max;
  return {
    allowed,
    retryAfterSeconds: allowed
      ? 0
      : Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    limit: max,
    remaining: Math.max(0, max - entry.count),
    backend: 'memory',
  };
}

async function upstashFetch(
  token: string,
  path: string
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTASH_TIMEOUT_MS);
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Upstash request failed with status ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function parseUpstashNumber(payload: unknown): number | null {
  if (typeof payload !== 'object' || payload === null) return null;
  const result = (payload as { result?: unknown }).result;
  if (typeof result === 'number' && Number.isFinite(result)) return result;
  if (typeof result === 'string') {
    const parsed = Number.parseInt(result, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

async function checkUpstashLimit(
  ip: string,
  windowMs: number,
  max: number
): Promise<RateLimitResult> {
  const credentials = getUpstashCredentials();
  if (!credentials) throw new Error('Upstash is not configured');

  const windowSeconds = Math.max(1, Math.ceil(windowMs / 1000));
  const key = encodeURIComponent(`chat:rate-limit:${ip}`);

  const incrementPayload = await upstashFetch(
    credentials.token,
    `${credentials.url}/incr/${key}`
  );
  const count = parseUpstashNumber(incrementPayload);
  if (count === null) throw new Error('Unexpected Upstash INCR response');

  // Set the expiry only when the window starts so the window is fixed.
  if (count === 1) {
    await upstashFetch(
      credentials.token,
      `${credentials.url}/expire/${key}/${windowSeconds}`
    ).catch(() => undefined);
  }

  const allowed = count <= max;
  let retryAfterSeconds = 0;

  if (!allowed) {
    try {
      const ttlPayload = await upstashFetch(
        credentials.token,
        `${credentials.url}/ttl/${key}`
      );
      const ttl = parseUpstashNumber(ttlPayload);
      retryAfterSeconds =
        ttl !== null && ttl > 0 ? Math.max(1, ttl) : windowSeconds;
    } catch {
      retryAfterSeconds = windowSeconds;
    }
  }

  return {
    allowed,
    retryAfterSeconds,
    limit: max,
    remaining: Math.max(0, max - count),
    backend: 'upstash',
  };
}

/**
 * Fixed-window rate-limit check for one request.
 * Never throws; on backend errors it falls back to the in-memory window.
 */
export async function checkRateLimit(req: Request): Promise<RateLimitResult> {
  const { windowMs, max, disabled } = getRateLimitConfig();
  const backend = getConfiguredBackend();

  if (disabled) {
    return {
      allowed: true,
      retryAfterSeconds: 0,
      limit: max,
      remaining: max,
      backend,
    };
  }

  const ip = getClientIp(req);
  const now = Date.now();

  if (backend === 'upstash') {
    try {
      return await checkUpstashLimit(ip, windowMs, max);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: 'chat_rate_limit_upstash_failed',
          message: error instanceof Error ? error.message : 'unknown error',
        })
      );
      // Fall through to the per-instance fallback.
    }
  }

  try {
    return checkMemoryLimit(ip, windowMs, max, now);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'chat_rate_limit_memory_failed',
        message: error instanceof Error ? error.message : 'unknown error',
      })
    );
    // Fail open: availability wins over throttling when the limiter is broken.
    return {
      allowed: true,
      retryAfterSeconds: 0,
      limit: max,
      remaining: max,
      backend: 'memory',
    };
  }
}

/** Test-only helper: clear the in-memory windows between test cases. */
export function resetRateLimitStateForTests(): void {
  memoryStore.clear();
  lastCleanupAt = 0;
}
