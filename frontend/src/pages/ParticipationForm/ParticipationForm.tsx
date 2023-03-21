import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Link from '../../components/Link'

export default function ParticipationForm(): JSX.Element {
  const { eventId } = useParams()

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          Participation Form
        </Typography>

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

        <Typography sx={{ my: 1 }}>Some fields were pre-filled with data from your account.</Typography>
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h2' variant='h5'>
          Basic Information
        </Typography>
        <TextField label='Full Name' required fullWidth margin='normal' />
        <TextField label='Email' required fullWidth type='email' margin='normal' />
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h2' variant='h5'>
          Submission
        </Typography>

        <Typography>This event requires a submission.</Typography>

        <TextField label='Title' required fullWidth margin='normal' />

        <Button variant='contained' component='label'>
          <input hidden accept='image/*' type='file' />
          Upload
        </Button>
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h2' variant='h5'>
          Other
        </Typography>

        <TextField label='Comment' fullWidth margin='normal' multiline />
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography>After you submit this form, it will be reviewed by event management.</Typography>
        <Box display='flex' flexDirection='row-reverse'>
          <Box>
            <Button variant='contained'>Submit</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
