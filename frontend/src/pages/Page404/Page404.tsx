import { Alert, AlertTitle, Container, Typography, styled } from '@mui/material'
import Link from '../../components/Link/Link'

const ErrorCodeText = styled('p')((theme) => ({
  fontSize: '6rem',
  fontFamily: theme.theme.typography.h1.fontFamily,
  margin: 0,
  color: '#ddd',
  textAlign: 'center',
  '@media (min-width:600px)': { fontSize: '10rem' },
}))

export default function Page404(): JSX.Element {
  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <ErrorCodeText>&lt;404&gt;</ErrorCodeText>

      <Alert severity='error'>
        <AlertTitle>This page has moved or does not exist</AlertTitle>
        <Typography variant='body1'>The page could not be loaded because of the following reasons:</Typography>

        <Typography component='div'>
          <ul>
            <li>The page has moved</li>
            <li>The page does not exist</li>
            <li>The data to be desplayed on this page is unavailable</li>
          </ul>
        </Typography>

        <Link href='/'>Return to home</Link>
      </Alert>
    </Container>
  )
}
