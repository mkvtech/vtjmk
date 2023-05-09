import { Box, Button, Container, Divider, Paper, Skeleton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Navigate, Link as RouterLink } from 'react-router-dom'
import Link from '../../components/Link'
import PageError from '../../components/PageError/PageError'
import ParticipationStatusChip from '../../components/ParticipationStatusChip'
import NoDataText from '../../components/Typography/NoDataText'
import { useQueryUserParticipations } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'

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
        {t('common.participatedConferences')}
      </Typography>

      {userParticipationsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : userParticipationsQuery.isSuccess && userParticipationsQuery.data.length ? (
        userParticipationsQuery.data.map((participation) => (
          <Paper key={participation.id} sx={{ mt: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant='h2'>{participation.event.title}</Typography>

              <Typography>
                {dayjs(participation.event.date).isBefore(dayjs())
                  ? t('common.tookPlace', { date: participation.event.date })
                  : t('common.willTakePlace', { date: participation.event.date })}
              </Typography>

              <Typography>
                <Link href={`/events/${participation.eventId}`}>{t('common.eventPage')}</Link>
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Button
                  component={RouterLink}
                  to={`/user/documents/participationCertificate?participationId=${participation.id}`}
                >
                  {t('common.getCertificate')}
                </Button>
                <Button component={RouterLink} to={`/participations/${participation.id}`}>
                  {t('common.view')}
                </Button>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>
                  <Typography component='span' color='textSecondary'>
                    {t('common.createdAtDate', { date: participation.createdAt })}
                    {/* {Intl.DateTimeFormat(i18n.language).format(participation.createdAt)} */}
                  </Typography>
                </Typography>

                <ParticipationStatusChip status={participation.status} sx={{ ml: 2, mr: 1 }} />
              </Box>
            </Box>
          </Paper>
        ))
      ) : userParticipationsQuery.isSuccess ? (
        <NoDataText sx={{ mt: 4 }}>{t('common.noData')}</NoDataText>
      ) : (
        <PageError error={userParticipationsQuery.error} />
      )}
    </Container>
  )
}
