import { Heading } from '@chakra-ui/react'

const SectionTitle = ({ children }) => {
  return (
    <Heading
      mt={4}
      mb={3}
      fontSize="xl"
      textDecoration="underline"
      textDecorationStyle="wavy"
      textDecorationThickness={3}
      textUnderlineOffset={6}
    >
      {children}
    </Heading>
  )
}

export default SectionTitle
