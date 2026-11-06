import { createOpenAI } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  type StreamTextResult,
} from 'ai';

import { getDeterministicReply } from '@/lib/chat/deterministic';
import {
  checkRateLimit,
  getClientIp,
  hashClientIp,
} from '@/lib/chat/rate-limit';
import { assessScope } from '@/lib/chat/scope';
import { createTextResponse, guardModelTextStream } from '@/lib/chat/stream';
import {
  CHAT_ERROR_MESSAGES,
  CHAT_LIMITS,
  countTextChars,
  parseChatRequest,
} from '@/lib/chat/validation';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';

export const maxDuration = 60;
export const runtime = 'nodejs';

const CHAT_MODEL = 'nvidia/nemotron-3.5-lightning:free';

const FALLBACK_TEXT =
  "I wasn't able to finish that answer just now. Please try asking again, or reach Varesh through the contact details on this site.";

type LogFields = Record<string, unknown>;

function logEvent(event: string, fields: LogFields): void {
  try {
    console.log(
      JSON.stringify({ event, timestamp: new Date().toISOString(), ...fields })
    );
  } catch {
    // Logging must never break a request.
  }
}

function logError(event: string, fields: LogFields): void {
  try {
    console.error(
      JSON.stringify({ event, timestamp: new Date().toISOString(), ...fields })
    );
  } catch {
    // Logging must never break a request.
  }
}

function describeError(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  if (typeof error === 'string') {
    return { name: 'Error', message: error };
  }
  return { name: 'UnknownError', message: 'A non-error value was thrown.' };
}

function createRequestId(): string {
  const cryptoApi = globalThis.crypto as Crypto | undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }
  return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function jsonResponse(
  body: unknown,
  status: number,
  headers?: HeadersInit
): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set('content-type', 'application/json; charset=utf-8');
  responseHeaders.set('cache-control', 'no-store');
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

function isChatDisabled(): boolean {
  return (process.env.CHAT_DISABLED ?? '').trim().toLowerCase() === 'true';
}

function hasJsonContentType(req: Request): boolean {
  const raw = req.headers.get('content-type');
  if (!raw) return true;
  const mime = raw.split(';')[0]?.trim().toLowerCase();
  if (!mime) return true;
  return (
    mime === 'application/json' ||
    mime === 'application/x-json' ||
    (mime.startsWith('application/') && mime.endsWith('+json'))
  );
}

type BodyReadResult =
  | { ok: true; text: string }
  | { ok: false; status: 400 | 413 };

/**
 * Read the request body through a capped reader so an oversized payload is never
 * buffered in full. `content-length` is checked first (advisory) but the actual
 * streamed byte count is authoritative.
 */
async function readBodyWithLimit(
  req: Request,
  maxBytes: number
): Promise<BodyReadResult> {
  const declared = req.headers.get('content-length');
  if (declared) {
    const declaredBytes = Number.parseInt(declared, 10);
    if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) {
      return { ok: false, status: 413 };
    }
  }

  if (!req.body) {
    return { ok: true, text: '' };
  }

  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = '';

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) {
        try {
          await reader.cancel();
        } catch {
          // Ignore cancellation failures; we already have our answer.
        }
        return { ok: false, status: 413 };
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return { ok: true, text };
  } catch {
    return { ok: false, status: 400 };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // Ignore double-release errors.
    }
  }
}

const tools = {
  getProjects,
  getPresentation,
  getResume,
  getContact,
  getSkills,
  getSports,
  getCrazy,
  getInternship,
};

