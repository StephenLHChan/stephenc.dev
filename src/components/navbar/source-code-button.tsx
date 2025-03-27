import { motion } from 'motion/react'
import { FileText } from 'lucide-react'

const SourceCodeButton = () => {
  return (
    <a
      href="https://github.com/StephenLHChan/stephen-homepage"
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.button
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg"
        aria-label="source"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FileText className="w-4 h-4" />
      </motion.button>
    </a>
  )
}

export default SourceCodeButton
