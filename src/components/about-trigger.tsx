"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { portfolio } from "@/lib/portfolio";

export function AboutTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-900 shadow-sm backdrop-blur-lg transition hover:bg-white dark:border-white/15 dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-900"
      >
        About Varesh
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.22)] dark:bg-neutral-950 dark:text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-semibold">{portfolio.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {portfolio.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <p>{portfolio.headline}</p>
              <p>{portfolio.email}</p>
              <p>GitHub: {portfolio.links.github}</p>
              <p>LinkedIn: {portfolio.links.linkedin}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
