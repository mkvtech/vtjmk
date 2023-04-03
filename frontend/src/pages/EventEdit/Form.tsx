import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
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
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Event } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'

const eventStatusToSelectedTextMap = {
  open: 'Open',
  hidden: 'Hidden',
}

interface IFormInput {
  title: string
  participantsLimit: number | null | undefined
  date: Dayjs
  registrationFrom: Dayjs
  registrationTo: Dayjs
  status: string
}

interface UpdateEventMutationInput {
  title: string
  participantsLimit: number | null | undefined
  date: string
  registrationFrom: string
  registrationTo: string
  status: string
}

export default function Form({ event }: { event: Event }): JSX.Element {
  const { client } = useApi()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: event.title,
      participantsLimit: event.participantsLimit,
      date: dayjs(event.date),
      registrationFrom: dayjs(event.registrationFrom),
      registrationTo: dayjs(event.registrationTo),
      status: event.status,
    },
  })

  const updateEventMutation = useMutation((data: UpdateEventMutationInput) => client.patch(`/events/${event.id}`, data))

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    updateEventMutation.mutate(
      {
        title: data.title,
        participantsLimit: data.participantsLimit,
        date: data.date.toISOString(),
        registrationFrom: data.registrationFrom.toISOString(),
        registrationTo: data.registrationTo.toISOString(),
        status: data.status,
      },
      {
        onSuccess: (response) => {
          console.log(response)
          // Show snackbar
        },
        onError: (error) => {
          console.log(error)
          // Show alert
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='sm'>
        <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
          General
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Controller
              name='title'
              control={control}
              render={({ field }): JSX.Element => (
                <TextField {...field} label='Title' type='text' fullWidth required size='small' />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='participantsLimit'
              control={control}
              render={({ field }): JSX.Element => (
                <TextField
                  {...field}
                  onChange={(event): void => field.onChange(+event.target.value)}
                  value={field.value || ''}
                  size='small'
                  label='Participants Limit'
                  type='number'
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name='date'
              control={control}
              render={({ field }): JSX.Element => (
                <>
                  <DatePicker
                    {...field}
                    label='Date'
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

        <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
          Registration
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <Controller
              name='registrationFrom'
              control={control}
              render={({ field }): JSX.Element => (
                <DatePicker
                  {...field}
                  label='From'
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
              render={({ field }): JSX.Element => (
                <DatePicker
                  {...field}
                  label='To'
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
        </Grid>

        <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
          Administration
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: 120 }} fullWidth size='small'>
              <InputLabel id='participants-filter-label'>Status</InputLabel>
              <Controller
                name='status'
                control={control}
                render={({ field }): JSX.Element => (
                  <Select
                    {...field}
                    labelId='participants-filter-label'
                    label='Status'
                    fullWidth
                    size='small'
                    required
                    renderValue={(selected): string => eventStatusToSelectedTextMap[selected]}
                  >
                    <MenuItem value='open'>
                      <ListItemIcon>
                        <Visibility />
                      </ListItemIcon>
                      <ListItemText primary='Open' secondary='Event is visible for all users' />
                    </MenuItem>
                    <MenuItem value='hidden'>
                      <ListItemIcon>
                        <VisibilityOff />
                      </ListItemIcon>
                      <ListItemText primary='Hidden' secondary='Event is visible only for conference management' />
                    </MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 4 }}>
        <Button variant='contained' type='submit'>
          Update
        </Button>
      </Box>
    </form>
  )
}
