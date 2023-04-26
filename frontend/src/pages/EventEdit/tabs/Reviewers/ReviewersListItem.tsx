import { Remove } from '@mui/icons-material'
import { Avatar, Box, CircularProgress, IconButton, Paper, SxProps, Theme, Typography } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import SpanCreatedAt from '../../../../components/Typography/SpanCreatedAt'
import { EventReviewer } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'

export default function ReviewersListItem({
  reviewer,
  sx,
}: {
  reviewer: EventReviewer
  sx?: SxProps<Theme>
}): JSX.Element {
  const { client } = useApi()
  const queryClient = useQueryClient()

  const removeReviewerMutation = useMutation(({ eventId, reviewerId }: { eventId: string; reviewerId: string }) =>
    client.delete(`/events/${eventId}/reviewers/${reviewerId}`)
  )

  const handleRemove = (): void => {
    removeReviewerMutation.mutate(
      { eventId: reviewer.eventId, reviewerId: reviewer.reviewerId },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['events', reviewer.eventId, 'reviewers'])
          queryClient.invalidateQueries(['events', reviewer.eventId, 'users', 'available_as_reviewers'])
        },
      }
    )
  }

  return (
    <Paper sx={[{ display: 'flex', alignItems: 'center', p: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Avatar src={reviewer.reviewer.avatarUrl} sx={{ ml: 1 }} />

      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography>{reviewer.reviewer.fullName}</Typography>
        <Typography color='textSecondary'>{reviewer.reviewer.email}</Typography>
      </Box>

      <Typography>
        <SpanCreatedAt date={reviewer.createdAt} />
      </Typography>

      {removeReviewerMutation.isLoading ? (
        <CircularProgress sx={{ m: 1, ml: 2 }} size='32px' />
      ) : (
        <IconButton sx={{ ml: 2 }} onClick={handleRemove}>
          <Remove />
        </IconButton>
      )}
    </Paper>
  )
}
