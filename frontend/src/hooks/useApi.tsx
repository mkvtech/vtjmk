import axios, { AxiosInstance, isAxiosError } from 'axios'
import React from 'react'
import { User } from './api/types'

const API_BASE_URL = 'http://localhost:3000/api'
const LOCAL_STORAGE_JWT_KEY = 'JWT'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  validateStatus: (status) => status >= 200 && status < 300,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response && error.response.status === 422 && error.response.data) {
      // TODO: Unverified type casting! Validate response.data with zod.
      // If invalid throw UnexpectedServerResponseError or smth

      throw new ApiResponseError(error.response.data.errors)
    }

    throw error
  }
)

export type CurrentUser = User

export interface Session {
  readonly jwt: string
  readonly currentUser: Readonly<CurrentUser>
  readonly logout: () => void
}

interface ApiContextValueT {
  readonly isAuthenticated: boolean
  readonly session?: Session
  readonly setSession: (newSession: Session) => void

  readonly client: AxiosInstance
}

const ApiContext = React.createContext<ApiContextValueT | null>(null)

export interface ApiResponseErrorT {
  path: string
  type: string
  message: string
  fullMessage: string
}

export class ApiResponseError extends Error {
  constructor(public errors: readonly Readonly<ApiResponseErrorT>[]) {
    super('API Response Error')
  }
}

export function useApi(): ApiContextValueT {
  const value = React.useContext(ApiContext)

  if (!value) {
    throw new Error('useApi() can only be used in ApiContext')
  }

  return value
}

// Provides authentication and pre-configured axios client
export function ApiProvider({ children }: React.PropsWithChildren): JSX.Element {
  const [session, setSession] = React.useState<Session | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)

  const logout = (): void => {
    setSession(undefined)

    axiosClient.defaults.headers.common['Authorization'] = undefined
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)
  }

  React.useMemo(() => {
    const readJwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY)

    if (readJwt) {
      setLoading(true)
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${readJwt}`

      axiosClient
        .get('/me')
        .then((response) => {
          // TODO: Validate response with zod

          setSession({
            jwt: readJwt,
            currentUser: response.data,
            logout,
          })
        })
        .catch((error) => {
          if (isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)

            return
          }

          throw error
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  if (loading) {
    return <p>Loading current user</p>
  }

  return (
    <ApiContext.Provider
      value={{
        client: axiosClient,

        isAuthenticated: !!session,

        setSession: (session: Session): void => {
          setSession(session)
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${session.jwt}`
          localStorage.setItem(LOCAL_STORAGE_JWT_KEY, session.jwt)
        },

        session,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
