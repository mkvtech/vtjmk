import { Box, Button, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import ParticipationStatusChip from '../../components/ParticipationStatusChip/ParticipationStatusChip'
import NoDataText from '../../components/Typography/NoDataText'
import { UserReview } from '../../hooks/api/schemas'
import UserButton from '../Participation/UserButton'

export default function ReviewCard({ review }: { review: UserReview }): JSX.Element {
  const { t } = useTranslation()

  return (
    <Paper sx={{ p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{ flexGrow: 1 }}>
          {review.participation.submissionTitle ? (
            <Typography>{review.participation.submissionTitle}</Typography>
          ) : (
            <NoDataText sx={{ textAlign: 'left' }}>{t('common.untitled')}</NoDataText>
          )}

          <Typography sx={{ my: 1 }}>{review.participation.event.title}</Typography>
        </Box>

        <ParticipationStatusChip status={review.status} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <UserButton user={review.participation.user} variant='withoutBorder' />

        <Button component={RouterLink} to={`/participations/${review.participationId}/reviews`}>
          {t('common.view')}
        </Button>
      </Box>
    </Paper>
  )
}
