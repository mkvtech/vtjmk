import { ArrowBack } from '@mui/icons-material'
import { Alert, Box, Button, Divider, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { isAxiosError } from 'axios'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom'
import LocaleSwitch from '../../components/LocaleSwitch'
import { ApiResponseError, post } from '../../hooks/api/types'
import { useApi } from '../../hooks/useApi'

export default function Login(): JSX.Element {
  const { t } = useTranslation()
  const theme = useTheme()

  const navigate = useNavigate()
  const { client, setSession, isAuthenticated } = useApi()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation((data: { email: string; password: string }) => {
    return post(client, '/login', data)
  })

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          // TODO: Validate with zod

          setSession({ jwt: response.data.jwt, currentUser: response.data.user })
          navigate('/')
        },
      }
    )
  }

  const handleFillForm = ({ email }: { email: string }): void => {
    setEmail(email)
    setPassword('password')
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Box sx={{ flex: 1, maxWidth: 'sm' }}>
        <Paper>
          <Box sx={{ px: 4, pt: 4, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Typography
                variant='h1'
                sx={{
                  flex: '1',
                  fontSize: '1.75rem',
                  '@media (min-width:600px)': { fontSize: '2.5rem' },
                }}
              >
                {t('pages.login.title')}
              </Typography>

              <LocaleSwitch />
            </Box>
          </Box>

          <Divider />

          <Box sx={{ px: 4, pb: 4, pt: 2 }}>
            {loginMutation.isError ? (
              <Alert severity='error'>
                {isAxiosError(loginMutation.error) && loginMutation.error.code === 'ERR_NETWORK'
                  ? 'Network error'
                  : loginMutation.error instanceof ApiResponseError
                  ? loginMutation.error.errors.map((error) => error.fullMessage).join(' ')
                  : null}
              </Alert>
            ) : null}

            <form onSubmit={onSubmit}>
              <TextField
                label={t('common.email')}
                fullWidth
                required
                margin='normal'
                value={email}
                onChange={(event): void => setEmail(event.currentTarget.value)}
              />

              <TextField
                label={t('common.password')}
                type='password'
                fullWidth
                required
                margin='normal'
                value={password}
                onChange={(event): void => setPassword(event.currentTarget.value)}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }} margin='normal'>
                <Button component={RouterLink} to='/signup' variant='text'>
                  {t('pages.login.buttonLabelCreateAccount')}
                </Button>
                <Button variant='contained' type='submit'>
                  {t('common.login')}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Link
            component={RouterLink}
            to='/'
            sx={{ color: theme.palette.primary.contrastText, verticalAlign: 'middle' }}
          >
            <ArrowBack fontSize='small' sx={{ verticalAlign: 'middle' }} /> {t('common.backToTheMainWebsite')}
          </Link>
        </Box>

        <Box
          sx={{ bgcolor: 'black', color: '#55ff55', p: 2, mt: 4, border: '4px solid #55ff55', fontFamily: 'monospace' }}
        >
          <p>
            DEV UI
            <br /> Click to fill form with data
          </p>
          <ul>
            <li>
              <Link onClick={(): void => handleFillForm({ email: 'admin@example.com' })}>Admin, admin@example.com</Link>
            </li>
            <li>
              <Link onClick={(): void => handleFillForm({ email: 'agne.reynolds@example.com' })}>
                Event Manager, agne.reynolds@example.com
              </Link>
            </li>
            <li>
              <Link onClick={(): void => handleFillForm({ email: 'vaidas.mcclure@example.com' })}>
                Participant, vaidas.mcclure@example.com
              </Link>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
