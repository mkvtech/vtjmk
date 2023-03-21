import { Container, List, ListItem, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import useQueryConference from '../../hooks/api/useQueryConference'
import useQueryEvents from '../../hooks/api/useQueryEvents'

export default function Conference(): JSX.Element {
  const { conferenceId } = useParams()

  if (conferenceId === undefined) {
    return <Navigate to='/conferences' replace />
  }

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
