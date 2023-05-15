import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ParticipationReview } from '../../../../../hooks/api/schemas'
import { useApi } from '../../../../../hooks/useApi'
import CurrentUserReview from './CurrentUserReview'
import NewReviewForm from './NewReviewForm'
import ReviewCard from './ReviewCard'

const statusToOrderMap = {
  approved: 0,
  rejected: 1,
  pending: 2,
}

function sortReviews(reviews: readonly ParticipationReview[]): ParticipationReview[] {
  return [...reviews].sort(
    (a, b) => statusToOrderMap[a.status] - statusToOrderMap[b.status] || a.user.fullName.localeCompare(b.user.fullName)
  )
}

export default function Reviews({
  reviews,
  showDelete,
  showForm,
}: {
  reviews: readonly ParticipationReview[]
  showDelete: boolean
  showForm: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const { session } = useApi()

  const currentUserReview = reviews.find((review) => review.userId === session?.currentUser.id)
  const otherReviews = sortReviews(reviews.filter((review) => review.userId !== session?.currentUser.id))

  return (
    <>
      {showForm && <NewReviewForm />}

      {currentUserReview ? (
        <>
          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('pages.participation.yourReviewHeading')}
          </Typography>

          <CurrentUserReview review={currentUserReview} showDelete={showDelete} />

          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('pages.participation.otherReviewsHeading')}
          </Typography>

          {sortReviews(otherReviews).map((review) => (
            <ReviewCard key={review.id} review={review} showDelete={showDelete} />
          ))}
        </>
      ) : (
        <>
          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('pages.participation.reviewsHeading')}
          </Typography>

          <Typography sx={{ my: 2 }}>{t('pages.participation.xReviews', { count: reviews.length })}</Typography>

          {sortReviews(reviews).map((review) => (
            <ReviewCard key={review.id} review={review} showDelete={showDelete} />
          ))}
        </>
      )}
    </>
  )
}
