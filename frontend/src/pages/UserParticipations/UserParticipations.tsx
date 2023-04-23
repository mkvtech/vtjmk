import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { Navigate, Link as RouterLink } from 'react-router-dom'
import Link from '../../components/Link'
import { useQueryUserParticipations } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'
import { useTranslation } from 'react-i18next'
import ParticipationStatusChip from '../../components/ParticipationStatusChip'

export default function UserParticipations(): JSX.Element {
  const { t } = useTranslation()
  const { isAuthenticated } = useApi()
  const userParticipationsQuery = useQueryUserParticipations()

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <Container maxWidth='lg' sx={{ my: 8 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        Participated Conferences
      </Typography>

      {userParticipationsQuery.isLoading
        ? 'Loading'
        : userParticipationsQuery.isSuccess
        ? userParticipationsQuery.data.map((participation) => (
            <Paper key={participation.id} sx={{ mt: 2 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h2'>{participation.event.title}</Typography>

                <Typography>
                  {dayjs(participation.event.date).isBefore(dayjs())
                    ? `Conference took place ${dayjs(participation.event.date).format('DD/MM/YYYY')}`
                    : `Conference will take place ${dayjs(participation.event.date).format('DD/MM/YYYY')}`}
                </Typography>

                <Typography>
                  <Link href={`/events/${participation.eventId}`}>Event page</Link>
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Button
                    component={RouterLink}
                    to={`/user/documents/participationCertificate?participationId=${participation.id}`}
                  >
                    Get Certificate
                  </Button>
                  <Button component={RouterLink} to={`/participations/${participation.id}`}>
                    View
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography>
                    <Typography component='span' color='textSecondary'>
                      {t('common.createdAt', { date: participation.createdAt })}
                      {/* {Intl.DateTimeFormat(i18n.language).format(participation.createdAt)} */}
                    </Typography>
                  </Typography>
                  <ParticipationStatusChip status={participation.status} sx={{ ml: 2 }} />
                </Box>
              </Box>
            </Paper>
          ))
        : 'Error'}
    </Container>
  )
}
