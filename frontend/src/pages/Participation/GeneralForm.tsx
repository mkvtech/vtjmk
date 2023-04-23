import { Box, Button, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useApi } from '../../hooks/useApi'
import { useParams } from 'react-router-dom'

interface FormData {
  submissionTitle?: string | undefined | null
  submissionDescription?: string | undefined | null
}

export default function GeneralForm({
  initialData,
  onDone,
}: {
  initialData: FormData
  onDone: () => void
}): JSX.Element {
  const { participationId } = useParams() as { participationId: string }
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      submissionTitle: initialData.submissionTitle || '',
      submissionDescription: initialData.submissionDescription || '',
    },
  })

  const updateMutation = useMutation((data: FormData) => client.patch(`/participations/${participationId}`, data))

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)

    updateMutation.mutate(data, {
      onSettled: () => {
        queryClient.invalidateQueries(['participations', participationId])
      },
      onSuccess: () => {
        onDone()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='submissionTitle'
        control={control}
        render={({ field }): JSX.Element => (
          <TextField {...field} label='Submission Title' type='text' fullWidth required size='small' sx={{ mt: 2 }} />
        )}
      />

      <Controller
        name='submissionDescription'
        control={control}
        render={({ field }): JSX.Element => (
          <TextField
            {...field}
            label='Submission Description'
            type='text'
            fullWidth
            required
            multiline
            sx={{ mt: 2 }}
          />
        )}
      />

      {/* TODO: Attachments */}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Button onClick={(): void => onDone()}>Cancel</Button>
        <Button type='submit'>Update</Button>
      </Box>
    </form>
  )
}
