"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedPrompts = [
  "Who are you?",
  "What projects have you worked on?",
  "What are your skills?",
  "How can I contact you?",
];

export function ChatClient() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("query") ?? searchParams.get("q");
  const bootstrappedPrompt = useRef<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ask me about my projects, ML experience, resume, publications, or what kind of role I am targeting.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPrompt = useCallback(
    async (prompt: string) => {
      const value = prompt.trim();
      if (!value || isLoading) {
        return;
      }

      const nextMessages: Message[] = [...messages, { role: "user", content: value }];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: nextMessages }),
        });

        if (!response.ok) {
          throw new Error("The chat request failed.");
        }

        const data = (await response.json()) as { answer?: string };
        if (!data.answer) {
          throw new Error("No answer returned.");
        }

        setMessages((current) => [
          ...current,
          { role: "assistant", content: data.answer as string },
        ]);
      } catch (submissionError) {
        const message =
          submissionError instanceof Error
            ? submissionError.message
            : "Something went wrong.";
        setError(message);
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content:
              "I hit a configuration problem while answering. Check your OpenRouter environment variables and try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitPrompt(input);
  }

  useEffect(() => {
    if (!initialPrompt || bootstrappedPrompt.current === initialPrompt) {
      return;
    }

    bootstrappedPrompt.current = initialPrompt;

    const timer = window.setTimeout(() => {
      void submitPrompt(initialPrompt);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [initialPrompt, submitPrompt]);

  const messageCount = useMemo(
    () => messages.filter((message) => message.role === "assistant").length,
    [messages],
  );

  return (
    <section className="relative h-screen overflow-hidden dark:bg-slate-950">
      <div className="absolute top-6 right-6 z-20 md:right-8">
        <Link
          href="/"
          className="rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-lg transition hover:bg-white dark:border-white/15 dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-900"
        >
          Back
        </Link>
      </div>

      <div className="fixed top-0 right-0 left-0 z-10 bg-gradient-to-b from-white via-white/95 via-50% to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent">
        <div className="py-6">
          <div className="flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300">
              <div className="relative">
                <Image
                  src={portfolio.avatar}
                  alt="Varesh Patel"
                  width={112}
                  height={112}
                  className="h-28 w-28 rounded-full object-cover shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                />
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{portfolio.name}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Ask about my work, projects, and resume.</p>
            {messages.filter((message) => message.role === "user").at(-1) ? (
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                {messages.filter((message) => message.role === "user").at(-1)?.content}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-full max-w-3xl flex-col">
        <div
          className="flex-1 overflow-y-auto px-4 pb-28"
          style={{ paddingTop: "180px" }}
        >
          {messages.length === 1 && !isLoading ? (
            <div className="flex min-h-full items-center justify-center">
              <div className="w-full max-w-md space-y-3">
                <div className="mb-8 text-center">
                  <h2 className="mb-3 text-2xl font-semibold text-slate-900">
                    I&apos;m Varesh&apos;s digital portfolio
                  </h2>
                  <p className="mx-auto max-w-md text-sm text-slate-500">
                    Ask about projects, skills, internships, contact, or resume highlights.
                  </p>
                </div>
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void submitPrompt(prompt)}
                    className="flex w-full items-center rounded-xl bg-slate-100 px-4 py-3 text-left text-sm text-slate-800 transition hover:bg-slate-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages
                .filter(
                  (message, index) =>
                    !(index === 0 && message.role === "assistant"),
                )
                .map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-3xl rounded-3xl px-5 py-4 text-sm leading-7 ${
                      message.role === "user"
                        ? "ml-auto bg-slate-950 text-white"
                        : "bg-white text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

              {isLoading ? (
                <div className="inline-flex items-center gap-3 rounded-3xl bg-white px-5 py-4 text-sm text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)] dark:bg-slate-900 dark:text-slate-200">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Thinking through your background and projects...
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white px-4 pt-3 pb-4 dark:bg-slate-950">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void submitPrompt(prompt)}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <label htmlFor="chat-input" className="sr-only">
              Ask about Varesh
            </label>
            <div className="mx-auto flex items-center rounded-full border border-[#E5E5E9] bg-[#ECECF0] py-2 pr-2 pl-6">
              <input
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me anything"
                className="text-md w-full border-none bg-transparent text-black placeholder:text-gray-500 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                className="flex items-center justify-center rounded-full bg-[#0171E3] p-2 text-white disabled:opacity-50"
              >
                <ArrowUp className="h-6 w-6" />
              </button>
            </div>
          </form>

          <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500">
            <p>{messageCount} assistant message(s)</p>
            {error ? <p>{error}</p> : <p>OpenRouter connected</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
