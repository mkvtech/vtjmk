import { ArrowBack } from '@mui/icons-material'
import { Container, Divider, Skeleton, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import useQueryEvent from '../../hooks/api/useQueryEvent'
import Form from './Form'

export default function EventEdit(): JSX.Element {
  const { eventId } = useParams<'eventId'>()

  return eventId === undefined ? <Navigate to='/conferences' replace /> : <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const eventQuery = useQueryEvent(eventId)

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {eventQuery.isError ? (
        <Typography component='h1' variant='h4'>
          Could not load event :(
        </Typography>
      ) : (
        <>
          <Typography component='h1' variant='h4'>
            Editing{' '}
            {eventQuery.isLoading || eventQuery.isIdle ? (
              <Skeleton sx={{ display: 'inline-block' }} width='66%' />
            ) : (
              `'${eventQuery.data.title}'`
            )}
          </Typography>

          <Typography>
            <Link href={`/conferences/${eventId}`}>
              <ArrowBack fontSize='small' />
              Back to event page
            </Link>
          </Typography>

          <Divider />

          {eventQuery.isLoading || eventQuery.isIdle ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton width='60%' />
            </>
          ) : (
            <Form event={eventQuery.data} />
          )}
        </>
      )}
    </Container>
  )
}
