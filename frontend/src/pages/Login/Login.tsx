import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { isAxiosError } from 'axios'
import { SyntheticEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom'
import Navigation from '../../components/Navigation'
import { ApiResponseError, post } from '../../hooks/api/types'
import { useApi } from '../../hooks/useApi'

export default function Login(): JSX.Element {
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

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <div>
      <Navigation />

      <Typography component='h1' variant='h4'>
        Login page
      </Typography>

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
          label='email'
          fullWidth
          required
          margin='normal'
          onChange={(event): void => setEmail(event.currentTarget.value)}
        />
        <TextField
          label='password'
          type='password'
          fullWidth
          required
          margin='normal'
          onChange={(event): void => setPassword(event.currentTarget.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} margin='normal'>
          {/* TODO: This button is a link to other similar form */}

          <Button component={RouterLink} to='/signup' variant='text'>
            Create an account
          </Button>
          <Button variant='contained' type='submit'>
            Login
          </Button>
        </Box>
      </form>
    </div>
  )
}
