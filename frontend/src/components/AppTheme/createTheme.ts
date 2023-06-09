import { Theme, createTheme as muiCreateTheme, responsiveFontSizes } from '@mui/material'
import { enUS } from '@mui/material/locale'
import { VtjmkLocale } from '../../share'
import { ColorMode } from './AppTheme'
import { lt } from './locales/lt'

export default function createTheme({ colorMode, locale }: { colorMode: ColorMode; locale: VtjmkLocale }): Theme {
  return responsiveFontSizes(
    muiCreateTheme(
      {
        palette: {
          mode: colorMode,
          primary: {
            main: '#0B4DC7',
            light: '#269BF0',
            // light: '#3b70d2', // From MUI colors tool
            dark: '#07358b',
          },

          successPaperBackground: {
            main:
              colorMode === 'light'
                ? '#4caf50' // palette.success.light when mode === 'light'
                : '#6EBE72', // palette.success.main when mode === 'dark',
          },
        },

        typography: {
          h1: {
            fontFamily: '"Space Grotesk", "Roboto", "sans-serif"',
            fontSize: '3rem',
          },
          h2: {
            fontSize: '2rem',
          },
          h3: {
            fontSize: '1.75rem',
          },
          h4: {
            fontSize: '1.5rem',
          },
          h5: {
            fontSize: '1.25rem',
          },
          h6: {
            fontSize: '1.1rem',
          },

          // To be used in hero-like component
          h1Hero: {
            fontFamily: '"Space Grotesk", "Roboto", "sans-serif"',
            fontSize: '3rem',
            fontWeight: 300,
            lineHeight: 1.15,

            '@media (min-width:600px)': { fontSize: '3.5rem' },
            '@media (min-width:900px)': { fontSize: '4rem' },
            '@media (min-width:1200px)': { fontSize: '5rem' },
          },
        },

        components: {
          MuiTypography: {
            defaultProps: {
              variantMapping: {
                h1Hero: 'h1',
              },
            },
          },
        },
      },
      locale === 'lt' ? lt : enUS
    )
  )
}
