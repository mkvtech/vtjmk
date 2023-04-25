import { Container, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import PageError from '../../../components/PageError/PageError'
import { useQueryEvent } from '../../../hooks/api/queries'
import Form from '../Form'

export default function General(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const eventQuery = useQueryEvent(eventId)

  if (eventQuery.isLoading) {
    return (
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h2' sx={{ mt: 4 }}>
          <Skeleton />
        </Typography>

        <Typography>
          <Skeleton />
          <Skeleton />
        </Typography>

        <Typography variant='h2' sx={{ mt: 4 }}>
          <Skeleton />
        </Typography>

        <Typography>
          <Skeleton />
        </Typography>
      </Container>
    )
  }

  if (eventQuery.isSuccess) {
    return <Form event={eventQuery.data} />
  }

  return <PageError error={eventQuery.error} />
}
