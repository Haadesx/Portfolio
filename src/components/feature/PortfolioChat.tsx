"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = { role: "user" | "assistant"; content: string };
const questions = ["What ML projects has Varesh built?", "Tell me about his experience.", "What are his technical skills?"];

export function PortfolioChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const transcript = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = transcript.current;
    if (!container) return;
    if (!loading && messages.at(-1)?.role === "assistant") {
      const latest = container.querySelector<HTMLElement>(".assistant-message:last-child");
      if (latest) container.scrollTop += latest.getBoundingClientRect().top - container.getBoundingClientRect().top - 20;
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  async function send(value: string) {
    const content = value.trim();
    if (!content || busy.current) return;
    busy.current = true;
    const conversation: Message[] = [...messages, { role: "user", content }];
    setMessages(conversation);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: conversation.slice(-12) }) });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== "string") throw new Error(typeof data.error === "string" ? data.error : "The assistant is unavailable right now. Please try again.");
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The assistant is unavailable right now. Please try again.");
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return <div className="chat-page">
    <div className="chat-heading"><div><p className="eyebrow">PORTFOLIO ASSISTANT / ASK ABOUT MY WORK</p><h1>Start a<br /><span>conversation.</span></h1><p>Explore my projects, technical experience, and research. Ask a question to get started.</p></div><div className="chat-heading-meta"><span>VARESH PATEL</span><span>ML / CV ENGINEER</span><Link href="/projects">BROWSE PROJECTS ↗</Link></div></div>
    <div className="chat-console">
      <div className="chat-console-header"><span><i /> PORTFOLIO ASSISTANT</span><span>QUESTIONS / EXPERIENCE / PROJECTS</span></div>
      <div className="chat-messages" ref={transcript} role="log" aria-live="polite" aria-relevant="additions">
        <div className="chat-message assistant-message"><span>ASSISTANT</span><p>Hi, I’m Varesh’s portfolio assistant. What would you like to know about his work?</p></div>
        {messages.map((message, index) => <div className={`chat-message ${message.role === "user" ? "user-message" : "assistant-message"}`} key={`${index}-${message.role}`}><span>{message.role === "user" ? "YOU" : "ASSISTANT"}</span>{message.role === "assistant" ? <div className="chat-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{ a: ({ href, children }) => <a href={href} {...(href && /^https?:\/\//i.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a> }}>{message.content}</ReactMarkdown></div> : <p>{message.content}</p>}</div>)}
        {loading && <div className="chat-message assistant-message"><span>ASSISTANT</span><p>Thinking<span className="chat-pulse">…</span></p></div>}
      </div>
      {messages.length === 0 && <div className="chat-suggestions" aria-label="Suggested questions">{questions.map((question) => <button type="button" key={question} onClick={() => void send(question)} disabled={loading}>{question} <span>↗</span></button>)}</div>}
      {error && <p className="chat-error" role="alert">{error}</p>}
      <form className="chat-form" onSubmit={handleSubmit}><label htmlFor="chat-question" className="sr-only">Ask a question</label><input id="chat-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about projects, experience, or skills…" maxLength={1800} disabled={loading} /><button type="submit" disabled={loading || !input.trim()} aria-label="Send question">↗</button></form>
      <p className="chat-note">Messages are sent to OpenRouter. AI answers may be inaccurate; verify details in the <Link href="/projects">case studies</Link> or <a href="/resume.pdf">résumé</a>.</p>
    </div>
    <noscript><p className="chat-noscript">The assistant needs JavaScript. You can still explore the <Link href="/projects">projects</Link> and <a href="/resume.pdf">résumé</a>.</p></noscript>
  </div>;
}
