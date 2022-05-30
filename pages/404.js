import NextLink from 'next/link'
import {
  Container,
  Heading,
  Text,
  Divider,
  Box,
  Button
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container pt={14}>
      <Heading>Not Found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <NextLink href="/" passHref>
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Box>
    </Container>
  )
}

export default NotFound
