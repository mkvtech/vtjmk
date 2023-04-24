/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosInstance } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { z } from 'zod'
import { useApi } from '../useApi'
import {
  Attendance,
  Conference,
  conferenceDocumentTemplatesSchema,
  conferenceSchema,
  Event,
  eventSchema,
  EventParticipation,
  eventParticipationSchema,
  permissionsSchema,
  userParticipationsDocumentTemplatesSchema,
  userParticipationsSchema,
  userSchema,
  participationSchema,
  participationAvailableReviewerSchema,
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
  const { client, isAuthenticated } = useApi()

  return useQuery(
    ['policies', params],
    async () => {
      const response = await client.post('/policies', params)

      const parsedData = schema.parse(response.data)

      return parsedData
    },
    {
      enabled: isAuthenticated,
    }
  )
}

const conferencesQuerySchema = z.array(conferenceSchema)
export function useQueryConferences(): UseQueryResult<readonly Readonly<Conference>[]> {
  const { client } = useApi()

  return useQuery(['conferences'], () =>
    client.get('/conferences').then((response) => conferencesQuerySchema.parse(response.data))
  )
}

export function useQueryConference(id: string | undefined): UseQueryResult<Readonly<Conference>> {
  const { client } = useApi()
  return useQuery<Readonly<Conference>>(
    ['conferences', id],
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

  return useQuery<readonly Readonly<Event>[]>(['events', params], () =>
    client.get(`/events${addParams(params)}`).then((response) => eventsQuerySchema.parse(response.data))
  )
}

export function useQueryEvent(id: string): UseQueryResult<Readonly<Event>> {
  const { client } = useApi()
  return useQuery<Readonly<Event>>(['events', id], () =>
    client.get(`/events/${id}`).then((response) => eventSchema.parse(response.data))
  )
}

export function useQueryParticipation({ participationId }: { participationId: string }) {
  const { client } = useApi()
  return useQuery(['participations', participationId], () =>
    client.get(`/participations/${participationId}`).then((response) => participationSchema.parse(response.data))
  )
}

const participationAvailableReviewersSchema = z.array(participationAvailableReviewerSchema)
export function useQueryParticipationAvailableReviewers({ participationId }: { participationId: string }) {
  const { client } = useApi()
  return useQuery(['participations', participationId, 'availableReviewers'], () =>
    client
      .get(`/participations/${participationId}/available_reviewers`)
      .then((response) => participationAvailableReviewersSchema.parse(response.data))
  )
}

const eventsParticipationsResponseSchema = z.array(eventParticipationSchema.merge(z.object({ user: userSchema })))
export async function fetchEventsParticipations({ client, eventId }: { client: AxiosInstance; eventId: string }) {
  const response = await client.get(`/events/${eventId}/participations`)
  return eventsParticipationsResponseSchema.parse(response.data)
}

export function fetchUserParticipations({ client }: { client: AxiosInstance }) {
  return client.get('/user/participations').then((response) => userParticipationsSchema.parse(response.data))
}

export function useQueryUserParticipations() {
  const { client } = useApi()
  return useQuery(['user', 'participations'], () => fetchUserParticipations({ client }))
}

export function useQueryUserParticipation(params: {
  eventId: string
}): UseQueryResult<Readonly<EventParticipation> | undefined> {
  const { client } = useApi()
  return useQuery(['user', 'participations', params], async () => {
    const response = await client.get('/user/participations')
    const parsedResponse = userParticipationsSchema.parse(response.data)
    return parsedResponse.find((participation) => participation.eventId === params.eventId)
  })
}

export function fetchUserParticipationsDocumentTemplates({
  client,
  participationId,
}: {
  client: AxiosInstance
  participationId: string
}) {
  return client
    .get(`/user/participations/${participationId}/document_templates`)
    .then((response) => userParticipationsDocumentTemplatesSchema.parse(response.data))
}

export function useQueryConferenceDocumentTemplates(params: { conferenceId: string }) {
  const { client } = useApi()
  return useQuery(['conferences', params.conferenceId, 'document_templates'], () =>
    client
      .get(`/conferences/${params.conferenceId}/document_templates`)
      .then((response) => conferenceDocumentTemplatesSchema.parse(response.data))
  )
}

export function useQueryPermissions() {
  const { client } = useApi()
  return useQuery(['permissions'], () =>
    client.get('/permissions').then((response) => permissionsSchema.parse(response.data))
  )
}

const apiAdminConferencesSchema = z.array(conferenceSchema)
export function useQueryAdminConferences() {
  const { client } = useApi()
  return useQuery(['admin', 'conferences'], () =>
    client.get('/admin/conferences').then((response) => apiAdminConferencesSchema.parse(response.data))
  )
}

const apiAdminEventsSchema = z.array(eventSchema)
export function useQueryAdminEvents() {
  const { client } = useApi()
  return useQuery(['admin', 'events'], () =>
    client.get('/admin/events').then((response) => apiAdminEventsSchema.parse(response.data))
  )
}

const apiAdminUsersSchema = z.array(userSchema)
export function useQueryAdminUsers() {
  const { client } = useApi()
  return useQuery(['admin', 'users'], () =>
    client.get('/admin/users').then((response) => apiAdminUsersSchema.parse(response.data))
  )
}
