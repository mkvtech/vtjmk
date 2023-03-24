import { Box, Button, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useQueryAttendances } from '../../hooks/api/queries'

export default function AttendanceMenu({
  currentUserId,
  eventId,
}: {
  currentUserId: string
  eventId: string
}): JSX.Element {
  const attendancesQuery = useQueryAttendances({ eventId, userId: currentUserId })

  return (
    <Box>
      {attendancesQuery.isLoading ? (
        <Skeleton variant='rounded' />
      ) : attendancesQuery.isSuccess && attendancesQuery.data[0] ? (
        <Box>
          Attending: {attendancesQuery.data[0].status}
          <Button component={RouterLink} to='/'>
            Edit
          </Button>
        </Box>
      ) : (
        <Box>
          <Button variant='contained' component={RouterLink} to={`/events/${eventId}/participate`}>
            Participate
          </Button>
        </Box>
      )}
    </Box>
  )
}
