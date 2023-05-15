import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import NoDataText from '../../../../components/Typography/NoDataText'
import UnstyledList from '../../../../components/UnstyledList/UnstyledList'
import UnstyledListItem from '../../../../components/UnstyledList/UnstyledListItem'
import { ParticipationReview } from '../../../../hooks/api/schemas'
import UserButton from '../../UserButton'

export default function Reviewers({ reviews }: { reviews: readonly ParticipationReview[] }): JSX.Element {
  const { t } = useTranslation()

  return (
    <div>
      <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
        {reviews.length <= 1 ? t('common.reviewer') : t('common.reviewers')}
      </Typography>

      {reviews.length === 0 ? (
        <NoDataText>{t('common.noReviewerAssigned')}</NoDataText>
      ) : (
        <UnstyledList>
          {reviews.map((review) => (
            <UnstyledListItem key={review.id} sx={{ display: 'block', mt: 1 }}>
              <UserButton user={review.user} />
            </UnstyledListItem>
          ))}
        </UnstyledList>
      )}
    </div>
  )
}
