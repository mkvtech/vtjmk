import { Theme, createTheme as muiCreateTheme, responsiveFontSizes } from '@mui/material'
import { ColorMode } from './AppTheme'

export default function createTheme({ colorMode }: { colorMode: ColorMode }): Theme {
  return responsiveFontSizes(
    muiCreateTheme({
      palette: {
        mode: colorMode,
        primary: {
          main: '#0B4DC7',
          light: '#269BF0',
          // light: '#3b70d2', // From MUI colors tool
          dark: '#07358b',
        },
      },

      typography: {
        h1: {
          fontFamily: '"Space Grotesk", "Roboto", "sans-serif"',
          fontSize: '3rem',
        },
        h2: {
          fontSize: '2.5rem',
        },
        h3: {
          fontSize: '2rem',
        },
        h4: {
          fontSize: '1.75rem',
        },
        h5: {
          fontSize: '1.5rem',
        },
        h6: {
          fontSize: '1.25rem',
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
    })
  )
}
