import { Chip, SxProps, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ParticipationStatus } from '../../hooks/api/schemas'

export const statusToI18nKeyMap = {
  approved: 'common.approved',
  pending: 'common.pending',
  rejected: 'common.rejected',
}

export default function ParticipationStatusChip({
  status,
  onClick,
  sx,
}: {
  status: ParticipationStatus
  onClick?: () => void | null | undefined
  sx?: SxProps<Theme>
}): JSX.Element {
  const { t } = useTranslation()

  return (
    <Chip
      label={t(statusToI18nKeyMap[status])}
      color={status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'warning'}
      onClick={onClick}
      sx={sx}
    />
  )
}
