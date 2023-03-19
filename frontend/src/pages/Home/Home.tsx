import { Box, Container, Typography, useTheme } from '@mui/material'
import '@fontsource/space-grotesk'

export default function Home(): JSX.Element {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 40%, rgba(255,255,255,1) 100%), url(/homebg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
      ></Box>

      <Container maxWidth='lg' sx={{ mt: -8 }}>
        <Typography component='h1' variant='h2' fontFamily='Space Grotesk'>
          <Box component='span' color={theme.palette.primary.main}>
            VilniusTECH
          </Box>
          <br />
          Conferences for Junior Researchers
        </Typography>

        <Typography component='p' sx={{ textAlign: 'center', mt: 12 }}>
          🚧
          <Box component='span' fontStyle='italic'>
            This page is currently under construction...
          </Box>
        </Typography>

        {/* TODO: Paragraphs: conferences, upcoming events, footage */}
      </Container>
    </>
  )
}
