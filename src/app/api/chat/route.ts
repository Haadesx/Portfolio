import { assistantContext } from "@/lib/assistant-context";

const MAX_BODY_BYTES = 24_000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1_800;
const MODEL = "nvidia/nemotron-3.5-lightning:free";

async function readBody(request: Request) {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  try { return JSON.parse(text) as unknown; } catch { return null; }
}

export async function POST(request: Request) {
  const body = await readBody(request);
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > MAX_MESSAGES) {
    return Response.json({ error: "Please send a short conversation and try again." }, { status: 400 });
  }

  const messages = body.messages;
  if (!messages.every((message) => message && typeof message === "object" && (message.role === "user" || message.role === "assistant") && typeof message.content === "string" && message.content.trim().length > 0 && message.content.length <= MAX_MESSAGE_LENGTH) || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Please send a valid message and try again." }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return Response.json({ error: "The assistant is not configured yet." }, { status: 503 });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.initvaresh.com",
        "X-Title": "Varesh Patel Portfolio",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: assistantContext }, ...messages.map((message) => ({ role: message.role, content: message.content }))],
        max_tokens: 650,
        temperature: 0.4,
        reasoning: { enabled: false },
      }),
      signal: AbortSignal.timeout(25_000),
      cache: "no-store",
    });
    if (!response.ok) {
      return Response.json({ error: response.status === 429 ? "The assistant is busy. Please try again shortly." : "The assistant is temporarily unavailable. Please try again." }, { status: response.status === 429 ? 429 : 502 });
    }
    const result = await response.json();
    const answer = result?.choices?.[0]?.message?.content;
    if (typeof answer !== "string" || !answer.trim()) {
      return Response.json({ error: "The assistant could not produce an answer. Please try again." }, { status: 502 });
    }
    return Response.json({ answer: answer.trim() });
  } catch {
    return Response.json({ error: "The assistant is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
