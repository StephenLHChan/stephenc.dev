import { IconButton, Link } from '@chakra-ui/react'

import { FaFileCode } from 'react-icons/fa'

const SourceCodeButton = () => {
  return (
    <Link
      variant="icon-link"
      href="https://github.com/StephenLHChan/stephen-homepage"
      target="_blank"
      p={2}
    >
      <IconButton icon={<FaFileCode />} size="sm" />
    </Link>
  )
}

export default SourceCodeButton
