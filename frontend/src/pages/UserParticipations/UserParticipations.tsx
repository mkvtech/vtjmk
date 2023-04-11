import { Box, Container, Divider, Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { Navigate } from 'react-router-dom'
import Link from '../../components/Link'
import { useQueryUserParticipations } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'

export default function UserParticipations(): JSX.Element {
  const { isAuthenticated } = useApi()
  const userParticipationsQuery = useQueryUserParticipations()

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Participated Conferences
      </Typography>

      {userParticipationsQuery.isLoading
        ? 'Loading'
        : userParticipationsQuery.isSuccess
        ? userParticipationsQuery.data.map((participation) => (
            <Paper key={participation.id}>
              <Box sx={{ p: 2 }}>
                <Typography component='h2' variant='h4'>
                  {participation.event.title}
                </Typography>

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

              <Box sx={{ p: 2 }}>
                <Typography>
                  {participation.status === 'approved' ? (
                    <>
                      Participation request was <strong>approved</strong>
                    </>
                  ) : participation.status === 'rejected' ? (
                    <>
                      Participation request was <strong>rejected</strong>
                    </>
                  ) : (
                    <>
                      Participation request is <strong>pending</strong>
                    </>
                  )}
                  . Request was sent at {dayjs(participation.createdAt).format('DD/MM/YYYY')}. You can{' '}
                  <Link href={`/user/documents/participationCertificate?participationId=${participation.id}`}>
                    Generate a participation certificate
                  </Link>
                </Typography>
              </Box>
            </Paper>
          ))
        : 'Error'}
    </Container>
  )
}
