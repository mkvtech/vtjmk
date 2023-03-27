/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosInstance } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { z } from 'zod'
import { useApi } from '../useApi'
import {
  Attendance,
  Conference,
  conferenceSchema,
  Event,
  eventSchema,
  Participation,
  participationSchema,
  userSchema,
} from './schemas'

// TODO: Use URLSearchParams or https://github.com/sindresorhus/query-string
// Check how this function works with `undefined`
function addParams(params: Record<string, string>): string {
  const searchParams = new URLSearchParams(params).toString()

  return searchParams.length ? `?${searchParams}` : ''
}

export function useQueryAttendances(params: {
  eventId: string
  userId?: string
}): UseQueryResult<readonly Readonly<Attendance>[]> {
  const { client } = useApi()
  return useQuery<readonly Readonly<Attendance>[]>(['/attendances', params], () => {
    return client.get(`/attendances${addParams(params)}`).then((response) => response.data)
  })
}

export function useQueryPolicies<ParamsT, SchemaT extends z.ZodTypeAny>({
  params,
  schema,
}: {
  params: ParamsT
  schema: SchemaT
}): UseQueryResult<z.infer<SchemaT>> {
  const { client } = useApi()

  return useQuery(['/policies', params], async () => {
    const response = await client.post('/policies', params)

    const parsedData = schema.parse(response.data)

    return parsedData
  })
}

const conferencesQuerySchema = z.array(conferenceSchema)
export function useQueryConferences(): UseQueryResult<readonly Readonly<Conference>[]> {
  const { client } = useApi()

  return useQuery(['/conferences'], () =>
    client.get('/conferences').then((response) => conferencesQuerySchema.parse(response.data))
  )
}

export function useQueryConference(id: string | undefined): UseQueryResult<Readonly<Conference>> {
  const { client } = useApi()
  return useQuery<Readonly<Conference>>(
    ['/conferences', id],
    () =>
      typeof id === 'undefined'
        ? Promise.reject(new Error('Invalid id'))
        : client.get(`/conferences/${id}`).then((response) => conferenceSchema.parse(response.data)),
    { enabled: !!id }
  )
}

const eventsQuerySchema = z.array(eventSchema)
export function useQueryEvents(params: {
  conferenceId?: string
  from?: string
  to?: string
}): UseQueryResult<readonly Readonly<Event>[]> {
  const { client } = useApi()

  return useQuery<readonly Readonly<Event>[]>(['/events', params], () =>
    client.get(`/events${addParams(params)}`).then((response) => eventsQuerySchema.parse(response.data))
  )
}

export function useQueryEvent(id: string): UseQueryResult<Readonly<Event>> {
  const { client } = useApi()
  return useQuery<Readonly<Event>>(['/events', id], () =>
    client.get(`/events/${id}`).then((response) => eventSchema.parse(response.data))
  )
}

const eventsParticipationsResponseSchema = z.array(participationSchema.merge(z.object({ user: userSchema })))
export async function fetchEventsParticipations({ client, eventId }: { client: AxiosInstance; eventId: string }) {
  const response = await client.get(`/events/${eventId}/participations`)
  return eventsParticipationsResponseSchema.parse(response.data)
}

const participationsSchema = z.array(participationSchema)
export function useQueryUserParticipations(): UseQueryResult<readonly Readonly<Participation>[]> {
  const { client } = useApi()
  return useQuery(['/user/participations'], () =>
    client.get('/user/participations').then((response) => participationsSchema.parse(response.data))
  )
}

export function useQueryUserParticipation(params: {
  eventId: string
}): UseQueryResult<Readonly<Participation> | undefined> {
  const { client } = useApi()
  return useQuery(['/user/participations', params], async () => {
    const response = await client.get('/user/participations')
    const parsedResponse = participationsSchema.parse(response.data)
    return parsedResponse.find((participation) => participation.eventId === params.eventId)
  })
}