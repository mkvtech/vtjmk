import { useQuery, UseQueryResult } from 'react-query'
import { z } from 'zod'
import { useApi } from '../useApi'
import { Attendance } from './types'

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
