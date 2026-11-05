'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const suggestedPrompts = [
  'Who are you?',
  'What are your strongest projects?',
  'What are your skills?',
  'How can I contact you?',
];

type ToolPart = Extract<
  UIMessage['parts'][number],
  { toolCallId: string; state: string }
>;

const isToolPart = (part: UIMessage['parts'][number]): part is ToolPart => {
  return (
    (part.type.startsWith('tool-') || part.type === 'dynamic-tool') &&
    'toolCallId' in part &&
    typeof part.toolCallId === 'string' &&
    'state' in part &&
    typeof part.state === 'string'
  );
};

const toolName = (part: ToolPart) => {
  if ('toolName' in part && typeof part.toolName === 'string') return part.toolName;
  return part.type.replace(/^tool-/, '');
};

const toolOutput = (part: ToolPart) => {
  if (!('output' in part) || part.output === undefined) return null;
  return typeof part.output === 'string'
    ? part.output
    : JSON.stringify(part.output, null, 2);
};

const messageText = (message: UIMessage) =>
  (message.parts ?? [])
    .filter((part) => part.type === 'text' && part.text.trim().length > 0)
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('\n\n')
    .trim();

function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children: linkChildren }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {linkChildren}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export function CinematicChat() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') ?? searchParams.get('q');
  const [input, setInput] = useState('');
  const autoSubmitted = useRef(false);
  const transcript = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, stop, error } = useChat();
  const busy = status === 'submitted' || status === 'streaming';

  const submit = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || busy) return;
    setInput('');
    void sendMessage({ text: trimmed });
  };

  useEffect(() => {
    if (!initialQuery || autoSubmitted.current) return;
    autoSubmitted.current = true;
    void sendMessage({ text: initialQuery });
  }, [initialQuery, sendMessage]);

  useEffect(() => {
    const container = transcript.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, busy]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(input);
  }

  return (
    <div className="chat-page">
      <section className="chat-heading" aria-labelledby="chat-title">
        <div>
          <p className="eyebrow">AI ASSISTANT / PORTFOLIO GROUNDED</p>
          <h1 id="chat-title">
            Ask about
            <br />
            <span>my work.</span>
          </h1>
          <p>
            A tool-grounded assistant for projects, experience, skills, and contact details. If a
            detail is not in the portfolio data, it says so instead of inventing it.
          </p>
        </div>
        <div className="chat-heading-meta">
          <span>MODEL / OPENROUTER</span>
          <span>TOOLS / 8</span>
          <span>TRANSCRIPT / PRIVATE</span>
          <Link href="/resume.pdf">RÉSUMÉ ↗</Link>
        </div>
      </section>

      <section className="chat-console" aria-label="Portfolio assistant chat">
        <div className="chat-console-header">
          <span>
            <i aria-hidden="true" />
            {busy ? 'PROCESSING' : 'LIVE TRANSCRIPT'}
          </span>
          <span>{busy ? 'WAITING FOR THE MODEL' : `${messages.length} MESSAGE${messages.length === 1 ? '' : 'S'}`}</span>
        </div>

        <div className="chat-messages" ref={transcript} aria-live="polite">
          {messages.length === 0 && !busy ? (
            <div className="chat-message">
              <span>ASSISTANT</span>
              <p>
                Ask me about Varesh&apos;s projects, ML experience, résumé, publications, or the
                kind of role he is targeting.
              </p>
            </div>
          ) : null}

          {messages.map((message) => {
            const text = messageText(message);
            const tools = (message.parts ?? [])
              .filter(isToolPart)
              .filter((part) => part.state === 'output-available');

            if (!text && tools.length === 0) return null;

            return (
              <div
                key={message.id}
                className={`chat-message ${message.role === 'user' ? 'user-message' : ''}`}
              >
                <span>{message.role === 'user' ? 'YOU' : 'ASSISTANT'}</span>
                {tools.map((part) => {
                  const output = toolOutput(part);
                  if (!output) return null;
                  return (
                    <details key={part.toolCallId} className="chat-tool-result">
                      <summary>
                        <span className="meta-label">TOOL / {toolName(part)}</span>
                        <span aria-hidden="true">+</span>
                      </summary>
                      <div className="chat-markdown">
                        <Markdown>{output}</Markdown>
                      </div>
                    </details>
                  );
                })}
                {text ? (
                  <div className="chat-markdown">
                    <Markdown>{text}</Markdown>
                  </div>
                ) : null}
              </div>
            );
          })}

          {busy ? (
            <div className="chat-message">
              <span>ASSISTANT</span>
              <p className="chat-pulse">Thinking through the portfolio.</p>
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="chat-error" role="alert">
            The assistant could not answer right now. Please try again in a moment.
          </p>
        ) : null}

        <div className="chat-suggestions">
          {suggestedPrompts.map((prompt) => (
            <button key={prompt} type="button" onClick={() => submit(prompt)} disabled={busy}>
              <span aria-hidden="true">+</span> {prompt}
            </button>
          ))}
          {busy ? (
            <button type="button" onClick={() => stop()}>
              <span aria-hidden="true">■</span> Stop
            </button>
          ) : null}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <label htmlFor="chat-input" className="sr-only">
            Ask about Varesh
          </label>
          <input
            id="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about projects, experience, or résumé…"
            autoComplete="off"
          />
          <button type="submit" aria-label="Send question" disabled={busy || !input.trim()}>
            ↑
          </button>
        </form>

        <p className="chat-note">
          Answers use a tool-calling assistant grounded in the portfolio data. Verify time-sensitive
          details against the <Link href="/projects">case studies</Link> or <Link href="/resume.pdf">résumé</Link>.
        </p>
      </section>
    </div>
  );
}
