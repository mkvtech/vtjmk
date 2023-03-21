import axios, { AxiosInstance, isAxiosError } from 'axios'
import React from 'react'
import { useQueryClient } from 'react-query'
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

export interface SessionData {
  readonly jwt: string
  readonly currentUser: Readonly<CurrentUser>
}

interface ApiContextValueT {
  readonly isAuthenticated: boolean
  readonly session?: Session
  readonly setSession: (newSession: SessionData) => void

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
  const [session, setSession] = React.useState<SessionData | undefined>(undefined)
  const [loading, setLoading] = React.useState<boolean>(false)

  const queryClient = useQueryClient()

  const logout = (): void => {
    delete axiosClient.defaults.headers.common['Authorization']
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)
    // Note: using `refetchActive: false` to avoid refetch some queries, as some will fail without 'Authorization'
    // header. See browser's console.
    queryClient.invalidateQueries({ refetchActive: false })
    setSession(undefined)
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
          })
        })
        .catch((error) => {
          if (isAxiosError(error) && error.response && error.response.status === 401) {
            localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)
            axiosClient.defaults.headers.common['Authorization'] = undefined

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

        setSession: (session: SessionData): void => {
          setSession(session)
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${session.jwt}`
          localStorage.setItem(LOCAL_STORAGE_JWT_KEY, session.jwt)
          queryClient.invalidateQueries({ refetchActive: false })
        },

        ...(session ? { session: { ...session, logout } } : undefined),
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
