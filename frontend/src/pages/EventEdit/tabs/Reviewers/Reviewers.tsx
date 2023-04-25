import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQueryEventReviewers } from '../../../../hooks/api/queries'
import AddReviewer from './AddReviewer'

export default function Reviewers(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const reviewersQuery = useQueryEventReviewers({ eventId })

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      <Typography variant='h2'>Add a Reviewer</Typography>

      <AddReviewer />

      <Typography variant='h2'>Reviewers</Typography>
    </Container>
  )
}
