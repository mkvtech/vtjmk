import { Navigate, useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import Authenticated from './Authenticated'

export default function AttendanceForm(): JSX.Element {
  const { isAuthenticated } = useApi()
  const { eventId } = useParams()

  if (eventId === undefined) {
    return <Navigate to='/conferences' replace />
  }

  if (isAuthenticated) {
    return <Authenticated eventId={eventId} />
  }

  // return <Unauthenticated />
  return <Navigate to='/login' replace />
}
