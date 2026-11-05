import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageMotion } from "@/components/feature/PageMotion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.initvaresh.com"),
  title: "Varesh Patel | Machine Learning & Computer Vision Engineer",
  description: "Machine learning and computer vision projects, research, and experience by Varesh Patel.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><div className="flex min-h-screen flex-col"><Navbar /><main id="main" className="flex-grow"><PageMotion />{children}</main><Footer /><Link href="/chat" className="chat-launcher"><MessageCircle aria-hidden="true" size={21} /><span className="chat-launcher-copy"><strong>Ask AI</strong><small>ABOUT MY WORK</small></span><span className="chat-launcher-arrow" aria-hidden="true">↗</span></Link></div></body></html>;
}
