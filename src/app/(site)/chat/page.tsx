import { Suspense } from 'react';
import { CinematicChat } from '@/components/feature/CinematicChat';

export const metadata = {
  title: 'Ask AI | Varesh Patel',
  description:
    'Ask a tool-grounded assistant about Varesh Patel’s projects, experience, skills, and contact details.',
};

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="chat-page">
          <p className="eyebrow">AI ASSISTANT</p>
          <p>Loading the transcript…</p>
        </div>
      }
    >
      <CinematicChat />
    </Suspense>
  );
}
