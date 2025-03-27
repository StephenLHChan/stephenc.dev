import NextLink from 'next/link'
import { motion } from 'motion/react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'

interface NavMeunuProps {
  items: { path: string; label: string }[]
}

const NavMenu = ({ items }: NavMeunuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Options"
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {items.map(item => (
          <DropdownMenuItem key={item.path} asChild>
            <NextLink href={item.path}>{item.label}</NextLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavMenu
