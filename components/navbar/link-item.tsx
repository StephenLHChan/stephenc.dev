import NextLink from 'next/link'
import { Link, useColorModeValue } from '@chakra-ui/react'

const LinkItem = ({ href, path, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href} legacyBehavior passHref scroll={false}>
      <Link
        p={2}
        bg={active ? '#88ccca' : undefined}
        color={active ? '#202023' : inactiveColor}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}
export default LinkItem
