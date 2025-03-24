import './globals.css'

import Footer from '@/components/footer'

export const metadata = {
  title: 'Stephen LH Chan - Homepage',
  description: "Stephen LH Chan's homepage",
  viewport: 'width=device-width, initial-scale=1',
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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Stephen LH Chan" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
