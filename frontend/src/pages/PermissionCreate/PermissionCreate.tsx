import {
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material'
import Link from '../../components/Link/Link'
import { LoadingButton } from '@mui/lab'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useQueryAdminConferences, useQueryAdminEvents, useQueryAdminUsers } from '../../hooks/api/queries'
import { useMutation } from 'react-query'
import { useApi } from '../../hooks/useApi'
import { useNavigate } from 'react-router-dom'

interface IFormInput {
  userId: string
  targetType: string
  targetId: string
  action: string
}

export default function PermissionCreate(): JSX.Element {
  const { client } = useApi()
  const navigate = useNavigate()

  const conferencesQuery = useQueryAdminConferences()
  const eventsQuery = useQueryAdminEvents()
  const usersQuery = useQueryAdminUsers()

  const createPermissionMutation = useMutation((data: IFormInput) => client.post('/permissions', { data }))

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      userId: '',
      targetType: '',
      targetId: '',
      action: '',
    },
  })

  const watchTargetType = watch('targetType')

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
    createPermissionMutation.mutate(data, {
      onSuccess: (_response) => {
        navigate('/permissions')
      },
    })
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Typography>
        <Link href={'/permissions'}>Permissions</Link>
      </Typography>

      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Create new Permission
      </Typography>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth='md' sx={{ mb: 4 }}>
          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='user-id-label'>User</InputLabel>
              <Controller
                name='userId'
                control={control}
                render={({ field }): JSX.Element => (
                  <Select
                    {...field}
                    labelId='user-id-label'
                    label='User'
                    fullWidth
                    size='small'
                    required
                    MenuProps={{ style: { maxHeight: 400 } }}
                  >
                    {usersQuery.isSuccess &&
                      usersQuery.data.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.fullName} ({user.email})
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='target-type-label'>Target Type</InputLabel>
                <Controller
                  name='targetType'
                  control={control}
                  render={({ field }): JSX.Element => (
                    <Select
                      {...field}
                      onChange={(event): void => {
                        setValue('targetId', '')
                        field.onChange(event)
                      }}
                      labelId='target-type-label'
                      label='Target Type'
                      fullWidth
                      size='small'
                      required
                    >
                      <MenuItem value='Conference'>Conference</MenuItem>
                      <MenuItem value='Event'>Event</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='target-id-label'>Target</InputLabel>
                <Controller
                  name='targetId'
                  control={control}
                  render={({ field }): JSX.Element => (
                    <Select
                      {...field}
                      labelId='target-id-label'
                      label='Target'
                      fullWidth
                      size='small'
                      required
                      disabled={watchTargetType !== 'Conference' && watchTargetType !== 'Event'}
                    >
                      {watchTargetType === 'Conference' && conferencesQuery.isSuccess
                        ? conferencesQuery.data.map((conference) => (
                            <MenuItem key={conference.id} value={conference.id}>
                              {conference.title}
                            </MenuItem>
                          ))
                        : watchTargetType === 'Event' && eventsQuery.isSuccess
                        ? eventsQuery.data.map((event) => (
                            <MenuItem key={event.id} value={event.id}>
                              {event.title}
                            </MenuItem>
                          ))
                        : [
                            <Skeleton sx={{ mx: 2, my: 1 }} key='1' />,
                            <Skeleton sx={{ mx: 2, my: 1 }} key='2' />,
                            <Skeleton sx={{ mx: 2, my: 1 }} key='3' />,
                          ]}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='action-label'>Action</InputLabel>
                <Controller
                  name='action'
                  control={control}
                  render={({ field }): JSX.Element => (
                    <Select {...field} labelId='action-label' label='Action' fullWidth size='small' required>
                      <MenuItem value='manage'>Manage</MenuItem>
                      <MenuItem value='read'>Read</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', my: 4 }}>
          <LoadingButton variant='contained' type='submit'>
            Create
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}
