import type { Viewport, Metadata } from 'next'

import './globals.css'

import { cn } from '@/lib/utils'

import Fonts from '@/components/fonts'
import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Stephen LH Chan - Homepage',
  authors: [{ name: 'Stephen LH Chan' }],
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
    <html lang="en" suppressHydrationWarning>
      <Fonts />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className={cn('pb-8')}>
            <Navbar />
            <div className="container mx-auto max-w-3xl pt-14">
              {children}
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
