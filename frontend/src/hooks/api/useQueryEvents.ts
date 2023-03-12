import { useQuery } from 'react-query'
import { useApi } from '../useApi'
import { Event } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useQueryEvents(conferenceId: string) {
  const { client } = useApi()
  return useQuery<readonly Readonly<Event>[]>(`GET /events?conferenceId=${conferenceId}`, () =>
    client.get(`/events?conferenceId=${conferenceId}`).then((response) => response.data)
  )
}
