import axios, { AxiosInstance, isAxiosError } from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { VtjmkLocale } from '../share'
import { CurrentUser } from './api/schemas'

const API_SERVER_URL = import.meta.env.VITE_VTJMK_BACKEND_URL || 'http://localhost:3000'
const API_BASE_URL = `${API_SERVER_URL}/api`
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

  readonly setLocale: (locale: VtjmkLocale) => void

  readonly client: AxiosInstance

  readonly apiServerUrl: string
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

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { i18n } = useTranslation()

  const logout = (): void => {
    delete axiosClient.defaults.headers.common['Authorization']
    localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)

    // Carefuly clearing cache and avoiding refetch some queries, as some will fail without 'Authorization' header.
    // See browser's console.
    // More on different methods to invalidate queries: https://tanstack.com/query/v4/docs/react/reference/QueryClient

    // Clears cache, refetches all queries immediately (even if they will be { enabled: false } with next render)
    // queryClient.invalidateQueries()
    // Clears cache, does not refetch any queries
    // queryClient.invalidateQueries({ refetchActive: false })
    // Clears cache, queries will be refetched when components render
    queryClient.removeQueries()

    // Redirect to root url
    navigate('/')

    setSession(undefined)
  }

  React.useMemo(() => {
    axiosClient.defaults.headers.common['Accept-Language'] = i18n.language

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

        ...(session ? { session: { ...session, logout } } : undefined),
        setSession: (session: SessionData): void => {
          setSession(session)
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${session.jwt}`
          localStorage.setItem(LOCAL_STORAGE_JWT_KEY, session.jwt)
          queryClient.invalidateQueries({ refetchActive: false })
        },

        setLocale: (locale: VtjmkLocale): void => {
          axiosClient.defaults.headers.common['Accept-Language'] = locale

          // Update locale-dependant queries
          queryClient.removeQueries(['events'])
          queryClient.removeQueries(['conferences'])
        },

        apiServerUrl: API_SERVER_URL,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
