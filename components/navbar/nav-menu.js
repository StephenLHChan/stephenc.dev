import NextLink from 'next/link'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Link } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const NavMenu = () => {
  return (
    <Menu isLazy id="navbar-menu">
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        aria-label="Options"
      />
      <MenuList>
        <NextLink href="/" passHref>
          <MenuItem as={Link}>About</MenuItem>
        </NextLink>
        <NextLink href="/projects" passHref>
          <MenuItem as={Link}>Projects</MenuItem>
        </NextLink>
      </MenuList>
    </Menu>
  )
}

export default NavMenu
