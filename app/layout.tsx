// 'use client';

import { Analytics } from "@vercel/analytics/next";

import { Providers } from "./providers";

import { Navigation } from '@/components/Navigation';

import { Metadata } from 'next';

import './styles/globals.css';
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://jeff-m.com"),
  title: { default: "Home | Jeff-M", template: "%s | Jeff-M" },
  description: "Jeff's blog and portfolio.",
  themeColor: "#7828c8",
  openGraph: {
    type: 'website',
    siteName: "Jeff-M",
    title: "Jeff's Portfolio",
    description: "Jeff's blog and portfolio.",
    images: [
      {
        url: '/capybara_silk_render.png',
      }
    ],
    locale: 'en_US',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"></link>
      </head>
      <body>
        <Analytics />
        <Providers>
          <div className="flex flex-col min-h-screen min-w-screen">
            <Navigation />
            {/* min-h-[viewport - header height] This makes sure footer is just below the fold. */}
            <div className="flex-grow h-full min-h-[calc(100vh-32px)]">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}