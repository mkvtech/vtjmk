import { Container, List, ListItem, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import Link from '../../components/Link'
import { useQueryPolicies } from '../../hooks/api/queries'
import { useIsAllowed } from '../../hooks/api/share'
import useQueryConference from '../../hooks/api/useQueryConference'
import useQueryEvents from '../../hooks/api/useQueryEvents'

const policiesSchema = z.object({
  policies: z.object({
    conferences: z.object({
      items: z.record(
        z.object({
          documentTemplatesIndex: z.boolean(),
        })
      ),
    }),
  }),
})

export default function Conference(): JSX.Element {
  const { conferenceId } = useParams()

  if (conferenceId === undefined) {
    return <Navigate to='/conferences' replace />
  }

  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        conferences: {
          items: {
            [conferenceId]: ['documentTemplatesIndex'],
          },
        },
      },
    },
    schema: policiesSchema,
  })
  const isAllowed = useIsAllowed(policiesQuery, 'conferences', conferenceId)

  const conferenceQuery = useQueryConference(conferenceId)
  const eventsQuery = useQueryEvents(conferenceId)

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {conferenceQuery.isError ? (
        <Typography component='p'>/!\ There was an error while loading a query</Typography>
      ) : conferenceQuery.isLoading || conferenceQuery.isIdle ? (
        <Typography component='p'>We are loading conference...</Typography>
      ) : (
        <div>
          <Typography component='h1' variant='h4'>
            {conferenceQuery.data.title}
          </Typography>

          <Typography>{conferenceQuery.data.descrption}</Typography>

          {isAllowed('documentTemplatesIndex') && (
            <Link href={`/conferences/${conferenceId}/documentTemplates`}>Document Templates</Link>
          )}

          <Typography component='h2' variant='h5'>
            Events
          </Typography>

          {eventsQuery.isError ? (
            <Typography component='p'>Cannot load conference events</Typography>
          ) : eventsQuery.isLoading || eventsQuery.isIdle ? (
            <Typography component='p'>We are loading conference events...</Typography>
          ) : (
            <List>
              {eventsQuery.data.map((event) => (
                <ListItem key={event.id}>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      )}
    </Container>
  )
}
