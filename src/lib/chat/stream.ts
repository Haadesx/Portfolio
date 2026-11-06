import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessage,
  type UIMessageChunk,
} from 'ai';

/**
 * Deterministic (non-model) responses for `/api/chat` (E-10/E-34).
 *
 * These are emitted as a real AI SDK v5 UI-message stream so the existing
 * `useChat` client (`CinematicChat`, `chat.tsx`) renders them exactly like a
 * model answer. Verified against `ai@5.0.179`.
 */

/** Safe copy used if a caller accidentally hands us empty text. Never blank. */
export const EMPTY_TEXT_FALLBACK =
  "I wasn't able to produce an answer for that. Please try rephrasing your question, or reach Varesh through the contact details on this site.";

export const DETERMINISTIC_SOURCE_HEADER = 'deterministic';

function createId(prefix: string): string {
  const cryptoApi = globalThis.crypto as Crypto | undefined;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return `${prefix}-${cryptoApi.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function buildHeaders(headersInit: HeadersInit | undefined): Headers {
  const headers = new Headers(headersInit);
  headers.set('x-chat-source', DETERMINISTIC_SOURCE_HEADER);
  headers.set('cache-control', 'no-store');
  headers.delete('content-type');
  headers.delete('connection');
  headers.delete('x-vercel-ai-ui-message-stream');
  headers.delete('x-accel-buffering');
  return headers;
}

/**
 * Build a one-text-part UI-message stream response.
 * The stream is a valid AI SDK v5 chunk sequence: start → text → finish.
 */
export function createTextResponse(
  text: string,
  init?: { status?: number; headers?: HeadersInit }
): Response {
  const safeText = typeof text === 'string' && text.trim().length > 0
    ? text
    : EMPTY_TEXT_FALLBACK;
  const messageId = createId('msg');
  const textId = createId('text');

  const stream = createUIMessageStream<UIMessage>({
    execute({ writer }) {
      writer.write({ type: 'start', messageId });
      writer.write({ type: 'text-start', id: textId });
      writer.write({ type: 'text-delta', id: textId, delta: safeText });
      writer.write({ type: 'text-end', id: textId });
      writer.write({ type: 'finish', finishReason: 'stop' });
    },
    onError: () => 'An error occurred.',
  });

  return createUIMessageStreamResponse({
    status: init?.status ?? 200,
    headers: buildHeaders(init?.headers),
    stream,
  });
}

type FinishChunk = Extract<UIMessageChunk, { type: 'finish' }>;

/**
 * Defensive guard for model streams (E-10 blank-answer reliability).
 *
 * `prepareStep` in the route forces a final text-only step, so this should
 * never fire. If the provider still ends a turn without any non-whitespace
 * text (e.g. a pure tool-call turn / malformed provider stream), we append a
 * safe fallback text part before the `finish` chunk instead of returning a
 * blank assistant message. The terminal `finish` chunk is held until the
 * source stream closes so the fallback is always ordered before it.
 */
export function guardModelTextStream(
  source: ReadableStream<UIMessageChunk>,
  options: { fallbackText: string; onEmptyText?: () => void }
): ReadableStream<UIMessageChunk> {
  const fallbackText =
    typeof options.fallbackText === 'string' && options.fallbackText.trim().length > 0
      ? options.fallbackText
      : EMPTY_TEXT_FALLBACK;
  const fallbackId = createId('fallback');

  let sawText = false;
  let sawAbort = false;
  let pendingFinish: FinishChunk | null = null;

  const transform = new TransformStream<UIMessageChunk, UIMessageChunk>({
    transform(chunk, controller) {
      if (chunk.type === 'text-delta' && chunk.delta.trim().length > 0) {
        sawText = true;
      }
      if (chunk.type === 'abort') {
        sawAbort = true;
      }
      if (chunk.type === 'finish') {
        pendingFinish = chunk;
        return;
      }
      controller.enqueue(chunk);
    },
    flush(controller) {
      if (!sawText && !sawAbort) {
        try {
          options.onEmptyText?.();
        } catch {
          // Logging must never break the stream.
        }
        controller.enqueue({ type: 'text-start', id: fallbackId });
        controller.enqueue({
          type: 'text-delta',
          id: fallbackId,
          delta: fallbackText,
        });
        controller.enqueue({ type: 'text-end', id: fallbackId });
      }
      if (sawAbort) {
        controller.enqueue(pendingFinish ?? { type: 'finish', finishReason: 'other' });
        return;
      }
      if (!sawText) {
        // A fallback text part was injected, so the turn finished with text.
        controller.enqueue(
          pendingFinish
            ? { ...pendingFinish, type: 'finish', finishReason: 'stop' }
            : { type: 'finish', finishReason: 'stop' }
        );
        return;
      }
      controller.enqueue(pendingFinish ?? { type: 'finish', finishReason: 'stop' });
    },
  });

  return source.pipeThrough(transform);
}
