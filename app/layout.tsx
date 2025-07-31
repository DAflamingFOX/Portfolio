// 'use client';

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "./ThemeProvider";
import { Navigation } from '@/components/Navigation'
import { Providers as HeroUIProvider } from "./providers";
import { Lato } from 'next/font/google'
import '@/app/globals.css'

const font = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin']
});

// const meta = {
//   title: 'Jeffrey Morris',
//   description: 'Jeffrey Morris\' portfolio and blog.',
//   image: '/capybara_gradient.png'
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" dir="ltr" className={font.className} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <HeroUIProvider>
            <main className="text-foreground bg-background">
              <Analytics />
              <Navigation />
              {children}
            </main>
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}