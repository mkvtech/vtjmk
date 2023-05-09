import { LoadingButton } from '@mui/lab'
import { Box, Paper, Typography, styled } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import Link from '../../components/Link/Link'
import { Permission } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import { TI } from '../../share'

const permissionActionToI18nKeyMap: Record<string, string> = {
  manage: 'common.permissionManage',
  read: 'common.permissionRead',
}

const HighlightedText = styled('span')((_theme) => ({
  fontWeight: 900,
}))

const SecondaryText = styled('span')((theme) => ({
  color: theme.theme.palette.grey[600],
}))

export default function PermissionsItem({ permission }: { permission: Permission }): JSX.Element {
  const { t } = useTranslation()
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

  const {
    action,
    targetType,
    targetId,
    target: { title: targetTitle },
  } = permission
  const targetLinkTo = targetType === 'Conference' ? `/conferences/${targetId}` : `/events/${targetId}`
  const actionText = t(permissionActionToI18nKeyMap[action])

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>
          <HighlightedText>{permission.user.fullName}</HighlightedText>{' '}
          <SecondaryText>{permission.user.email}</SecondaryText>
        </Typography>

        <LoadingButton color='error' variant='outlined' loading={deleteMutation.isLoading} onClick={handleClickDelete}>
          {t('common.delete')}
        </LoadingButton>
      </Box>

      <Typography sx={{ mt: 1 }}>
        <Trans i18nKey='pages.permissions.permissionItemDescription'>
          <SecondaryText>Action:</SecondaryText> <em>{{ action: actionText } as TI}</em>,{' '}
          <SecondaryText>Target:</SecondaryText> <Link href={targetLinkTo}>{{ targetTitle } as TI}</Link>
        </Trans>
      </Typography>
    </Paper>
  )
}
