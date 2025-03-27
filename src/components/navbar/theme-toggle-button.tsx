import { motion } from 'motion/react'
import { useTheme } from 'next-themes'

import { MoonStar, Sun } from 'lucide-react'

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? (
        <MoonStar className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </motion.button>
  )
}

export default ThemeToggleButton
