import { Delete } from '@mui/icons-material'
import { Avatar, Box, Chip, Paper, Typography, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import LoadingIconButton from '../../../../../components/LoadingIconButton/LoadingIconButton'
import SpanCreatedAt from '../../../../../components/Typography/SpanCreatedAt'
import { ParticipationReview, ReviewStatus } from '../../../../../hooks/api/schemas'
import { useApi } from '../../../../../hooks/useApi'
import { statusToColorMap, statusToI18nKeyMap } from './ReviewStatusChip'

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: ReviewStatus }>(({ theme, status }) => ({
  borderWidth: '2px',
  borderStyle: 'solid',
  borderColor:
    status === 'approved'
      ? theme.palette.success.light
      : status === 'rejected'
      ? theme.palette.error.main
      : 'transparent',
}))

export default function ReviewCard({ review }: { review: ParticipationReview }): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { participationId } = useParams() as { participationId: string }

  // TODO: list item

  const deleteMutation = useMutation(({ reviewId }: { reviewId: string }) => client.delete(`/reviews/${reviewId}`))

  const handleDelete = (): void => {
    console.log('clicked delete')
    deleteMutation.mutate(
      { reviewId: review.id },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['participations', participationId])
          queryClient.invalidateQueries(['participations', participationId, 'availableReviewers'])
        },
      }
    )
  }

  return (
    <StyledPaper status={review.status} sx={{ display: 'flex', p: 1, my: 2 }}>
      <Box sx={{ mr: 2 }}>
        <Avatar src={review.user.avatarUrl} />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography>{review.user.fullName}</Typography>
            <Typography color='textSecondary'>{review.user.email}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              color={statusToColorMap[review.status]}
              label={t(statusToI18nKeyMap[review.status])}
              size='small'
              sx={{ mr: 1 }}
            />

            <LoadingIconButton
              icon={<Delete />}
              label={t('common.delete')}
              loading={deleteMutation.isLoading}
              onClick={handleDelete}
              size='small'
            />
          </Box>
        </Box>

        {review.status !== 'pending' ? (
          <Typography>
            <SpanCreatedAt date={review.updatedAt} />
          </Typography>
        ) : null}

        {review.comment ? <Typography sx={{ my: 2 }}>{review.comment}</Typography> : null}
      </Box>
    </StyledPaper>
  )
}
