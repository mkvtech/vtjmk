import { Container, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError/PageError'
import { useQueryEventReviewers } from '../../../../hooks/api/queries'
import AddReviewer from './AddReviewer'
import ReviewersListItem from './ReviewersListItem'

export default function Reviewers(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { t } = useTranslation()
  const reviewersQuery = useQueryEventReviewers({ eventId })

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      <Typography variant='h2' sx={{ mt: 4 }}>
        {t('common.addReviewer')}
      </Typography>

      <AddReviewer />

      <Typography variant='h2' sx={{ mt: 4 }}>
        {t('common.reviewers')}
      </Typography>

      {reviewersQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : reviewersQuery.isSuccess ? (
        <>
          {reviewersQuery.data.map((reviewer) => (
            <ReviewersListItem key={reviewer.id} reviewer={reviewer} sx={{ mt: 2 }} />
          ))}
        </>
      ) : (
        <PageError error={reviewersQuery.error} />
      )}
    </Container>
  )
}
