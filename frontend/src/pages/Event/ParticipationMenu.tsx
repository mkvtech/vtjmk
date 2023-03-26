import { Button, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useQueryUserParticipation } from '../../hooks/api/queries'

export default function ParticipationMenu({ eventId }: { eventId: string }): JSX.Element {
  const participationQuery = useQueryUserParticipation({ eventId })

  return (
    <>
      {participationQuery.isLoading ? (
        <Skeleton variant='rounded' />
      ) : participationQuery.isSuccess && participationQuery.data ? (
        <>Participating: {participationQuery.data.status}</>
      ) : (
        <Button variant='contained' component={RouterLink} to={`/events/${eventId}/participate`}>
          Participate
        </Button>
      )}
    </>
  )
}
