/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AxiosInstance } from 'axios'
import queryString from 'query-string'
import { useQuery, UseQueryResult } from 'react-query'
import { z } from 'zod'
import { useApi } from '../useApi'
import {
  Attendance,
  commentSchema,
  Conference,
  conferenceDocumentTemplatesSchema,
  conferenceSchema,
  Event,
  EventParticipation,
  eventParticipationSchema,
  eventReviewerSchema,
  eventSchema,
  participationAvailableReviewerSchema,
  participationSchema,
  permissionsSchema,
  userParticipationsDocumentTemplatesSchema,
  userParticipationsSchema,
  userSchema,
} from './schemas'

// function addParams<T extends queryString.StringifiableRecord>(params?: T): string {
// function addParams<T>(params?: T): string {
// function addParams<T extends Record<string, queryString.Stringifiable>>(params?: T): string {
function addParams(params?: Parameters<typeof queryString.stringify>[0]): string {
  return params ? `?${queryString.stringify(params)}` : ''
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

const eventUsersAvailableAsReviewersSchema = z.array(
  z.object({
    id: z.string(),
    email: z.string(),
    fullName: z.string(),
    avatarUrl: z.string(),
  })
)
export function useQueryEventUsersAvailableAsReviewers({ eventId }: { eventId: string }) {
  const { client } = useApi()
  return useQuery(['events', eventId, 'users', 'available_as_reviewers'], () =>
    client
      .get(`/events/${eventId}/users/available_as_reviewers`)
      .then((response) => eventUsersAvailableAsReviewersSchema.parse(response.data))
  )
}

const eventReviewersSchema = z.array(eventReviewerSchema)
export function useQueryEventReviewers({ eventId }: { eventId: string }) {
  const { client } = useApi()
  return useQuery(['events', eventId, 'reviewers'], () =>
    client.get(`/events/${eventId}/reviewers`).then((response) => eventReviewersSchema.parse(response.data))
  )
}

export function useQueryParticipation({ participationId }: { participationId: string }) {
  const { client } = useApi()
  return useQuery(['participations', participationId], () =>
    client.get(`/participations/${participationId}`).then((response) => participationSchema.parse(response.data))
  )
}

const participationAvailableReviewersSchema = z.array(participationAvailableReviewerSchema)
export function fetchParticipationAvailableReviewers({
  client,
  params,
}: {
  client: AxiosInstance
  params: { participationId: string }
}) {
  return client
    .get(`/participations/${params.participationId}/available_reviewers`)
    .then((response) => participationAvailableReviewersSchema.parse(response.data))
}

export function useQueryParticipationAvailableReviewers({ participationId }: { participationId: string }) {
  const { client } = useApi()
  return useQuery(['participations', participationId, 'availableReviewers'], () =>
    fetchParticipationAvailableReviewers({ client, params: { participationId } })
  )
}

const participationCommentsSchema = z.array(commentSchema)
export function useQueryParticipationComments({ participationId }: { participationId: string }) {
  const { client } = useApi()
  return useQuery(['participations', participationId, 'comments'], () =>
    client
      .get(`/participations/${participationId}/comments`)
      .then((response) => participationCommentsSchema.parse(response.data))
  )
}

const eventsParticipationsSchema = z.array(eventParticipationSchema)
export async function fetchEventsParticipations({
  client,
  params,
}: {
  client: AxiosInstance
  params: {
    eventId: string
    status?: 'pending' | 'approved' | 'rejected'
    order?: 'createdAt' | 'status' | 'users.fullName'
  }
}) {
  const queryParams = { status: params.status, order: params.order }
  const response = await client.get(`/events/${params.eventId}/participations${addParams(queryParams)}`)
  return eventsParticipationsSchema.parse(response.data)
}
export function useQueryEventParticipations({ eventId }: { eventId: string }) {
  const { client } = useApi()
  return useQuery(['events', eventId, 'participations'], () =>
    fetchEventsParticipations({ client, params: { eventId } })
  )
}

const usersSchema = z.array(userSchema)
export function useQueryUsers() {
  const { client } = useApi()
  return useQuery(['users'], () => client.get('/users').then((response) => usersSchema.parse(response.data)))
}

interface UserParticipationsParams {
  reviewable?: boolean
}
export function fetchUserParticipations({
  client,
  params,
}: {
  client: AxiosInstance
  params?: UserParticipationsParams
}) {
  return client
    .get(`/user/participations${addParams(params)}`)
    .then((response) => userParticipationsSchema.parse(response.data))
}

export function useQueryUserParticipations(params?: UserParticipationsParams) {
  const { client } = useApi()
  return useQuery(['user', 'participations', params], () => fetchUserParticipations({ client, params }))
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
