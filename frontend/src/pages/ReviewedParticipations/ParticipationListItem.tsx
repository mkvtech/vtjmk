import { Box, Button, Divider, ListItem, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import ParticipationStatusChip from '../../components/ParticipationStatusChip'
import { UserParticipation } from '../../hooks/api/schemas'

export default function ParticipationListItem({ participation }: { participation: UserParticipation }): JSX.Element {
  const { t } = useTranslation()

  return (
    <ListItem sx={{ display: 'block' }}>
      <Paper sx={{ mt: 2 }}>
        <Box sx={{ p: 2 }}>
          {participation.submissionTitle ? (
            <>
              <Typography variant='h2'>{participation.submissionTitle}</Typography>

              <Typography sx={{ mt: 1 }} color='textSecondary'>
                {t('common.byName', { name: participation.user.fullName })}
              </Typography>
            </>
          ) : (
            <Typography variant='h2'>{participation.user.fullName}</Typography>
          )}
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 2 }}>
          <Typography component='span' color='textSecondary'>
            {t('common.createdAtDate', { date: participation.createdAt })}
            {/* {Intl.DateTimeFormat(i18n.language).format(participation.createdAt)} */}
          </Typography>

          <ParticipationStatusChip status={participation.status} sx={{ ml: 2 }} />

          <Button sx={{ ml: 1 }} component={RouterLink} to={`/participations/${participation.id}`}>
            {t('common.view')}
          </Button>
        </Box>
      </Paper>
    </ListItem>
  )
}
