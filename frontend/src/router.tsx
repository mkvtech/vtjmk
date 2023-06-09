import { Outlet, createBrowserRouter } from 'react-router-dom'

import MainLayout from './components/MainLayout'
import { ApiProvider } from './hooks/useApi'

import Conference from './pages/Conference'
import ConferenceEdit from './pages/ConferenceEdit'
import ConferencesList from './pages/ConferencesList'
import CreateAccount from './pages/CreateAccount'
import DocumentTemplateCreate from './pages/DocumentTemplateCreate'
import Event from './pages/Event'
import EventEdit from './pages/EventEdit'
import Home from './pages/Home'
import Login from './pages/Login'
import Page404 from './pages/Page404/Page404'
import Participation from './pages/Participation/Participation'
import ParticipationForm from './pages/ParticipationForm'
import PermissionCreate from './pages/PermissionCreate'
import Permissions from './pages/Permissions'
import ReviewParticipations from './pages/ReviewedParticipations/ReviewedParticipations'
import UserParticipationCertificate from './pages/UserParticipationCertificate'
import UserParticipations from './pages/UserParticipations'
import UserReviews from './pages/UserReviews'

const router = createBrowserRouter([
  {
    element: (
      <ApiProvider>
        <Outlet />
      </ApiProvider>
    ),
    children: [
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
          { path: '/conferences/:conferenceId/documentTemplates/create', element: <DocumentTemplateCreate /> },
          { path: '/conferences/:conferenceId/edit/*', element: <ConferenceEdit /> },
          { path: '/events/:eventId', element: <Event /> },
          { path: '/events/:eventId/edit/*', element: <EventEdit /> },
          { path: '/events/:eventId/participate', element: <ParticipationForm /> },
          { path: '/home', element: <Home /> },
          { path: '/participations/:participationId/*', element: <Participation /> },
          { path: '/permissions', element: <Permissions /> },
          { path: '/permissions/create', element: <PermissionCreate /> },
          { path: '/user/documents/participationCertificate', element: <UserParticipationCertificate /> },
          { path: '/user/participations', element: <UserParticipations /> },
          { path: '/user/reviewParticipations', element: <ReviewParticipations /> },
          { path: '/user/reviews', element: <UserReviews /> },
          { path: '*', element: <Page404 /> },
        ],
      },
    ],
  },
])

export default router
