import { List, ListItem, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NoDataText from '../../../../components/Typography/NoDataText'
import { ParticipationReview } from '../../../../hooks/api/schemas'

export default function Reviewers({ reviews }: { reviews: readonly ParticipationReview[] }): JSX.Element {
  const { t } = useTranslation()

  return (
    <div>
      <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
        {t('common.reviewers')}
      </Typography>

      {Reviewers.length === 0 ? (
        <NoDataText>No reviewers assigned</NoDataText>
      ) : (
        <List>
          {reviews.map((review) => (
            <ListItem key={review.id}>{review.user.fullName}</ListItem>
          ))}
        </List>
      )}
    </div>
  )
}
