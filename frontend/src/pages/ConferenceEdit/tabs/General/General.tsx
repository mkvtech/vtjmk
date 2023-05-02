import { Container, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError/PageError'
import { useQueryConference } from '../../../../hooks/api/queries'
import Form from './Form'

export default function General(): JSX.Element {
  const { conferenceId } = useParams() as { conferenceId: string }
  const conferenceQuery = useQueryConference(conferenceId)

  if (conferenceQuery.isLoading) {
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

  if (conferenceQuery.isSuccess) {
    return <Form conference={conferenceQuery.data} />
  }

  return <PageError error={conferenceQuery.error} />
}
