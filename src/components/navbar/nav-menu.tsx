import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'

const NavMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="p-2" aria-label="Options">
          <HamburgerMenuIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <NextLink href="/projects">Projects</NextLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavMenu
