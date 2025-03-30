import { cn } from '@/lib/utils'

interface ParagraphProps {
  className?: string
  children: React.ReactNode
}

const Paragraph = ({ className, children }: ParagraphProps) => {
  return <p className={cn('text-justify', className)}>{children}</p>
}

export default Paragraph
