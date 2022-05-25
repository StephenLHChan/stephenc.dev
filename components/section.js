import { motion } from 'framer-motion'

const Section = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay }}
      mb={6}
    >
      {children}
    </motion.div>
  )
}

export default Section
