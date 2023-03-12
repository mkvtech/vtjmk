import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '../../components/Link'
import Navigation from '../../components/Navigation'
import { useMutationCreateAttendance } from '../../hooks/api/mutations'

export default function Authenticated({ eventId }: { eventId: string }): JSX.Element {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const createAttendanceMutation = useMutationCreateAttendance()

  const handleSubmit = (event: SyntheticEvent): void => {
    console.log('submit')

    event.preventDefault()
    createAttendanceMutation.mutate(
      { comment, eventId },
      {
        onSuccess: (_response) => {
          console.log('success')

          navigate(`/events/${eventId}`)
        },
      }
    )
  }

  return (
    <>
      <Navigation />

      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          Attendance Form
        </Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back to {eventId}
          </Link>
        </Typography>

        <Typography sx={{ my: 1 }}>
          You are registering to attend {eventId}. If you want to present, please fill{' '}
          <Link href={`/events/${eventId}/participate`}>participation form</Link> instead.
        </Typography>
      </Box>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ my: 1 }}>Full Name: John Doe</Typography>

          <Typography sx={{ my: 1 }}>E-mail: test@example.com</Typography>

          <TextField
            label='Comment'
            fullWidth
            margin='normal'
            multiline
            onChange={(event): void => setComment(event.currentTarget.value)}
          />
        </Box>

        <Divider />

        <Box sx={{ my: 2 }}>
          <Typography>After you submit this form, it will be reviewed by the event management.</Typography>
          <Box display='flex' flexDirection='row-reverse'>
            <Box>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  )
}
