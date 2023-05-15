import { List, ListItem } from '@mui/material'
import { UserReview } from '../../hooks/api/schemas'
import ReviewCard from './ReviewCard'

export default function ReviewsList({ reviews }: { reviews: readonly UserReview[] }): JSX.Element {
  return (
    <List disablePadding>
      {reviews.map((review) => (
        <ListItem key={review.id} disablePadding sx={{ display: 'block', my: 2 }}>
          <ReviewCard review={review} />
        </ListItem>
      ))}
    </List>
  )
}
