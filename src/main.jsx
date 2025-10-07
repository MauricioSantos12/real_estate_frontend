import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App.jsx'
import defaults from '../src/utils/constants.js'
import { AuthProvider } from './context/AuthContext.jsx';

const Button = {
  baseStyle: {
    borderRadius: 'lg',
    fontWeight: 'semibold',
    letterSpacing: 'normal',
    lineHeight: 'tall',
    color: 'text.default',
    _disabled: {
      color: 'text.disabled',
    },
    flexShrink: 0,
  },
  sizes: {
    xs: {
      px: 2,
      h: 6,
      fontSize: 'sm',
    },
    sm: {
      px: 3,
      h: 9,
      fontSize: 'sm',
    },
    md: {
      px: 4,
      h: 12,
      fontSize: 'md',
    },
    lg: {
      px: 8,
      h: 14,
      fontSize: 'lg',
    },
  },
  variants: {
    solid: {
      color: 'white',
      bg: 'primary.default',
      _hover: {
        bg: 'primary.light',
      },
      _active: {
        bg: 'primary.dark',
      },
      _disabled: {
        bg: 'primary.xlight',
      },
    },
    secondary: {
      color: 'text.default',
      bg: 'secondaryScheme.500',
      _hover: {
        bg: 'secondaryScheme.400',
      },
      _active: {
        bg: 'secondaryScheme.600',
      },
      _disabled: {
        bg: 'secondaryScheme.400',
      },
    },
    xlight: {
      color: 'text.default',
      bg: 'primary.xlight',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.xlight',
      },
      _disabled: {
        bg: 'primary.xlight',
      },
    },
    outline: {
      color: 'text.default',
      bg: 'transparent',
      border: '1px solid',
      borderColor: 'border.light',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.mlight',
      },
    },
    gray: {
      color: 'text.default',
      bg: 'border.light',
      border: '1px solid',
      borderColor: 'border.light',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.mlight',
      },
    },
    ghost: {
      color: 'text.default',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.mlight',
      },
    },
    white: {
      color: 'text.default',
      bg: 'white',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.xlight',
      },
    },
    disabled: {
      color: 'text.disabled',
      border: '1px solid',
      borderColor: 'primary.xlight',
      bg: 'primary.xlight',
      _hover: {
        bg: 'primary.xlight',
      },
      _active: {
        bg: 'primary.mlight',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};


const theme = extendTheme({
  ...defaults,
  components: {
    Button,
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
)
