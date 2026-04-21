import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

// Load Inter font for non-Apple devices
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Varesh Patel Portfolio',
  description:
    'Interactive AI-powered portfolio of Varesh Patel — machine learning engineer specializing in applied AI, computer vision, and agentic systems',
  keywords: [
    'Varesh Patel',
    'Portfolio',
    'Machine Learning Engineer',
    'Applied AI',
    'Computer Vision',
    'Agentic Systems',
    'OpenRouter',
    'Next.js',
    'React',
  ],
  authors: [
    {
      name: 'Varesh Patel',
      url: 'https://github.com/Haadesx',
    },
  ],
  creator: 'Varesh Patel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/Haadesx',
    title: 'Varesh Patel Portfolio',
    description: 'Interactive AI-powered portfolio — ML engineer',
    siteName: 'Varesh Patel Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varesh Patel Portfolio',
    description: 'Interactive AI-powered portfolio — ML engineer',
    creator: '@Haadesx',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          "min-h-screen bg-white text-black dark:bg-black dark:text-white font-sans antialiased transition-colors duration-500 ease-in-out",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
