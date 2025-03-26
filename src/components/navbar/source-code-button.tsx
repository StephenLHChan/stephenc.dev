import { Button } from '@/components/ui/button'
import { FaFileCode } from 'react-icons/fa'

const SourceCodeButton = () => {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="p-2"
      aria-label="source"
    >
      <a
        href="https://github.com/StephenLHChan/stephen-homepage"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFileCode className="w-4 h-4" />
      </a>
    </Button>
  )
}

export default SourceCodeButton
