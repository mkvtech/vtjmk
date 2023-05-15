import { LoadingButton } from '@mui/lab'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { ParticipationReview, ReviewStatus } from '../../../../../hooks/api/schemas'
import { useApi } from '../../../../../hooks/useApi'
import { ReviewCardBase } from './ReviewCardBase'

interface FieldValues {
  comment: string
  status: 'approved' | 'rejected' | ''
}

export default function CurrentUserReview({
  review,
  showDelete,
}: {
  review: ParticipationReview
  showDelete: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { participationId } = useParams() as { participationId: string }

  const { handleSubmit, control } = useForm<FieldValues>({
    defaultValues: {
      comment: review.comment || '',
      status: review.status === 'pending' ? '' : review.status,
    },
  })

  const updateReviewMutation = useMutation(
    ({ reviewId, status, comment }: { reviewId: string; status: ReviewStatus; comment: string }) =>
      client.patch(`/reviews/${reviewId}`, { status, comment })
  )

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.status === '') {
      return
    }

    updateReviewMutation.mutate(
      { reviewId: review.id, status: data.status, comment: data.comment },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['participations', participationId])
          queryClient.invalidateQueries(['participations', participationId, 'availableReviewers'])
        },
      }
    )
  }

  return (
    <ReviewCardBase review={review} showDelete={showDelete}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='status'
          control={control}
          render={({ field }): JSX.Element => (
            <FormControl fullWidth size='small' sx={{ mt: 2 }} required>
              <InputLabel id='review-status-label'>{t('common.status')}</InputLabel>
              <Select
                {...field}
                labelId='review-status-label'
                label={t('common.status')}
                fullWidth
                size='small'
                required
              >
                <MenuItem value='approved'>{t('common.approved')}</MenuItem>
                <MenuItem value='rejected'>{t('common.rejected')}</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name='comment'
          control={control}
          render={({ field }): JSX.Element => (
            <TextField {...field} fullWidth multiline label={t('common.comment')} sx={{ mt: 2 }} />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <LoadingButton loading={updateReviewMutation.isLoading} variant='contained' type='submit'>
            {review.status === 'pending' ? t('common.submit') : t('common.save')}
          </LoadingButton>
        </Box>
      </form>
    </ReviewCardBase>
  )
}
