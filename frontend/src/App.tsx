import React from 'react'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Home from './pages/Home'
import Login from './pages/Login'
import ConferencesList from './pages/ConferencesList'
import Conference from './pages/Conference'
import Event from './pages/Event'
import ParticipationForm from './pages/ParticipationForm'
import AttendanceForm from './pages/AttendanceForm'
import Participants from './pages/Participants'
import CreateAccount from './pages/CreateAccount'
import Attendances from './pages/Attendances'
import { ApiProvider } from './hooks/useApi'

const theme = createTheme({})

const queryClient = new QueryClient()

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
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <QueryClientProvider client={queryClient}>
          <ApiProvider>
            <Container maxWidth='sm'>
              <RouterProvider router={router} />
            </Container>
          </ApiProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default App
