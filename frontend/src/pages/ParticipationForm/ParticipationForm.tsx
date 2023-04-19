import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Link from '../../components/Link'
import { useApi } from '../../hooks/useApi'

export default function ParticipationForm(): JSX.Element {
  const { eventId } = useParams()

  return eventId === undefined ? <Navigate to='/conferences' replace /> : <Page eventId={eventId} />
}

interface IFormInput {
  comment: string
  title: string
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const navigate = useNavigate()
  const { client } = useApi()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      comment: '',
      title: '',
    },
  })
  const createMutation = useMutation((data: { comment: string }) =>
    client.post('/participations', { comment: data.comment, eventId })
  )

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createMutation.mutate(
      { comment: data.comment },
      {
        onSuccess: (_response) => {
          navigate(`/events/${eventId}`)
        },
      }
    )
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant='h1'>Participation Form</Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back to {eventId}
          </Link>
        </Typography>

        <Typography sx={{ my: 1 }}>
          You are registering to participate in {eventId} with presentation. If you want to attend an event without
          presenting, please fill <Link href={`/events/${eventId}/attend`}>attendance form</Link> instead.
        </Typography>
      </Box>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <Typography variant='h2'>Submission</Typography>

          <Typography>This event requires a submission.</Typography>

          <Controller
            name='title'
            control={control}
            render={({ field }): JSX.Element => (
              <TextField {...field} label='Title' required fullWidth margin='normal' />
            )}
          />

          <Button variant='contained' component='label'>
            <input hidden accept='image/*' type='file' />
            Upload
          </Button>
        </Box>

        <Divider />

        <Box sx={{ my: 2 }}>
          <Typography variant='h2'>Other</Typography>

          <Controller
            name='comment'
            control={control}
            render={({ field }): JSX.Element => (
              <TextField {...field} label='Comment' fullWidth margin='normal' multiline />
            )}
          />
        </Box>

        <Divider />

        <Box sx={{ my: 2 }}>
          <Typography>After you submit this form, it will be reviewed by event management.</Typography>
          <Box display='flex' flexDirection='row-reverse'>
            <Box>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  )
}
