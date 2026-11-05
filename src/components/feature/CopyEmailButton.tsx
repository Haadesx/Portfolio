"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "error";

export function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  async function handleCopy() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }

    resetTimer.current = window.setTimeout(() => setState("idle"), 2500);
  }

  const message =
    state === "copied"
      ? "Email address copied to clipboard."
      : state === "error"
        ? "Copy failed. Select the address above instead."
        : "";

  return (
    <div className="copy-control">
      <button type="button" className="copy-email" onClick={handleCopy}>
        {state === "copied" ? "Copied ✓" : "Copy email"}
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
