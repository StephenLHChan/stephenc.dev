import { Container, Box, Flex, Link } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'
import Layout from '@/components/layouts/page'

import SocialMediaIcon from '@/components/social-media-icon'
import SectionTitle from '@/components/section-title'
import BioItem from '@/components/bioItem'
import Paragraph from '@/components/paragraph'
import Section from '@/components/section'
import ProfilePic from '@/components/profile-pic'

import { bioItems, socialMediaList } from '@/public/data'

const Home = () => {
  return (
    <Layout title={''}>
      <Container>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1} fontSize={'4xl'}>
            <TypeAnimation
              sequence={['hey! this is Stephen ...']}
              wrapper="h1"
              cursor={true}
              repeat={0}
              speed={40}
              style={{ display: 'inline-block' }}
            />
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={3}
              borderStyle="solid"
              w="120px"
              h="120px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfilePic />
            </Box>
          </Box>
        </Box>
        <Section delay={0.2}>
          <SectionTitle>Summary</SectionTitle>
          <Box>
            <Paragraph>
              Hello! I am Stephen. I graduated with Balchelor of Engineering in
              Computer Science from The Hong Kong University of Science and
              Technology with more than four years of experience in business
              analysis and quality assurance in IT projects.
            </Paragraph>
            <br />
          </Box>
        </Section>

        <Section delay={0.4}>
          <SectionTitle>Bio</SectionTitle>
          {bioItems.map(({ id, year, children }) => {
            return <BioItem key={id} id={id} year={year} content={children} />
          })}
        </Section>

        <Section delay={0.6}>
          <SectionTitle>Interest</SectionTitle>
          <Box>
            <Paragraph>
              Coffee,{' '}
              <Link
                href="https://www.instagram.com/stepbymie"
                target="_blank"
                variant="text-link"
              >
                Photography
              </Link>
              {', '}Badminton
            </Paragraph>
          </Box>
        </Section>

        <Section delay={0.8}>
          <SectionTitle>Know more about me</SectionTitle>
          <Flex
            display="flex"
            align="center"
            opacity={0.8}
            justify="space-between"
          >
            {socialMediaList.map(({ type, link, icon }) => {
              return (
                <SocialMediaIcon
                  key={type}
                  type={type}
                  link={link}
                  icon={icon}
                />
              )
            })}
          </Flex>
        </Section>
      </Container>
    </Layout>
  )
}

export default Home
