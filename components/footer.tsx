import NextLink from 'next/link'
import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box textAlign="center" mt="4">
      <Box as="span" color="gray.600">
        <Text fontSize={'sm'}>
          &copy; {new Date().getFullYear()}{' '}
          <NextLink href="/" passHref>
            Stephen LH Chan
          </NextLink>
          . All Rights Reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
