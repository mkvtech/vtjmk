import { Delete } from '@mui/icons-material'
import { Box, Chip, Paper, Typography, styled } from '@mui/material'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import LoadingIconButton from '../../../../../components/LoadingIconButton/LoadingIconButton'
import SpanCreatedAt from '../../../../../components/Typography/SpanCreatedAt'
import { ParticipationReview, ReviewStatus } from '../../../../../hooks/api/schemas'
import { useApi } from '../../../../../hooks/useApi'
import UserButton from '../../../UserButton'

export const statusToI18nKeyMap = {
  approved: 'common.approved',
  pending: 'common.pending',
  rejected: 'common.rejected',
}

export const statusToColorMap = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
} as const

export const StyledReviewCard = styled(Paper, {
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

export function ReviewCardBase({
  review,
  showDelete,
  children,
}: PropsWithChildren<{
  review: ParticipationReview
  showDelete: boolean
}>): JSX.Element {
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
    <StyledReviewCard status={review.status} sx={{ p: 1, my: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <UserButton user={review.user} withEmail variant='withoutBorder' disablePadding />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Chip
              color={statusToColorMap[review.status]}
              label={t(statusToI18nKeyMap[review.status])}
              size='small'
              sx={{ mr: showDelete ? 1 : 0 }}
            />

            {showDelete ? (
              <LoadingIconButton
                icon={<Delete />}
                label={t('common.delete')}
                loading={deleteMutation.isLoading}
                onClick={handleDelete}
                size='small'
              />
            ) : null}
          </Box>

          {review.status !== 'pending' ? (
            <Typography textAlign='right' sx={{ mr: 1 }}>
              <SpanCreatedAt date={review.updatedAt} />
            </Typography>
          ) : null}
        </Box>
      </Box>

      {children}
    </StyledReviewCard>
  )
}
