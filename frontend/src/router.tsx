import { Outlet, createBrowserRouter } from 'react-router-dom'

import MainLayout from './components/MainLayout'

import AttendanceForm from './pages/AttendanceForm'
import Attendances from './pages/Attendances'
import Conference from './pages/Conference'
import ConferencesList from './pages/ConferencesList'
import CreateAccount from './pages/CreateAccount'
import DocumentTemplateCreate from './pages/DocumentTemplateCreate'
import DocumentTemplates from './pages/DocumentTemplates'
import Event from './pages/Event'
import EventEdit from './pages/EventEdit'
import Home from './pages/Home'
import Login from './pages/Login'
import Page404 from './pages/Page404/Page404'
import Participants from './pages/Participants'
import Participation from './pages/Participation/Participation'
import ParticipationForm from './pages/ParticipationForm'
import PermissionCreate from './pages/PermissionCreate'
import Permissions from './pages/Permissions'
import ReviewParticipations from './pages/ReviewedParticipations/ReviewedParticipations'
import UserParticipationCertificate from './pages/UserParticipationCertificate'
import UserParticipations from './pages/UserParticipations'

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
      { path: '/conferences', element: <ConferencesList /> },
      { path: '/conferences/:conferenceId', element: <Conference /> },
      { path: '/conferences/:conferenceId/documentTemplates', element: <DocumentTemplates /> },
      { path: '/conferences/:conferenceId/documentTemplates/create', element: <DocumentTemplateCreate /> },
      { path: '/events/:eventId', element: <Event /> },
      { path: '/events/:eventId/attend', element: <AttendanceForm /> },
      { path: '/events/:eventId/attendants', element: <Attendances /> },
      { path: '/events/:eventId/edit', element: <EventEdit /> },
      { path: '/events/:eventId/participants', element: <Participants /> },
      { path: '/events/:eventId/participate', element: <ParticipationForm /> },
      { path: '/home', element: <Home /> },
      { path: '/participations/:participationId', element: <Participation /> },
      { path: '/permissions', element: <Permissions /> },
      { path: '/permissions/create', element: <PermissionCreate /> },
      { path: '/user/documents/participationCertificate', element: <UserParticipationCertificate /> },
      { path: '/user/participations', element: <UserParticipations /> },
      { path: '/user/reviewParticipations', element: <ReviewParticipations /> },
      { path: '*', element: <Page404 /> },
    ],
  },
])

export default router
