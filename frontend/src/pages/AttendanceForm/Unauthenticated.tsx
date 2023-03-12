import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import Link from '../../components/Link'
import Navigation from '../../components/Navigation'

export default function Unauthenticated(): JSX.Element {
  const { eventId } = useParams()

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
    </>
  )
}
