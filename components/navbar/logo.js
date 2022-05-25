import NextLink from 'next/link'
import Image from 'next/image'
import { Text, Box, Link } from '@chakra-ui/react'

import logoImg from '../../public/coding.png'

const Logo = () => {
  return (
    <NextLink href="/" passHref>
      <Link _hover={'underline=none'}>
        <Box
          h="30px"
          display="inline-flex"
          fontSize="18px"
          fontWeight="bold"
          alignItems="center"
          lineHeight="20px"
          p="10px"
        >
          <Image src={logoImg} width="20px" height="20px" alt="logo" />
          <Box pl={3}>
            <Text
              fontFamily='M PLUS Rounded 1c", sans-serif'
              fontWeight="bold"
              lineHeight={'20px'}
            >
              Stephen LH Chan
            </Text>
          </Box>
        </Box>
      </Link>
    </NextLink>
  )
}

export default Logo
