// 'use client';

import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "./ThemeProvider";
import { Providers as HeroUIProvider } from "./providers";

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
      <body>
        <ThemeProvider>
          <HeroUIProvider>
            <div className="flex flex-col min-h-screen min-w-screen">
              <Analytics />
              <Navigation />
              {/* min-h-[viewport - header height] This makes sure footer is just below the fold. */}
              <div className="flex-grow h-full min-h-[calc(100vh-64px)]">
                {children}
              </div>
             <Footer />
            </div>
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}