import { useQuery } from 'react-query'
import { useApi } from '../useApi'
import { Conference } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useQueryConference(id: string) {
  const { client } = useApi()
  return useQuery<Readonly<Conference>>(`GET /conferences/${id}`, () =>
    client.get(`/conferences/${id}`).then((response) => response.data)
  )
}
