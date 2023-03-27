import { Edit } from '@mui/icons-material'
import { Badge, Button, Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import Link from '../../components/Link'
import { fetchEventsParticipations, useQueryConference, useQueryEvent } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'
import { useIsAllowed } from '../../hooks/api/share'
import ParticipationMenu from './ParticipationMenu'
import { useQuery } from 'react-query'

const EVENT_PAGE_POLICIES_SCHEMA = z.object({
  policies: z.object({
    events: z.object({
      items: z.record(
        z.object({
          update: z.boolean(),
          participationsIndex: z.boolean(),
        })
      ),
    }),
  }),
})

export default function Event(): JSX.Element {
  const { eventId } = useParams()

  return eventId === undefined ? <Navigate to='/conferences' replace /> : <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const policiesQueryInput = {
    policies: {
      events: {
        items: {
          [eventId]: ['update', 'participationsIndex'],
        },
      },
    },
  }

  const { client, session } = useApi()

  const policiesQuery = useQuery(
    ['policies', policiesQueryInput],
    () =>
      client.post('/policies', policiesQueryInput).then((response) => EVENT_PAGE_POLICIES_SCHEMA.parse(response.data)),
    {
      enabled: !!session,
    }
  )
  const isAllowed = useIsAllowed(policiesQuery, 'events', eventId)

  const eventQuery = useQueryEvent(eventId)
  const conferenceQuery = useQueryConference(eventQuery.data?.conferenceId)
  const participationsQuery = useQuery(
    ['events', eventId, 'participations'],
    () => fetchEventsParticipations({ client, eventId }),
    {
      enabled: isAllowed('participationsIndex'),
      select: (data) => data.filter((participation) => participation.status === 'pending').length,
    }
  )

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {eventQuery.isLoading || eventQuery.isIdle ? (
        <Typography component='p'>We are loading conference...</Typography>
      ) : eventQuery.isError ? (
        <Typography component='p'>/!\ There was an error while loading a query</Typography>
      ) : (
        <>
          {conferenceQuery.isSuccess && (
            <Typography>
              <Link href={`/conferences/${eventQuery.data.conferenceId}`}>{conferenceQuery.data.title}</Link>
            </Typography>
          )}

          <Typography component='h1' variant='h2' fontFamily='Space Grotesk'>
            {eventQuery.data.title}
          </Typography>

          <Box sx={{ my: 2 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Typography>
                {dayjs(eventQuery.data.date).isBefore(dayjs())
                  ? `Took place ${dayjs(eventQuery.data.date).format('DD/MM/YYYY')}`
                  : `Will take place ${dayjs(eventQuery.data.date).format('DD/MM/YYYY')}`}
              </Typography>

              {!session ? (
                <Typography component='p'>
                  You must <Link href='/login'>login</Link> to attend
                </Typography>
              ) : (
                <ParticipationMenu eventId={eventId} />
              )}
            </Box>
          </Box>

          {policiesQuery.isSuccess && (isAllowed('participationsIndex') || isAllowed('update')) && (
            <>
              <Divider />

              <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                {isAllowed('participationsIndex') && (
                  <Box display='flex'>
                    <Badge badgeContent={participationsQuery.isSuccess ? participationsQuery.data : 0} color='primary'>
                      <Button component={RouterLink} to={`/events/${eventId}/participants`}>
                        View Participants
                      </Button>
                    </Badge>
                  </Box>
                )}

                {isAllowed('update') && (
                  <Button
                    variant='contained'
                    startIcon={<Edit />}
                    component={RouterLink}
                    to={`/events/${eventId}/edit`}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </>
          )}

          <Divider />

          <Box sx={{ my: 2 }}>
            <Typography>{eventQuery.data.description}</Typography>
          </Box>
        </>
      )}
    </Container>
  )
}
