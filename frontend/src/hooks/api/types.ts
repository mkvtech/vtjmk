import { AxiosInstance, isAxiosError } from 'axios'

export interface User {
  id: string
  email: string
  fullName: string
}

export interface Conference {
  id: string
  title: string
  descrption: string
}

export interface Event {
  id: string
  title: string
  description: string
  registerFrom: Date
  registerTo: Date
  conferenceId: string
}

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function post<T>(client: AxiosInstance, url: string, data: T) {
  return client.post(url, data).catch((error) => {
    if (isAxiosError(error) && error.response && error.response.status === 422 && error.response.data) {
      // TODO: Unverified type casting! Validate response.data with zod.
      // If invalid throw UnexpectedServerResponseError or smth

      throw new ApiResponseError(error.response.data.errors)
    }

    throw error
  })
}
