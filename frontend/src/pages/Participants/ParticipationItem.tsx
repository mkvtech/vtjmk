import { Button, CircularProgress, ListItem, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from 'react-query'

import { ParticipationStatus } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import { ParticipationWithUser } from './share'

export default function ParticipationItem({ participation }: { participation: ParticipationWithUser }): JSX.Element {
  const { client } = useApi()
  const queryClient = useQueryClient()
  const updateStatusMutation = useMutation(
    ({ status }: { status: ParticipationStatus }) =>
      client.patch(`/participations/${participation.id}/update_status`, { status }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(['events', participation.eventId, 'participations'])
      },
    }
  )

  const handleApprove = (): void => {
    updateStatusMutation.mutate({ status: 'approved' })
  }

  const handleReject = (): void => {
    updateStatusMutation.mutate({ status: 'rejected' })
  }

  return (
    <ListItem>
      <ListItemText
        primary={participation.user.fullName}
        secondary={`Sent ${dayjs(participation.createdAt).fromNow()}`}
      />

      {updateStatusMutation.isLoading ? (
        <CircularProgress />
      ) : participation.status === 'pending' ? (
        <>
          <Button color='success' onClick={handleApprove}>
            Approve
          </Button>
          <Button color='error' onClick={handleReject}>
            Reject
          </Button>
        </>
      ) : participation.status === 'approved' ? (
        <>
          Approved
          <Button color='error' onClick={handleReject}>
            Reject
          </Button>
        </>
      ) : participation.status === 'rejected' ? (
        <>
          Rejected
          <Button color='success' onClick={handleApprove}>
            Approve
          </Button>
        </>
      ) : null}
    </ListItem>
  )
}
