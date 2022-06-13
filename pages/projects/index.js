import Image from 'next/image'
import { Container, Box, Text } from '@chakra-ui/react'
import Layout from '../../components/layouts/page'
import SectionTitle from '../../components/section-title'

import thumbCrypto from '../../public/images/projects/thumbnail_crypto.png'
import thumbPriceChecker from '../../public/images/projects/thumbnail_pricechecker.png'

const Projects = () => {
  return (
    <Layout>
      <Container>
        <SectionTitle>Projects</SectionTitle>
        <Box m={6}>
          <Box w="100%" textAlign="center" mb={6}>
            <Image
              src={thumbCrypto}
              alt="title"
              className="grid-item-thumbnail"
              placeholder="blur"
            />
            <Text mt={2} fontSize={20}>
              Crypto Dashboard
            </Text>
            <Text fontSize={14}>
              A dashboard to display real-time data and graph of cryptocurrency{' '}
            </Text>
          </Box>
          <Box w="100%" textAlign="center" mb={6}>
            <Image
              src={thumbPriceChecker}
              alt="title"
              className="grid-item-thumbnail"
              placeholder="blur"
            />
            <Text mt={2} fontSize={20}>
              Price Checker
            </Text>
            <Text fontSize={14}>A web app to check the price of grocery </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Projects
