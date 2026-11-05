import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageMotion } from '@/components/feature/PageMotion';

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main" className="flex-grow">
          <PageMotion />
          {children}
        </main>
        <Footer />
        <Link href="/chat" className="chat-launcher" aria-label="Ask AI about my work" title="Ask AI about my work">
          <MessageCircle aria-hidden="true" size={21} />
          <span className="chat-launcher-copy">
            <strong>Ask AI</strong>
            <small>ABOUT MY WORK</small>
          </span>
          <span className="chat-launcher-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </>
  );
}
