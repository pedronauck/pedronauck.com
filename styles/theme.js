import { extendTheme } from '@chakra-ui/react'
import colors from './colors.json'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  colors,
  config,
  styles: {
    global: {
      body: {
        bg: 'body',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
      },
      a: {
        color: 'gray.600',
        _hover: {
          color: 'gray.200',
        },
      },
    },
  },
  components: {
    Button: {
      variants: {
        default: {
          bg: 'primary',
          color: '#6A1329',
        },
      },
    },
    Input: {
      sizes: {
        lg: {
          field: {
            fontSize: 20,
          },
        },
      },
    },
  },
})

export default theme
