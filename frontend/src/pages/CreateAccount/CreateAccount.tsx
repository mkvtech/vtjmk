import { Box, Button, TextField, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import { ApiResponseError, post } from '../../hooks/api/types'
import { useApi } from '../../hooks/useApi'

export default function CreateAccount(): JSX.Element {
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
    <>
      <Navigation />

      <Typography component='h1' variant='h4'>
        Create an Account
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label='Full Name'
          type='text'
          fullWidth
          required
          margin='normal'
          onChange={(event): void => setFullName(event.currentTarget.value)}
          error={fullNameError.length > 0}
          helperText={fullNameError}
        />

        <TextField
          label='Email'
          type='email'
          fullWidth
          required
          margin='normal'
          onChange={(event): void => setEmail(event.currentTarget.value)}
          error={emailError.length > 0}
          helperText={emailError}
        />

        <TextField
          label='Password'
          type='password'
          fullWidth
          required
          margin='normal'
          onChange={(event): void => setPassword(event.currentTarget.value)}
          error={passwordError.length > 0}
          helperText={passwordError}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} margin='normal'>
          <Button component={RouterLink} to='/login' variant='text'>
            Login to Using an Existing Account
          </Button>
          <Button variant='contained' type='submit'>
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  )
}
