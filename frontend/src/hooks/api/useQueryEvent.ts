import { useQuery } from 'react-query'
import { useApi } from '../useApi'
import { Event } from './types'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useQueryEvent(eventId: string) {
  const { client } = useApi()
  return useQuery<Readonly<Event>>(`GET /events/${eventId}`, () =>
    client.get(`/events/${eventId}`).then((response) => response.data)
  )
}
