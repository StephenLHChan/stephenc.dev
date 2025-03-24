import NextLink from 'next/link'
import { cn } from '@/lib/utils'

const LinkItem = ({
  href,
  path,
  children,
  ...props
}: {
  href: string
  path: string | null
  children: React.ReactNode
}) => {
  const isActive = path === href

  return (
    <NextLink
      href={href}
      {...props}
      className={cn(
        'p-2 rounded-md transition-colors',
        isActive
          ? 'bg-teal-400 text-gray-900'
          : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
      )}
    >
      {children}
    </NextLink>
  )
}

export default LinkItem
