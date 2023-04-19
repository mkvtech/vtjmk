import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Divider, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom'
import LocaleSwitch from '../../components/LocaleSwitch'
import { ApiResponseError, post } from '../../hooks/api/types'
import { useApi } from '../../hooks/useApi'

export default function CreateAccount(): JSX.Element {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const { client, setSession, isAuthenticated } = useApi()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [fullName, setFullName] = useState('')
  const [fullNameError, setFullNameError] = useState('')

  const signupMutation = useMutation((data: { email: string; password: string; fullName: string }) => {
    return post(client, '/signup', data)
  })

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()
    signupMutation.mutate(
      { email, password, fullName },
      {
        onSuccess: (response) => {
          // TODO: Validate with zod

          setSession({ jwt: response.data.jwt, currentUser: response.data.user })
          navigate('/')
        },
        onError: (error) => {
          if (error instanceof ApiResponseError) {
            const emailErrors = error.errors.filter((error) => error.path === 'email').map((error) => error.message)
            if (emailErrors.length) {
              setEmailError(`Email ${emailErrors.join(', ')}`)
            }

            const passwordErrors = error.errors
              .filter((error) => error.path === 'password')
              .map((error) => error.message)
            if (passwordErrors.length) {
              setPasswordError(`Password ${passwordErrors.join(', ')}`)
            }

            const fullNameErrors = error.errors
              .filter((error) => error.path === 'fullName')
              .map((error) => error.message)
            if (fullNameErrors.length) {
              setFullNameError(`Full Name ${fullNameErrors.join(', ')}`)
            }
          }
        },
      }
    )
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
                sx={{ flex: '1', fontSize: '1.75rem', '@media (min-width:600px)': { fontSize: '2.5rem' } }}
              >
                {t('pages.createAccount.title')}
              </Typography>

              <LocaleSwitch />
            </Box>
          </Box>

          <Divider />

          <Box sx={{ px: 4, pb: 4, pt: 2 }}>
            <form onSubmit={handleSubmit}>
              <Box>
                <TextField
                  label={t('common.fullName')}
                  type='text'
                  required
                  fullWidth
                  margin='normal'
                  onChange={(event): void => setFullName(event.currentTarget.value)}
                  error={fullNameError.length > 0}
                  helperText={fullNameError}
                />
              </Box>
              <Box>
                <TextField
                  label={t('common.email')}
                  type='email'
                  required
                  fullWidth
                  margin='normal'
                  onChange={(event): void => setEmail(event.currentTarget.value)}
                  error={emailError.length > 0}
                  helperText={emailError}
                />
              </Box>
              <Box>
                <TextField
                  label={t('common.password')}
                  type='password'
                  required
                  fullWidth
                  margin='normal'
                  onChange={(event): void => setPassword(event.currentTarget.value)}
                  error={passwordError.length > 0}
                  helperText={passwordError}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }} margin='normal'>
                <Button component={RouterLink} to='/login' variant='text'>
                  {t('pages.createAccount.buttonLabelLoginWithExistingAccount')}
                </Button>
                <Button variant='contained' type='submit'>
                  {t('common.signUp')}
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
      </Box>
    </Box>
  )
}
