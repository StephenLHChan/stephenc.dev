import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: () => ({
    body: {
      bg: '#f0e7db'
    }
  })
}

const components = {
  Link: {
    variants: {
      'text-link': {
        color: 'teal'
      },
      'icon-link': {
        _hover: {
          color: 'teal'
        }
      }
    }
  }
}
const fonts = {
  heading: 'M PLUS Code Latin',
  body: 'M PLUS 1P'
}

const theme = extendTheme({ styles, fonts, components })
export default theme
