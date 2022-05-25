import NextLink from 'next/link'
import { Box, Text, Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" mt="4">
      <Box as="span" color="gray.600">
        <Text fontSize={'sm'}>
          &copy; {new Date().getFullYear()}{' '}
          <NextLink href="/" passHref>
            <Link>Stephen LH Chan</Link>
          </NextLink>
          . All Rights Reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
