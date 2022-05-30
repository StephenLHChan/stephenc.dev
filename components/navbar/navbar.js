import { Container, Box, Heading, Flex } from '@chakra-ui/react'

import Logo from './logo'
import SourceCodeButton from './source-code-button'
import ThemeToggleButton from './theme-toggle-button'

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
        <Box flex={1} align="right" alignItems="center" pt="5px" opacity={0.8}>
          <SourceCodeButton />
          <ThemeToggleButton />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
