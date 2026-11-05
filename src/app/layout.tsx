import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.initvaresh.com'),
  title: 'Varesh Patel | Machine Learning & Computer Vision Engineer',
  description:
    'Machine learning and computer vision projects, research, and experience by Varesh Patel.',
  keywords: [
    'Varesh Patel',
    'Portfolio',
    'Machine Learning Engineer',
    'Applied AI',
    'Computer Vision',
    'Agentic Systems',
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
    url: 'https://www.initvaresh.com',
    title: 'Varesh Patel | Machine Learning & Computer Vision Engineer',
    description:
      'Machine learning and computer vision projects, research, and experience by Varesh Patel.',
    siteName: 'Varesh Patel Portfolio',
    images: [
      {
        url: '/WhatsApp Image 2026-04-23 at 15.37.39.jpeg',
        width: 1200,
        height: 630,
        alt: 'Varesh Patel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varesh Patel | Machine Learning & Computer Vision Engineer',
    description:
      'Machine learning and computer vision projects, research, and experience by Varesh Patel.',
    creator: '@Haadesx',
    images: ['/WhatsApp Image 2026-04-23 at 15.37.39.jpeg'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101010',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
