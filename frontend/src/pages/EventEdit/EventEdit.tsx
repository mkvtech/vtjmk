import { Box, Container, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import { useQueryEvent } from '../../hooks/api/queries'
import Description from './tabs/Description'
import General from './tabs/General'
import Reviewers from './tabs/Reviewers'

export default function EventEdit(): JSX.Element {
  const { eventId } = useParams<'eventId'>()

  return eventId === undefined ? <Navigate to='/conferences' replace /> : <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const eventQuery = useQueryEvent(eventId)

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {eventQuery.isError ? (
        <Typography variant='h1'>Could not load event :(</Typography>
      ) : (
        <>
          <Typography>
            <Link href={`/events/${eventId}`}>Back to event page</Link>
          </Typography>

          <Typography variant='h1' sx={{ mb: 2 }}>
            Editing{' '}
            {eventQuery.isLoading || eventQuery.isIdle ? (
              <Skeleton sx={{ display: 'inline-block' }} width='66%' />
            ) : (
              `"${eventQuery.data.title}"`
            )}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabIndex}
              onChange={(event, newTabIndex): void => setTabIndex(newTabIndex)}
              aria-label='event tabs'
            >
              <Tab label='General' />
              <Tab label='Description' />
              <Tab label='Reviewers' />
            </Tabs>
          </Box>

          {tabIndex === 0 ? <General /> : tabIndex === 1 ? <Description /> : tabIndex === 2 ? <Reviewers /> : null}
        </>
      )}
    </Container>
  )
}
