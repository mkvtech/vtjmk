import { Box, Button, Typography } from '@mui/material'
import { t } from 'i18next'
import { Link as RouterLink } from 'react-router-dom'
import ParticipationStatusChip from '../../../../components/ParticipationStatusChip'
import { EventParticipation } from '../../../../hooks/api/schemas'
import UserButton from '../../../Participation/UserButton'

export default function ParticipantsListItem({ participation }: { participation: EventParticipation }): JSX.Element {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <UserButton user={participation.user} withEmail />

      <Typography sx={{ ml: 'auto' }} component='span' color='textSecondary'>
        {t('common.createdAtDate', { date: participation.createdAt })}
        {/* {Intl.DateTimeFormat(i18n.language).format(participation.createdAt)} */}
      </Typography>

      <ParticipationStatusChip status={participation.status} sx={{ ml: 2 }} />

      <Button sx={{ ml: 1 }} component={RouterLink} to={`/participations/${participation.id}`}>
        {t('common.view')}
      </Button>
    </Box>
  )
}
