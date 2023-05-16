import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { eventSchema } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'

interface IFormInput {
  title: string
  copyTitle: boolean
  copyDescription: boolean
  date: Dayjs
  registrationFrom: Dayjs
  registrationTo: Dayjs
}

interface CreateEventMutationInput {
  conferenceId: string
  title: string
  copyTitleFromConference: boolean
  copyDescriptionFromConference: boolean
  date: string
  registrationFrom: string
  registrationTo: string
}

export default function CreateEvent({
  onCancel,
  conference,
}: {
  onCancel: () => void
  conference: { id: string; title: string; description: string }
}): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { client } = useApi()
  const queryClient = useQueryClient()

  const { control, handleSubmit, register } = useForm<IFormInput>({
    defaultValues: {
      title: conference.title,
      copyDescription: true,
      date: dayjs().add(3, 'month'),
      registrationFrom: dayjs().add(1, 'month'),
      registrationTo: dayjs().add(2, 'month'),
    },
  })

  const createMutation = useMutation((data: CreateEventMutationInput) =>
    client.post(`/conferences/${data.conferenceId}/events`, data).then((response) => eventSchema.parse(response.data))
  )

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

    createMutation.mutate(
      {
        conferenceId: conference.id,
        title: data.title,
        copyTitleFromConference: data.copyTitle,
        copyDescriptionFromConference: data.copyDescription,
        date: data.date.toISOString(),
        registrationFrom: data.registrationFrom.toISOString(),
        registrationTo: data.registrationTo.toISOString(),
      },
      {
        onSuccess: (data) => {
          navigate(`/events/${data.id}/edit/general`)
        },
        onSettled: () => {
          queryClient.invalidateQueries(['events'])
        },
      }
    )
  }

  return (
    <Container maxWidth='sm' sx={{ my: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h3' sx={{ mt: 2 }}>
          {t('common.general')}
        </Typography>

        <TextField
          {...register('title')}
          label={t('common.title')}
          type='text'
          fullWidth
          required
          size='small'
          sx={{ mt: 2 }}
        />

        <FormControlLabel
          sx={{ mt: 2 }}
          control={<Checkbox {...register('copyTitle')} defaultChecked={true} />}
          label={t('pages.conferenceEdit.eventsTab.copyTitleFromConference')}
        />

        <FormControlLabel
          control={<Checkbox {...register('copyDescription')} defaultChecked={true} />}
          label={t('pages.conferenceEdit.eventsTab.copyDescriptionFromConference')}
        />

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='date'
              control={control}
              render={({ field }): JSX.Element => (
                <DesktopDatePicker
                  {...field}
                  label={t('common.date')}
                  slotProps={{ textField: { size: 'small', required: true } }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography variant='h3' sx={{ mt: 2 }}>
          {t('common.participantRegistration')}
        </Typography>

        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='registrationFrom'
              control={control}
              render={({ field }): JSX.Element => (
                <DesktopDatePicker
                  {...field}
                  label={t('common.from')}
                  slotProps={{ textField: { size: 'small', required: true } }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='registrationTo'
              control={control}
              render={({ field }): JSX.Element => (
                <DesktopDatePicker
                  {...field}
                  label={t('common.to')}
                  slotProps={{ textField: { size: 'small', required: true } }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={onCancel}>{t('common.cancel')}</Button>
          <LoadingButton type='submit' variant='contained'>
            {t('common.submit')}
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}
