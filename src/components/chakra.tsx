import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme/theme'

const Chakra = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default Chakra
