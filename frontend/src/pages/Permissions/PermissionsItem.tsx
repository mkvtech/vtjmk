import { Box, Paper, Typography, styled } from '@mui/material'
import { Permission } from '../../hooks/api/schemas'
import { LoadingButton } from '@mui/lab'
import { useMutation, useQueryClient } from 'react-query'
import { useApi } from '../../hooks/useApi'

const HighlightedText = styled('span')((_theme) => ({
  fontWeight: 900,
}))

const SecondaryText = styled('span')((theme) => ({
  color: theme.theme.palette.grey[600],
}))

export default function PermissionsItem({ permission }: { permission: Permission }): JSX.Element {
  const { client } = useApi()
  const queryClient = useQueryClient()

  const deleteMutation = useMutation((id: string) => client.delete(`/permissions/${id}`))

  const handleClickDelete = (): void => {
    deleteMutation.mutate(permission.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(['permissions'])
      },
    })
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>
          <HighlightedText>{permission.user.fullName}</HighlightedText>{' '}
          <SecondaryText>{permission.user.email}</SecondaryText>
        </Typography>

        <LoadingButton color='error' variant='outlined' loading={deleteMutation.isLoading} onClick={handleClickDelete}>
          Delete
        </LoadingButton>
      </Box>

      <Typography sx={{ mt: 1 }}>
        <SecondaryText>Action:</SecondaryText> <em>{permission.action}</em>, <SecondaryText>Target:</SecondaryText>{' '}
        {permission.targetType === 'Conference' ? 'Conference' : 'Event'}, {permission.target.title} (
        {permission.targetId})
      </Typography>
    </Paper>
  )
}
