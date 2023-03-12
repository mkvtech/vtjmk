import { useMutation } from 'react-query'
import { useApi } from '../useApi'
import { post } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useMutationCreateAttendance() {
  const { client } = useApi()
  return useMutation((data: { comment: string; eventId: string }) => {
    return post(client, '/attendances', data)
  })
}
