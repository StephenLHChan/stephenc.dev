'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

interface SectionProps {
  className?: string
  children: ReactNode
  delay?: number
}

const Section = ({ className, children, delay = 0 }: SectionProps) => {
  return (
    <motion.div
      className={cn('mt-4', className)}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  )
}

export default Section
