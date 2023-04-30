import NextLink from 'next/link'
import Image from 'next/image'
import { Text, Box, Link, useColorModeValue } from '@chakra-ui/react'

import lightLogoImg from '../../public/logo.png'
import darkLogoImg from '../../public/logo-dark.png'

const Logo = () => {
  const logoImg = useColorModeValue(lightLogoImg, darkLogoImg)

  return (
    <Link as={NextLink} href="/" passHref _hover={{ underline: 'none' }}>
      <Box
        h="30px"
        display="inline-flex"
        fontSize="18px"
        fontWeight="bold"
        alignItems="center"
        lineHeight="20px"
        p="10px"
      >
        <Image src={logoImg} width={25} height={25} alt="logo" />
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
  )
}

export default Logo
