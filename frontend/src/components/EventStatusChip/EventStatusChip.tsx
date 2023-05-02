import { Chip, SxProps, Theme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EventStatus } from '../../hooks/api/schemas'

export const eventStatusToI18nKeyMap = {
  open: 'common.open',
  hidden: 'common.hidden',
}

export default function EventStatusChip({ status, sx }: { status: EventStatus; sx?: SxProps<Theme> }): JSX.Element {
  const { t } = useTranslation()

  return <Chip color={status === 'open' ? 'success' : 'warning'} label={t(eventStatusToI18nKeyMap[status])} sx={sx} />
}
