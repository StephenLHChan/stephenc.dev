import { Container, Box } from '@chakra-ui/react'
import Layout from '../../components/layouts/page'
import Section from '../../components/section'
import SectionTitle from '../../components/section-title'
import { ProjectItem } from '../../components/project-item'

import thumbCrypto from '../../../public/images/projects/thumbnail_crypto.png'
import thumbPriceChecker from '../../../public/images/projects/thumbnail_pricechecker.png'

const Projects = () => {
  return (
    <Layout title={'Projects'}>
      <Container>
        <SectionTitle>Projects</SectionTitle>
        <Section delay={0.2}>
          <Box m={6}>
            <ProjectItem
              id="crypto-dashboard"
              title="Crypto Dashboard"
              description="A dashboard to display real-time data and graph of cryptocurrency"
              thumbnail={thumbCrypto}
            />
            <ProjectItem
              id="#"
              title="Price Checker"
              description="A web app to check the price of grocery"
              thumbnail={thumbPriceChecker}
            />
          </Box>
        </Section>
      </Container>
    </Layout>
  )
}

export default Projects
