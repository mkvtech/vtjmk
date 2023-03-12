import { Box, Container, Typography } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import ConferencesList from './pages/ConferencesList/ConferencesList'
import Conference from './pages/Conference'
import Event from './pages/Event'
import ParticipationForm from './pages/ParticipationForm'
import AttendanceForm from './pages/AttendanceForm'
import Participants from './pages/Participants'
import CreateAccount from './pages/CreateAccount'
import Attendances from './pages/Attendances/Attendances'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <CreateAccount /> },
  { path: '/conferences', element: <ConferencesList /> },
  { path: '/conferences/:conferenceId', element: <Conference /> },
  { path: '/events/:eventId', element: <Event /> },
  { path: '/events/:eventId/attend', element: <AttendanceForm /> },
  { path: '/events/:eventId/participate', element: <ParticipationForm /> },
  { path: '/events/:eventId/attendants', element: <Attendances /> },
  { path: '/events/:eventId/participants', element: <Participants /> },
])

function App(): JSX.Element {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          <RocketLaunchIcon />
          Test App
        </Typography>
      </Box>

      <RouterProvider router={router} />
    </Container>
  )
}

export default App
