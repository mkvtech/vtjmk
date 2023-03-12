import { Button, CircularProgress, ListItem, ListItemText } from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMutation, useQueryClient } from 'react-query'
import { AttendanceStatus } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import { AttendanceWithUser } from './types'

dayjs.extend(relativeTime)

export default function AttendanceItem({ attendance }: { attendance: AttendanceWithUser }): JSX.Element {
  const { client } = useApi()
  const queryClient = useQueryClient()
  const updateStatusMutation = useMutation(
    ({ status }: { status: AttendanceStatus }) => {
      return client.patch(`/attendances/${attendance.id}`, { status })
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['/events', attendance.eventId, '/attendances'])
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
      <ListItemText primary={attendance.user.fullName} secondary={`Sent at ${dayjs(attendance.createdAt).fromNow()}`} />

      {updateStatusMutation.isLoading ? (
        <CircularProgress />
      ) : attendance.status === 'pending' ? (
        <>
          <Button color='success' onClick={handleApprove}>
            Approve
          </Button>
          <Button color='error' onClick={handleReject}>
            Reject
          </Button>
        </>
      ) : attendance.status === 'approved' ? (
        <>
          Approved
          <Button color='error' onClick={handleReject}>
            Reject
          </Button>
        </>
      ) : attendance.status === 'rejected' ? (
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
