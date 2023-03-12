import { ArrowBack } from '@mui/icons-material'
import { Badge, Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import Link from '../../components/Link'
import Navigation from '../../components/Navigation'
import { useQueryPolicies } from '../../hooks/api/quries'
import useQueryEvent from '../../hooks/api/useQueryEvent'
import { useApi } from '../../hooks/useApi'
import AttendanceMenu from './AttendanceMenu'

const EVENT_PAGE_POLICIES_SCHEMA = z.object({
  policies: z.object({
    events: z.object({
      items: z.record(
        z.object({
          viewAttendances: z.boolean(),
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
          [eventId]: ['viewAttendances'],
        },
      },
    },
  }

  const { session } = useApi()
  const policiesQuery = useQueryPolicies({ params: policiesQueryInput, schema: EVENT_PAGE_POLICIES_SCHEMA })
  const eventQuery = useQueryEvent(eventId)

  return (
    <>
      <Navigation />

      {eventQuery.isLoading || eventQuery.isIdle ? (
        <Typography component='p'>We are loading conference...</Typography>
      ) : eventQuery.isError ? (
        <Typography component='p'>/!\ There was an error while loading a query</Typography>
      ) : (
        <>
          <Box sx={{ my: 2 }}>
            <Box display='flex' justifyContent='space-between'>
              <Typography component='h1' variant='h4'>
                {eventQuery.data.title}
              </Typography>
            </Box>

            <Typography>
              <Link href={`/conferences/${eventQuery.data.conferenceId}`}>
                <ArrowBack fontSize='small' />
                Back to conference
              </Link>
            </Typography>

            {policiesQuery.isSuccess && policiesQuery.data.policies.events.items[eventId].viewAttendances && (
              <Box display='flex' sx={{ my: 2 }}>
                <Badge badgeContent={3} color='secondary'>
                  <Button component={RouterLink} to={`/events/${eventId}/participants`}>
                    View Participants
                  </Button>
                </Badge>
                <Badge badgeContent={3} color='secondary'>
                  <Button component={RouterLink} to={`/events/${eventId}/attendants`}>
                    View Attendants
                  </Button>
                </Badge>
              </Box>
            )}
          </Box>

          <Divider />

          <Box sx={{ my: 2 }}>
            <Typography>{eventQuery.data.description}</Typography>
          </Box>

          <Divider />

          <Box sx={{ my: 2 }}>
            <Box display='flex' flexDirection='row-reverse'>
              {!session ? (
                <Typography component='p'>
                  You must <Link href='/login'>login</Link> to attend
                </Typography>
              ) : (
                <AttendanceMenu eventId={eventId} currentUserId={session.currentUser.id} />
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  )
}
