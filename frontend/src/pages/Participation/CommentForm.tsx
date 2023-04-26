import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

interface FormInput {
  text: string
}

export default function CommentForm(): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { participationId } = useParams() as { participationId: string }

  const { control, handleSubmit, setValue } = useForm<FormInput>({
    defaultValues: {
      text: '',
    },
  })

  const createCommentMutation = useMutation((data: FormInput) =>
    client.post(`/participations/${participationId}/comments`, data)
  )

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    createCommentMutation.mutate(data, {
      onSuccess: () => {
        setValue('text', '')
      },
      onSettled: () => {
        queryClient.invalidateQueries(['participations', participationId, 'comments'])
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='text'
        control={control}
        render={({ field }): JSX.Element => (
          <TextField {...field} label={t('common.comment')} type='text' fullWidth multiline rows={4} />
        )}
      />

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton type='submit' variant='contained'>
          {t('common.send')}
        </LoadingButton>
      </Box>
    </form>
  )
}
