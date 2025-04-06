'use client'

import { usePathname } from 'next/navigation'

import Logo from './logo'
import SourceCodeButton from './source-code-button'
import ThemeToggleButton from './theme-toggle-button'
import LinkItem from './link-item'
import NavMenu from './nav-menu'

const navItems = [
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/photos', label: 'Photos' }
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-center justify-between p-2 max-w-3xl">
        {/* Logo Section */}
        <div className="flex items-center mr-5">
          <h1 className="text-lg font-bold">
            <Logo />
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex flex-grow items-center space-x-4">
          {navItems.map(item => (
            <LinkItem key={item.path} href={item.path} path={pathname}>
              {item.label}
            </LinkItem>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <SourceCodeButton />
          <ThemeToggleButton />
          <div className="md:hidden">
            <NavMenu items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
