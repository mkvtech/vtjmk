import { Alert, AlertTitle, Container, Link, Typography, styled } from '@mui/material'
import { isAxiosError } from 'axios'

const ErrorCodeText = styled('p')((theme) => ({
  fontSize: '6rem',
  fontFamily: theme.theme.typography.h1.fontFamily,
  margin: 0,
  color: '#ddd',
  textAlign: 'center',
  '@media (min-width:600px)': { fontSize: '10rem' },
}))

export default function PageError({ withTitle, error }: { withTitle?: boolean; error: unknown }): JSX.Element {
  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      {!isAxiosError(error) || !error.response ? (
        <>
          {withTitle && <ErrorCodeText>&lt;?&gt;</ErrorCodeText>}

          <Alert severity='error'>
            <AlertTitle>Unexpected error</AlertTitle>
            <Typography>This issue is probably not related to the server</Typography>

            <Link href='/'>Return to home</Link>
          </Alert>
        </>
      ) : error.response.status === 404 ? (
        <>
          {withTitle && <ErrorCodeText>&lt;404&gt;</ErrorCodeText>}

          <Alert severity='error'>
            <AlertTitle>This page has moved or does not exist</AlertTitle>
            <Typography>The page could not be loaded because of the following reasons:</Typography>

            <Typography component='div'>
              <ul>
                <li>The page has moved</li>
                <li>The page does not exist</li>
                <li>The data to be desplayed on this page is unavailable</li>
              </ul>
            </Typography>

            <Link href='/'>Return to home</Link>
          </Alert>
        </>
      ) : error.response.status === 500 ? (
        <>
          {withTitle && <ErrorCodeText>&lt;500&gt;</ErrorCodeText>}

          <Alert severity='error'>
            <AlertTitle>Internal server error</AlertTitle>
            <Typography>The server encountered and error and could not complete your request</Typography>

            <Link href='/'>Return to home</Link>
          </Alert>
        </>
      ) : (
        <>
          {withTitle && <ErrorCodeText>&lt;?&gt;</ErrorCodeText>}

          <Alert severity='error'>
            <AlertTitle>Something unexpected happened</AlertTitle>
            <Typography>This error is truly unexpected.</Typography>

            <Link href='/'>Return to home</Link>
          </Alert>
        </>
      )}
    </Container>
  )
}
