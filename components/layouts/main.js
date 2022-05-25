import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'

import { Navbar } from '../navbar'
import Footer from '../footer'

const Main = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Stephen LH Chan's homepage" />
        <meta name="author" content="Stephen LH Chan" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Stephen LH Chan" />
        <meta name="og:title" content="Stephen LH Chan" />
        <meta property="og:type" content="website" />
        <title>Stephen LH Chan - Homepage</title>
      </Head>

      <Navbar />

      <Container maxWidth="container.md" pt={14}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
