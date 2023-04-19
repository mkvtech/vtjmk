import { createTheme, responsiveFontSizes } from '@mui/material'

// Note: 3-rd level import from mui can cause problems:
// https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports
import { TypographyStyleOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles' {
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

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      // mode: 'dark',
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

export default theme
