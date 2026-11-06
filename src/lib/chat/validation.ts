import type { UIMessage } from 'ai';

/**
 * Hard limits for the chat API trust boundary (E-32).
 *
 * The client is untrusted: everything in the request body is sanitized by
 * `parseChatRequest` before it can reach `streamText` or the provider.
 * Keep these values in sync with `docs/chat-operations.md`.
 */
export const CHAT_LIMITS = {
  /** Maximum raw request body size, in UTF-8 bytes. */
  maxBodyBytes: 32_768,
  /** Maximum number of messages accepted in one request (before sanitization). */
  maxMessages: 24,
  /** Maximum total characters of retained text across the conversation. */
  maxTotalTextChars: 12_000,
  /** Maximum characters in a single text part. */
  maxTextPartChars: 4_000,
  /** Maximum output tokens for the model (also caps cost). */
  maxOutputTokens: 1200,
  /** Maximum model/tool steps per request. Step 0 may call tools, later steps are text-only. */
  maxSteps: 3,
} as const;

export type ChatLimits = typeof CHAT_LIMITS;

/** Shape accepted by `parseChatRequest`. Only user/assistant text parts survive. */
export type ParsedChatRequest = { messages: UIMessage[] };

export type ChatRequestErrorStatus = 400 | 413 | 415 | 422;

/**
 * Safe, client-facing error shape. Messages are fixed generic strings: the
 * sanitizer never echoes request content or a thrown exception (E-34).
 */
export type ChatRequestError = {
  ok: false;
  status: ChatRequestErrorStatus;
  error: string;
};

export type ParseChatRequestResult =
  | { ok: true; value: ParsedChatRequest }
  | ChatRequestError;

/** Fixed, safe error strings. No request content is ever interpolated. */
export const CHAT_ERROR_MESSAGES = {
  badBody: 'Request body must be a JSON object.',
  badMessages: 'Request body must contain a messages array.',
  badMessage: 'Each message must be an object with a parts array.',
  tooManyMessages: 'Too many messages in this conversation.',
  textPartTooLong: 'A message is too long.',
  conversationTooLong: 'This conversation is too long.',
  noUserMessage: 'At least one user message is required.',
  lastMessageNotUser: 'The last message must be from the user.',
  bodyTooLarge: 'Request body is too large.',
  unsupportedMediaType: 'Content-Type must be application/json.',
  rateLimited: 'Too many requests. Please wait a moment and try again.',
  serviceUnavailable: 'Chat is temporarily unavailable.',
  providerFailure:
    'The assistant is temporarily unavailable. Please try again in a moment.',
  internal: 'Something went wrong. Please try again.',
  unknown: 'The request could not be processed.',
} as const;

const MAX_MESSAGE_ID_LENGTH = 128;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function generateMessageId(role: 'user' | 'assistant'): string {
  const cryptoApi = globalThis.crypto as Crypto | undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${role}-${cryptoApi.randomUUID()}`;
  }
  return `${role}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function isValidMessageId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= MAX_MESSAGE_ID_LENGTH
  );
}

function fail(status: ChatRequestErrorStatus, error: string): ChatRequestError {
  return { ok: false, status, error };
}

/**
 * Sanitize an untrusted `/api/chat` body (E-33).
 *
 * Security invariants:
 * - only `role: 'user' | 'assistant'` survives; `system` and unknown roles are dropped;
 * - only `{ type: 'text', text: string }` parts survive; tool/file/reasoning/data/
 *   source/step parts and unknown fields are dropped (no client tool authority);
 * - empty messages and leading assistant messages are dropped;
 * - the conversation must end with a user message and contain at least one;
 * - message/text/total-char caps are enforced with the contract's 4xx statuses.
 *
 * This function never throws and never echoes input or exception text.
 */
export function parseChatRequest(input: unknown): ParseChatRequestResult {
  try {
    if (!isRecord(input)) {
      return fail(400, CHAT_ERROR_MESSAGES.badBody);
    }

    const rawMessages = input.messages;
    if (!Array.isArray(rawMessages)) {
      return fail(400, CHAT_ERROR_MESSAGES.badMessages);
    }
    if (rawMessages.length === 0) {
      return fail(422, CHAT_ERROR_MESSAGES.noUserMessage);
    }
    if (rawMessages.length > CHAT_LIMITS.maxMessages) {
      return fail(413, CHAT_ERROR_MESSAGES.tooManyMessages);
    }

    const messages: UIMessage[] = [];
    let totalChars = 0;

    for (const rawMessage of rawMessages) {
      if (!isRecord(rawMessage)) {
        return fail(400, CHAT_ERROR_MESSAGES.badMessage);
      }

      const role = rawMessage.role;
      // Never allow a client-supplied system role to reach the provider.
      if (role !== 'user' && role !== 'assistant') {
        continue;
      }

      const rawParts = rawMessage.parts;
      if (!Array.isArray(rawParts)) {
        return fail(400, CHAT_ERROR_MESSAGES.badMessage);
      }

      const parts: UIMessage['parts'] = [];

      for (const rawPart of rawParts) {
        if (!isRecord(rawPart)) continue;
        // Drop tool outputs, files, reasoning, data, sources, step markers and
        // anything else that is not a plain text part.
        if (rawPart.type !== 'text') continue;
        if (typeof rawPart.text !== 'string') continue;

        const text = rawPart.text;
        if (text.length > CHAT_LIMITS.maxTextPartChars) {
          return fail(413, CHAT_ERROR_MESSAGES.textPartTooLong);
        }

        totalChars += text.length;
        if (totalChars > CHAT_LIMITS.maxTotalTextChars) {
          return fail(413, CHAT_ERROR_MESSAGES.conversationTooLong);
        }

        if (text.trim().length === 0) continue;
        parts.push({ type: 'text', text });
      }

      // Drop messages that end up empty after sanitization.
      if (parts.length === 0) continue;

      const id = isValidMessageId(rawMessage.id)
        ? rawMessage.id
        : generateMessageId(role);

      messages.push({ id, role, parts });
    }

    // Drop assistant preamble(s): the model conversation must open with a user turn.
    while (messages.length > 0 && messages[0].role === 'assistant') {
      messages.shift();
    }

    if (!messages.some((message) => message.role === 'user')) {
      return fail(422, CHAT_ERROR_MESSAGES.noUserMessage);
    }
    if (messages[messages.length - 1].role !== 'user') {
      return fail(422, CHAT_ERROR_MESSAGES.lastMessageNotUser);
    }

    return { ok: true, value: { messages } };
  } catch {
    // Defensive: sanitization must never throw or leak exception text.
    return fail(400, CHAT_ERROR_MESSAGES.unknown);
  }
}

/** Count of characters of retained text (for structured logs). */
export function countTextChars(messages: UIMessage[]): number {
  let total = 0;
  for (const message of messages) {
    for (const part of message.parts) {
      if (part.type === 'text') total += part.text.length;
    }
  }
  return total;
}

