import { ThemeProvider, useMediaQuery } from '@mui/material'
import React from 'react'

// Note: 3-rd level import from mui can cause problems:
// https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'
import createTheme from './createTheme'

declare module '@mui/material/styles' {
  interface Palette {
    successPaperBackground: Palette['primary']
  }

  interface PaletteOptions {
    successPaperBackground: PaletteOptions['primary']
  }

  interface TypographyVariants {
    h1Hero: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    // Note: As per documentation, type should be `React.CSSProperties`
    // https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants
    // h1Hero?: React.CSSProperties

    h1Hero?: TypographyStyleOptions
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1Hero: true
  }
}

const localStorageColorModeKey = 'colorMode'

export type ColorMode = 'light' | 'dark'

interface ColorModeContextValue {
  colorMode: ColorMode
  toggleColorMode: () => void
  setColorMode: (colorMode: ColorMode) => void
}

const ColorModeContext = React.createContext<ColorModeContextValue | null>(null)

export function useColorMode(): ColorModeContextValue {
  const value = React.useContext(ColorModeContext)

  if (!value) {
    throw new Error('useColorMode() can only be used in ColorModeContext')
  }

  return value
}

export default function AppThemeProvider({ children }: React.PropsWithChildren): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [colorMode, setColorMode] = React.useState<ColorMode>('light')

  React.useMemo(() => {
    const savedColorMode = localStorage.getItem(localStorageColorModeKey)

    if (savedColorMode === 'dark') {
      setColorMode('dark')
    } else if (savedColorMode === 'light') {
      // nothing
    } else if (prefersDarkMode) {
      setColorMode('dark')
      localStorage.setItem(localStorageColorModeKey, 'dark')
    } else {
      localStorage.setItem(localStorageColorModeKey, 'light')
    }
  }, [prefersDarkMode])

  const contextValue = {
    colorMode,
    toggleColorMode: (): void => {
      setColorMode((prevMode) => {
        const newMode = prevMode === 'light' ? 'dark' : 'light'

        localStorage.setItem(localStorageColorModeKey, newMode)

        return newMode
      })
    },
    setColorMode: (colorMode: ColorMode): void => {
      setColorMode(colorMode)
      localStorage.setItem(localStorageColorModeKey, colorMode)
    },
  }

  const muiTheme = React.useMemo(() => {
    const theme = createTheme({ colorMode })

    if (!import.meta.env.PROD) {
      console.log('MUI theme', theme)
      console.log('MUI theme is accessible from this console with `vtjmk.theme`')
      window.vtjmk.theme = theme
    }

    return theme
  }, [colorMode])

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
