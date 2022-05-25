import { Container, Box, Heading, Flex, Icon, Link } from '@chakra-ui/react'

import { FaFileCode } from 'react-icons/fa'
import Logo from './logo'

const Navbar = () => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            <Logo />
          </Heading>
        </Flex>
        <Box flex={1} align="right" pt="5px" opacity={0.8}>
          <Link
            variant="icon-link"
            href="https://github.com/StephenLHChan/stephen-homepage"
            target="_blank"
            p={2}
          >
            <Icon as={FaFileCode} fontSize="20px" />
          </Link>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
