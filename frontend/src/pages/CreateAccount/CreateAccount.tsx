import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Divider, Link, Paper, TextField, Typography, useTheme } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom'
import LocaleSwitch from '../../components/LocaleSwitch'
import { ApiResponseError, useApi } from '../../hooks/useApi'

interface IFormInput {
  fullName: string
  email: string
  password: string
}

export default function CreateAccount(): JSX.Element {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const { client, setSession, isAuthenticated } = useApi()

  const { handleSubmit, control, setError } = useForm<IFormInput>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  const signupMutation = useMutation((data: { email: string; password: string; fullName: string }) =>
    client.post('/signup', data)
  )

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (response) => {
        // TODO: Validate with zod

        setSession({ jwt: response.data.jwt, currentUser: response.data.user })
        navigate('/')
      },
      onError: (error) => {
        if (error instanceof ApiResponseError) {
          error.errors.forEach(({ path, message }) => {
            if (path !== 'email' && path !== 'fullName' && path !== 'password') {
              return
            }

            setError(path, { type: 'custom', message })
          })
        }
      },
    })
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='fullName'
                control={control}
                render={({ field, fieldState: { error } }): JSX.Element => (
                  <TextField
                    {...field}
                    label={t('common.fullName')}
                    type='text'
                    required
                    fullWidth
                    margin='normal'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field, fieldState: { error } }): JSX.Element => (
                  <TextField
                    {...field}
                    label={t('common.email')}
                    type='email'
                    required
                    fullWidth
                    margin='normal'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({ field, fieldState: { error } }): JSX.Element => (
                  <TextField
                    {...field}
                    label={t('common.password')}
                    type='password'
                    required
                    fullWidth
                    margin='normal'
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

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
