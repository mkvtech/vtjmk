import { LoadingButton } from '@mui/lab'
import { Box, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import UserPickerRhf from '../../../../../components/UserPicker/UserPickerRhf'
import { fetchParticipationAvailableReviewers } from '../../../../../hooks/api/queries'
import { UserSimple } from '../../../../../hooks/api/schemas'
import { useApi } from '../../../../../hooks/useApi'

interface FormInput {
  user: UserSimple | null
}

export default function NewReviewForm(): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { participationId } = useParams() as { participationId: string }

  const availableReviewersQuery = useQuery({
    queryKey: ['participations', participationId, 'availableReviewers'],
    queryFn: () => fetchParticipationAvailableReviewers({ client, params: { participationId } }),
    select: (data) => data.map((reviewer) => reviewer.reviewer),
    onError: () => {
      // TODO: Show toast
    },
  })

  const createReviewMutation = useMutation((data: { userId: string }) =>
    client.post(`/participations/${participationId}/reviews`, data)
  )

  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      user: null,
    },
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
    if (!data.user) {
      return
    }

    createReviewMutation.mutate(
      { userId: data.user.id },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['participations', participationId])
          queryClient.invalidateQueries(['participations', participationId, 'availableReviewers'])
        },
      }
    )
  }

  return (
    <>
      <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
        {t('pages.participation.requestReviewHeading')}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex' }}>
          <UserPickerRhf
            name='user'
            control={control}
            query={availableReviewersQuery}
            sx={{ flexGrow: 1 }}
            renderInput={(params): JSX.Element => <TextField {...params} label={t('common.reviewer')} required />}
          />

          <LoadingButton variant='contained' sx={{ ml: 2 }} type='submit' loading={createReviewMutation.isLoading}>
            {t('common.add')}
          </LoadingButton>
        </Box>
      </form>
    </>
  )
}
