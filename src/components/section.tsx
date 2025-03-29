'use client'

import { motion } from 'motion/react'

import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  delay?: number
}

const Section = ({ children, delay = 0 }: SectionProps) => {
  return (
    <motion.div
      className="mt-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  )
}

export default Section
