import { Typography } from '@mui/material'
import { ParticipationReview } from '../../../../../hooks/api/schemas'
import { ReviewCardBase } from './ReviewCardBase'

export default function ReviewCard({
  review,
  showDelete,
}: {
  review: ParticipationReview
  showDelete: boolean
}): JSX.Element {
  return (
    <ReviewCardBase review={review} showDelete={showDelete}>
      {review.comment ? <Typography sx={{ mt: 1, mx: 1 }}>{review.comment}</Typography> : null}
    </ReviewCardBase>
  )
}
