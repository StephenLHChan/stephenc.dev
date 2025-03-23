import { Badge, Container, Link, List, ListItem } from '@chakra-ui/react'
import Layout from '../../components/layouts/page'
import Paragraph from '../../components/paragraph'
import { Breadcrumb, Tag, ProjectImage } from '../../components/project-item'

const CryptoDashboard = () => {
  return (
    <Layout title={'Crypto Dashboard'}>
      <Container>
        <Breadcrumb>
          Crypto Dashboard <Badge mx={2}>2022 - </Badge>
        </Breadcrumb>
        <ProjectImage
          src="/images/projects/thumbnail_crypto.png"
          alt="Crypto Dashboard"
        />
        <Paragraph>A real-time dashboard for analysis of crypto.</Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Tag>Website</Tag>
            <Link
              variant="text-link"
              href="https://stephen-c-crypto-dashboard.herokuapp.com"
            >
              https://stephen-c-crypto-dashboard.herokuapp.com
            </Link>
          </ListItem>
          <ListItem>
            <Tag>Stacks</Tag>
            <span>Python, pandas, Dash</span>
          </ListItem>
          <ListItem>
            <Tag>Source Code</Tag>
            <Link
              href="https://github.com/StephenLHChan/crypto-dashboard"
              variant="text-link"
              target="_blank"
            >
              Github
            </Link>
          </ListItem>
        </List>

        <ProjectImage
          src="/images/projects/crypto-dashboard_001.png"
          alt="Crypto Dashboard"
        />
        <ProjectImage
          src="/images/projects/crypto-dashboard_002.png"
          alt="Crypto Dashboard"
        />
      </Container>
    </Layout>
  )
}

export default CryptoDashboard
