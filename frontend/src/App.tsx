import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next'

import MainLayout from './components/MainLayout'
import { ApiProvider } from './hooks/useApi'
import i18n from './i18n'

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
import EventEdit from './pages/EventEdit'
import EventDescriptionEdit from './pages/EventDescriptionEdit'
import DocumentTemplateCreate from './pages/DocumentTemplateCreate'
import UserParticipations from './pages/UserParticipations'
import UserParticipationCertificate from './pages/UserParticipationCertificate'
import DocumentTemplates from './pages/DocumentTemplates'
import Permissions from './pages/Permissions'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B4DC7',
      light: '#269BF0',
      // light: '#3b70d2', // From MUI colors tool
      dark: '#07358b',
    },
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <CreateAccount /> },
  {
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/conferences', element: <ConferencesList /> },
      { path: '/conferences/:conferenceId', element: <Conference /> },
      { path: '/conferences/:conferenceId/documentTemplates', element: <DocumentTemplates /> },
      { path: '/conferences/:conferenceId/documentTemplates/create', element: <DocumentTemplateCreate /> },
      { path: '/events/:eventId', element: <Event /> },
      { path: '/events/:eventId/edit', element: <EventEdit /> },
      { path: '/events/:eventId/descriptionEdit', element: <EventDescriptionEdit /> },
      { path: '/events/:eventId/attend', element: <AttendanceForm /> },
      { path: '/events/:eventId/participate', element: <ParticipationForm /> },
      { path: '/events/:eventId/attendants', element: <Attendances /> },
      { path: '/events/:eventId/participants', element: <Participants /> },
      { path: '/permissions', element: <Permissions /> },
      { path: '/user/participations', element: <UserParticipations /> },
      { path: '/user/documents/participationCertificate', element: <UserParticipationCertificate /> },
    ],
  },
])

function App(): JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <ApiProvider>
              <RouterProvider router={router} />
            </ApiProvider>
          </QueryClientProvider>
        </MuiLocalizationProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default App