export async function POST(req: Request): Promise<Response> {
  const startedAt = Date.now();
  const requestId = createRequestId();
  const ipHash = hashClientIp(getClientIp(req));

  try {
    // 1. Kill switch — before reading the body or calling the provider.
    if (isChatDisabled()) {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: 'disabled',
        status: 503,
      });
      return jsonResponse(
        { error: CHAT_ERROR_MESSAGES.serviceUnavailable },
        503
      );
    }

    // 2. Content type — reject non-JSON bodies before reading them.
    if (!hasJsonContentType(req)) {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: 'unsupported-media-type',
        status: 415,
      });
      return jsonResponse(
        { error: CHAT_ERROR_MESSAGES.unsupportedMediaType },
        415
      );
    }

    // 3. Body size guard (declared + actual bytes).
    const body = await readBodyWithLimit(req, CHAT_LIMITS.maxBodyBytes);
    if (!body.ok) {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: body.status === 413 ? 'body-too-large' : 'body-unreadable',
        status: body.status,
      });
      return jsonResponse(
        {
          error:
            body.status === 413
              ? CHAT_ERROR_MESSAGES.bodyTooLarge
              : CHAT_ERROR_MESSAGES.badBody,
        },
        body.status
      );
    }

    // 4. JSON parse — never echo the parser error.
    let json: unknown;
    try {
      json = JSON.parse(body.text);
    } catch {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: 'invalid-json',
        status: 400,
      });
      return jsonResponse({ error: CHAT_ERROR_MESSAGES.badBody }, 400);
    }

    // 5. Schema sanitization — untrusted input is stripped before any model call.
    const parsed = parseChatRequest(json);
    if (!parsed.ok) {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: 'invalid-schema',
        status: parsed.status,
      });
      return jsonResponse({ error: parsed.error }, parsed.status);
    }

    const messages = parsed.value.messages;
    const messageCount = messages.length;
    const inputChars = countTextChars(messages);

    // 6. Per-client rate limit.
    const rateLimit = await checkRateLimit(req);
    if (!rateLimit.allowed) {
      logEvent('chat_rate_limited', {
        requestId,
        ipHash,
        limit: rateLimit.limit,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
        backend: rateLimit.backend,
      });
      return jsonResponse(
        { error: CHAT_ERROR_MESSAGES.rateLimited },
        429,
        {
          'Retry-After': String(rateLimit.retryAfterSeconds),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': String(rateLimit.remaining),
          'X-RateLimit-Reset': String(rateLimit.retryAfterSeconds),
        }
      );
    }

    // 7. Misconfiguration — no provider key means no model-backed replies.
    const apiKey = (process.env.OPENROUTER_API_KEY ?? '').trim();
    if (!apiKey) {
      logEvent('chat_rejected', {
        requestId,
        ipHash,
        reason: 'misconfigured',
        status: 503,
      });
      return jsonResponse(
        { error: CHAT_ERROR_MESSAGES.serviceUnavailable },
        503
      );
    }

    // 8. Deterministic replies — no model call, no quota use.
    let deterministic: ReturnType<typeof getDeterministicReply> = null;
    try {
      deterministic = getDeterministicReply(messages);
    } catch (error) {
      logError('chat_error', {
        requestId,
        ipHash,
        stage: 'deterministic',
        error: describeError(error),
      });
    }

    if (deterministic) {
      logEvent('chat_completed', {
        requestId,
        ipHash,
        source: 'deterministic',
        category: deterministic.category,
        latencyMs: Date.now() - startedAt,
        messageCount,
        inputChars,
        backend: rateLimit.backend,
      });
      return createTextResponse(deterministic.text, {
        headers: { 'x-request-id': requestId },
      });
    }

    // 9. Scope gate — deterministic redirect for off-topic requests.
    let scope: ReturnType<typeof assessScope> = { allowed: true };
    try {
      scope = assessScope(messages);
    } catch (error) {
      logError('chat_error', {
        requestId,
        ipHash,
        stage: 'scope',
        error: describeError(error),
      });
    }

    if (!scope.allowed) {
      logEvent('chat_completed', {
        requestId,
        ipHash,
        source: 'deterministic',
        category: scope.category,
        latencyMs: Date.now() - startedAt,
        messageCount,
        inputChars,
        backend: rateLimit.backend,
      });
      return createTextResponse(scope.reply, {
        headers: { 'x-request-id': requestId },
      });
    }

    // 10. Model path.
    const openrouter = createOpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
      headers: {
        'HTTP-Referer': process.env.APP_URL ?? 'http://localhost:3000',
        'X-Title': 'Varesh Patel Portfolio',
      },
    });

    let result: StreamTextResult<typeof tools, unknown>;
    try {
      result = streamText({
        model: openrouter.chat(CHAT_MODEL),
        system: SYSTEM_PROMPT.content,
        messages: convertToModelMessages(messages),
        tools,
        maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
        stopWhen: stepCountIs(CHAT_LIMITS.maxSteps),
        // Tools are allowed only on step 0; every later step is forced to text.
        // This guarantees a final text answer instead of a zero-text tool turn.
        prepareStep: ({ stepNumber }) => {
          if (stepNumber === 0) return undefined;
          return { toolChoice: 'none' };
        },
        // Cancel the upstream generation when the browser disconnects (E-41).
        abortSignal: req.signal,
        onError: ({ error }) => {
          // Full detail server-side only; the client gets a safe in-stream message.
          logError('chat_error', {
            requestId,
            ipHash,
            stage: 'stream',
            error: describeError(error),
          });
        },
        onFinish: ({ steps, totalUsage, finishReason, text }) => {
          const toolCalls = steps.reduce(
            (total, step) => total + step.toolCalls.length,
            0
          );
          logEvent('chat_completed', {
            requestId,
            ipHash,
            source: 'model',
            latencyMs: Date.now() - startedAt,
            messageCount,
            inputChars,
            toolCalls,
            finishReason,
            textChars: text.length,
            usage: {
              inputTokens: totalUsage.inputTokens ?? null,
              outputTokens: totalUsage.outputTokens ?? null,
              totalTokens: totalUsage.totalTokens ?? null,
            },
            backend: rateLimit.backend,
          });
        },
      });
    } catch (error) {
      logError('chat_error', {
        requestId,
        ipHash,
        stage: 'create',
        error: describeError(error),
      });
      return jsonResponse({ error: CHAT_ERROR_MESSAGES.providerFailure }, 502);
    }

    // In-stream errors are masked with a fixed safe string.
    const uiStream = result.toUIMessageStream({
      onError: () => CHAT_ERROR_MESSAGES.providerFailure,
    });

    return createUIMessageStreamResponse({
      stream: guardModelTextStream(uiStream, {
        fallbackText: FALLBACK_TEXT,
        onEmptyText: () => {
          logEvent('chat_empty_text', {
            requestId,
            ipHash,
            latencyMs: Date.now() - startedAt,
            messageCount,
            inputChars,
          });
        },
      }),
      headers: {
        'x-chat-source': 'model',
        'x-request-id': requestId,
      },
    });
  } catch (error) {
    logError('chat_error', {
      requestId,
      ipHash,
      stage: 'request',
      error: describeError(error),
    });
    return jsonResponse({ error: CHAT_ERROR_MESSAGES.internal }, 500);
  }
}
