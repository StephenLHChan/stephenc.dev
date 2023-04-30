import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props)
    }
  })
}

const components = {
  Link: {
    variants: {
      'text-link': props => ({
        color: mode('teal', '#ff63c3')(props)
      }),
      'icon-link': props => ({
        _hover: {
          color: mode('teal', '#ff63c3')(props)
        }
      })
    }
  }
}
const fonts = {
  heading: 'M PLUS Code Latin',
  body: 'M PLUS 1P'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, fonts, components })
export default theme
