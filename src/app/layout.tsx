import type { Viewport } from 'next'
import './globals.css'

import { cn } from '@/lib/utils'

import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'Stephen LH Chan - Homepage',
  description: "Stephen LH Chan's homepage",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    siteName: 'Stephen LH Chan',
    title: 'Stephen LH Chan',
    type: 'website'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Stephen LH Chan" />
      </head>
      <body>
        <main className={cn('pb-8')}>
          {/* <Navbar path={router.asPath} /> */}
          <div className="container mx-auto max-w-3xl pt-14">
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
