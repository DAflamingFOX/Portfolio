// 'use client';

import { Analytics } from "@vercel/analytics/next";

import { Providers } from "./providers";

import { Navigation } from '@/components/Navigation';

import './styles/globals.css';
import { Footer } from "@/components/Footer";

// const meta = {
//   title: 'Jeffrey Morris',
//   description: 'Jeffrey Morris\' portfolio and blog.',
//   image: '/capybara_gradient.png'
// }

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