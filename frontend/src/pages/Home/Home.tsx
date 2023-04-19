import { Box, Container, Typography, alpha, useTheme } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'

export default function Home(): JSX.Element {
  const theme = useTheme()
  useTranslation()

  return (
    <>
      <Box
        sx={{
          backgroundImage: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0)} 0%, ${alpha(
            theme.palette.background.default,
            0
          )} 40%, ${theme.palette.background.default} 100%), url(/homebg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: '0% 30%',
          height: '37vh', // About 500 px on my screen
        }}
      />

      <Container maxWidth='lg' sx={{ mt: -12 }}>
        <Typography variant='h1Hero'>
          <Trans i18nKey='pages.home.title'>
            <Box component='span' color={theme.palette.primary.main}>
              VilniusTECH
            </Box>
            <br />
            Conferences for Junior Researchers
          </Trans>
        </Typography>

        <Typography component='p' sx={{ textAlign: 'center', mt: 12 }}>
          <Trans i18nKey='common.pageUnderConstruction'>
            🚧
            <Box component='span' fontStyle='italic'>
              This page is currently under construction...
            </Box>
          </Trans>
        </Typography>

        {/* TODO: Paragraphs: conferences, upcoming events, footage */}
      </Container>
    </>
  )
}
