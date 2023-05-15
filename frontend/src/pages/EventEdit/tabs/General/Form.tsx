import { Visibility, VisibilityOff } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Box,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { eventStatusToI18nKeyMap } from '../../../../components/EventStatusChip/EventStatusChip'
import { Event, EventStatus } from '../../../../hooks/api/schemas'
import { ApiResponseError, useApi } from '../../../../hooks/useApi'
import { belongsToArray } from '../../../../utils'

interface FormValues {
  title: string
  date: Dayjs
  registrationFrom: Dayjs
  registrationTo: Dayjs
  status: string
  autoAssignReviewers: boolean
  autoAssignReviewersCount: number
}

interface UpdateEventMutationInput {
  title: string
  date: string
  registrationFrom: string
  registrationTo: string
  status: string
  autoAssignReviewersCount: number | null
}

const fieldNames = ['title', 'date', 'registrationFrom', 'registrationTo', 'status'] as const

export default function Form({ event }: { event: Event }): JSX.Element {
  const { t } = useTranslation()
  const [alertErrorMessages, setAlertErrorMessages] = useState<readonly string[]>([])

  const { client } = useApi()

  const { control, handleSubmit, register, setError, watch } = useForm<FormValues>({
    defaultValues: {
      title: event.title,
      date: dayjs(event.date),
      registrationFrom: dayjs(event.registrationFrom),
      registrationTo: dayjs(event.registrationTo),
      status: event.status,
      autoAssignReviewers: !!event.autoAssignReviewersCount,
      autoAssignReviewersCount: event.autoAssignReviewersCount || 0,
    },
  })

  const queryClient = useQueryClient()
  const updateEventMutation = useMutation((data: UpdateEventMutationInput) => client.patch(`/events/${event.id}`, data))

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateEventMutation.mutate(
      {
        title: data.title,
        date: data.date.toISOString(),
        registrationFrom: data.registrationFrom.toISOString(),
        registrationTo: data.registrationTo.toISOString(),
        status: data.status,
        autoAssignReviewersCount:
          data.autoAssignReviewers && data.autoAssignReviewersCount ? data.autoAssignReviewersCount : null,
      },
      {
        onSuccess: (_response) => {
          queryClient.invalidateQueries(['/events', event.id])
        },
        onError: (error) => {
          if (error instanceof ApiResponseError) {
            error.errors.forEach((error) => {
              if (belongsToArray(error.path, fieldNames)) {
                setError(error.path, { type: `server.${error.type}`, message: error.message })
              }
            })

            setAlertErrorMessages(error.errors.map((error) => error.fullMessage))
          }
        },
      }
    )
  }

  const autoAssignReviewersWatch = watch('autoAssignReviewers')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='md'>
        {updateEventMutation.isError && alertErrorMessages.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Alert severity='error'>
              Event was not updated due to the following errors:
              <ul>
                {alertErrorMessages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </Alert>
          </Box>
        )}

        {updateEventMutation.isSuccess && (
          <Box sx={{ my: 2 }}>
            <Alert severity='success'>{t('common.dataWasUpdated')}</Alert>
          </Box>
        )}

        <Typography variant='h2' sx={{ mt: 4 }}>
          {t('common.general')}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Controller
              name='title'
              control={control}
              render={({ field }): JSX.Element => (
                <TextField {...field} label={t('common.title')} type='text' fullWidth required size='small' />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='date'
              control={control}
              render={({ field }): JSX.Element => (
                <>
                  <DatePicker
                    {...field}
                    label={t('common.date')}
                    slotProps={{
                      textField: {
                        size: 'small',
                        fullWidth: true,
                      },
                    }}
                  />
                </>
              )}
            />
          </Grid>
        </Grid>

        <Typography variant='h2' sx={{ mt: 4 }}>
          {t('common.participantsRegistration')}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='registrationFrom'
              control={control}
              render={({ field }): JSX.Element => (
                <DatePicker
                  {...field}
                  label={t('common.from')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='registrationTo'
              control={control}
              render={({ field, fieldState: { error } }): JSX.Element => (
                <DatePicker
                  {...field}
                  label={t('common.to')}
                  slotProps={{
                    textField: {
                      size: 'small',
                      fullWidth: true,
                      error: !!error,
                      helperText: error?.message || ' ',
                    },
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography variant='h2' sx={{ mt: 4 }}>
          {t('common.administration')}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: 120 }} fullWidth size='small'>
              <InputLabel id='participants-filter-label'>{t('common.status')}</InputLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }): JSX.Element => (
                  <Select
                    {...field}
                    labelId='participants-filter-label'
                    label={t('common.status')}
                    fullWidth
                    size='small'
                    required
                    renderValue={(selected): string => t(eventStatusToI18nKeyMap[selected as EventStatus])}
                  >
                    <MenuItem value='open'>
                      <ListItemIcon>
                        <Visibility />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('common.open')}
                        secondary={t('pages.eventEdit.generalTab.eventIsVisibleForAllUsers')}
                      />
                    </MenuItem>
                    <MenuItem value='hidden'>
                      <ListItemIcon>
                        <VisibilityOff />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('common.hidden')}
                        secondary={t('pages.eventEdit.generalTab.eventIsVisibleOnlyForConferenceManagement')}
                      />
                    </MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={9}>
            <FormControlLabel
              label={t('pages.eventEdit.generalTab.autoAssignReviewers')}
              control={
                <Checkbox {...register('autoAssignReviewers')} defaultChecked={!!event.autoAssignReviewersCount} />
              }
            />
          </Grid>

          <Grid item xs={3}>
            {autoAssignReviewersWatch && (
              <Controller
                name='autoAssignReviewersCount'
                control={control}
                render={({ field }): JSX.Element => (
                  <TextField
                    {...field}
                    label={t('pages.eventEdit.generalTab.autoAssignReviewersCount')}
                    type='number'
                    fullWidth
                    required
                    size='small'
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', my: 2 }}>
        <LoadingButton variant='contained' type='submit' loading={updateEventMutation.isLoading}>
          {t('common.update')}
        </LoadingButton>
      </Box>
    </form>
  )
}
