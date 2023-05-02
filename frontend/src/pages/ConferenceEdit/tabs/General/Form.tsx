import { LoadingButton } from '@mui/lab'
import { Alert, Box, Container, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { Conference } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'

interface IFormData {
  title: string
}

export default function Form({ conference }: { conference: Conference }): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()

  const { control, handleSubmit } = useForm<IFormData>({
    defaultValues: {
      title: conference.title,
    },
  })

  const updateMutation = useMutation((data: IFormData) => client.patch(`/conferences/${conference.id}`, data))

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    updateMutation.mutate(data, {
      onSettled: () => {
        queryClient.invalidateQueries(['conferences'])
        queryClient.invalidateQueries(['conferences', conference.id])
      },
    })
  }

  return (
    <Container maxWidth='md'>
      {updateMutation.isSuccess && (
        <Alert severity='success' sx={{ my: 2 }}>
          {t('common.dataWasUpdated')}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='title'
          control={control}
          render={({ field }): JSX.Element => (
            <TextField
              {...field}
              label={t('common.title')}
              type='text'
              fullWidth
              required
              size='small'
              sx={{ mt: 4 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 4 }}>
          <LoadingButton variant='contained' type='submit' loading={updateMutation.isLoading}>
            {t('common.update')}
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}
