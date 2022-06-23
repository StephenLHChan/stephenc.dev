import { Badge, Container, List, ListItem } from '@chakra-ui/react'
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
          </ListItem>
          <ListItem>
            <Tag>Stacks</Tag>
            <span>Python, pandas, Dash</span>
          </ListItem>
        </List>
      </Container>
    </Layout>
  )
}

export default CryptoDashboard
