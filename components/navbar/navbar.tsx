import { Container, Box, Heading, Flex, Stack } from '@chakra-ui/react'

import Logo from './logo'
import SourceCodeButton from './source-code-button'
import ThemeToggleButton from './theme-toggle-button'
import LinkItem from './link-item'
import NavMenu from './nav-menu'

const Navbar = ({ path }) => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
    >
      <Container display="flex" p={2} maxW="container.md">
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg">
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/projects" path={path}>
            Projects
          </LinkItem>
        </Stack>

        <Box
          flex={1}
          textAlign="right"
          alignItems="center"
          pt="5px"
          opacity={0.8}
        >
          <SourceCodeButton />
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <NavMenu />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
