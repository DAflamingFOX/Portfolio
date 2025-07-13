import { Analytics } from "@vercel/analytics/next"
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { /*Banner,*/ Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Providers } from "./providers";
import { Lato } from 'next/font/google'
import '@/app/globals.css'
import 'nextra-theme-docs/style.css'

const font = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin']
});

const meta = {
  title: 'Jeffrey Morris',
  description: 'Jeffrey Morris\' portfolio and blog.',
  image: '/capybara_gradient.png'
}

// Create a new banner const with a new storage key and uncomment the banner prop further down.
// const banner = <Banner storageKey="construction-7-2-25" dismissible={false}>🚧 Site is currently under construction! 🚧</Banner>

const navbar = <Navbar logo={<strong>Jeffrey Morris</strong>} />

const footer = <Footer>Copyright © {new Date().getFullYear()} Jeffrey Morris - All Rights Reserved.</Footer>

const search = <Search placeholder='Search...'/>;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={font.className} suppressHydrationWarning>
      <Head
        color={{
          hue: 282,
          saturation: 80,
          lightness: {
            light: 40,
            dark: 60
          }
        }}>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@yourname" /> */}
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>

        <Layout
          // banner={banner} // Uncomment to enable banner.
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={false}
          feedback={{ content: null }}
          search={search}>
          <Providers>
            {children}
            <Analytics/>
          </Providers>
        </Layout>
      </body>
    </html>
  )
}