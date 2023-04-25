import { Edit } from '@mui/icons-material'
import { Box, Chip, CircularProgress, Menu, MenuItem, Skeleton, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { statusToI18nKeyMap } from '../../components/ParticipationStatusChip/ParticipationStatusChip'
import { useQueryParticipation } from '../../hooks/api/queries'
import { ParticipationStatus } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'

const statuses = ['pending', 'approved', 'rejected'] as const

export default function Status({ editable }: { editable?: boolean }): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { participationId } = useParams() as { participationId: string }
  const participationQueryKey = ['participations', participationId]

  const participationQuery = useQueryParticipation({ participationId })

  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLElement>(null)

  const updateStatusMutation = useMutation(
    ({ status }: { status: ParticipationStatus }) =>
      client.patch(`/participations/${participationId}/update_status`, { status }),
    {
      // Perform optimistic update (just remove if there are any issues)
      // https://tanstack.com/query/v4/docs/react/guides/optimistic-updates#updating-a-single-todo
      onMutate: async ({ status }) => {
        if (!participationQuery.isSuccess) {
          return
        }

        await queryClient.cancelQueries({ queryKey: participationQueryKey })
        queryClient.setQueryData(participationQueryKey, { ...participationQuery.data, status })
      },

      onSettled: () => {
        queryClient.invalidateQueries(participationQueryKey)
      },
    }
  )

  const handleEditClick = (): void => {
    setOpen(true)
  }

  const handleMenuItemClick = (status: ParticipationStatus): void => {
    setOpen(false)
    updateStatusMutation.mutate({ status })
  }

  return (
    <>
      <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
        {t('common.status')}
      </Typography>

      {participationQuery.isSuccess ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }} ref={anchorRef}>
            {updateStatusMutation.isLoading ? (
              <CircularProgress size='32px' />
            ) : (
              <>
                <Chip
                  id='participation-status-button'
                  label={t(statusToI18nKeyMap[participationQuery.data.status])}
                  color={
                    participationQuery.data.status === 'approved'
                      ? 'success'
                      : participationQuery.data.status === 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                  onClick={editable ? handleEditClick : undefined}
                  onDelete={editable ? handleEditClick : undefined}
                  deleteIcon={<Edit fontSize='small' />}
                />
              </>
            )}
          </Box>

          <Menu
            id='participation-status-menu'
            anchorEl={anchorRef.current}
            open={!!open}
            onClose={(): void => setOpen(false)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            MenuListProps={{ 'aria-labelledby': 'participation-status-button' }}
          >
            {statuses.map((status) => (
              <MenuItem
                key={status}
                selected={status === participationQuery.data.status}
                onClick={(): void => handleMenuItemClick(status)}
              >
                {t(statusToI18nKeyMap[status])}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Skeleton sx={{ display: 'block' }} height='32px' />
      )}
    </>
  )
}
