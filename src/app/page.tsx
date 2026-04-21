'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';
import WelcomeModal from '@/components/welcome-modal';
import { varesh } from '@/data/varesh';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle'; // Import the theme toggle

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? Give me the concise version first.',
  Projects: 'What are your strongest projects and why do they matter?',
  Skills: 'What are your skills? Show both ML depth and product stack.',
  Fun: 'What kind of ambitious or unusual things have you built?',
  Contact: 'How can I contact you or hire you for a role?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) =>
    router.push(`/chat?query=${encodeURIComponent(query)}`);

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      <FluidCursor />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,208,244,0.25),transparent_22%),radial-gradient(circle_at_75%_28%,rgba(171,228,255,0.22),transparent_24%),radial-gradient(circle_at_55%_78%,rgba(210,255,220,0.18),transparent_26%)] dark:bg-[radial-gradient(circle_at_25%_20%,rgba(126,79,115,0.22),transparent_20%),radial-gradient(circle_at_75%_28%,rgba(59,103,129,0.18),transparent_22%),radial-gradient(circle_at_55%_78%,rgba(56,103,76,0.14),transparent_24%)]" />

      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          {varesh.shortName}
        </div>
      </div>

      {/* GitHub button */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
        <ThemeToggle />
        <GithubButton
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl={varesh.portfolioRepo}
        />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() =>
            goToChat('Are you open to internships, research work, or applied AI roles?')
          }
          className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white/15 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Looking for AI talent?
        </button>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I&apos;m {varesh.name} 👋
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-6">
          {varesh.headline}
        </p>
      </motion.div>

      {/* centre avatar */}
      <div className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
        <Image
          src={varesh.avatar}
          alt={`${varesh.name} avatar`}
          width={720}
          height={720}
          priority
          className="h-full w-full rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10"
        />
      </div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-white/12 dark:bg-white/10 dark:hover:border-white/20">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key])}
              variant="outline"
              className="aspect-square w-full cursor-pointer rounded-2xl border border-neutral-200/80 bg-white/35 py-8 shadow-none backdrop-blur-lg active:scale-95 hover:bg-white/55 dark:border-white/12 dark:bg-white/10 dark:hover:bg-white/16 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700 dark:text-white">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm dark:text-white/92">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
