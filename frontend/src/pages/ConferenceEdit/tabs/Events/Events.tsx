import { Edit } from '@mui/icons-material'
import { Box, Button, Container, Divider, Paper, Skeleton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError/PageError'
import NoDataText from '../../../../components/Typography/NoDataText'
import { useQueryConference, useQueryEvents } from '../../../../hooks/api/queries'
import CreateEvent from './CreateEvent'

export default function Events(): JSX.Element {
  const { conferenceId } = useParams() as { conferenceId: string }
  const { t } = useTranslation()

  const [showForm, setShowForm] = useState(false)

  const conferenceQuery = useQueryConference(conferenceId)
  const eventsQuery = useQueryEvents({ conferenceId })

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      {conferenceQuery.isLoading ? (
        <Skeleton />
      ) : conferenceQuery.isSuccess ? (
        <>
          {showForm ? (
            <>
              <Typography variant='h2'>{t('common.createEvent')}</Typography>

              <CreateEvent conference={conferenceQuery.data} onCancel={(): void => setShowForm(false)} />

              <Divider sx={{ mb: 4 }} />
            </>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} onClick={(): void => setShowForm(!showForm)}>
              <Button variant='contained'>{t('common.createEvent')}</Button>
            </Box>
          )}
        </>
      ) : null}

      {eventsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : eventsQuery.isSuccess && eventsQuery.data.length === 0 ? (
        <NoDataText>No events</NoDataText>
      ) : eventsQuery.isSuccess ? (
        <>
          {eventsQuery.data.map((event) => (
            <Paper key={event.id} sx={{ mt: 2 }}>
              <Box sx={{ p: 2 }}>
                <Typography variant='h2'>{event.title}</Typography>
              </Box>

              <Divider />

              <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography color='textSecondary'>{dayjs(event.date).format('LL')}</Typography>
                </Box>

                <Button component={RouterLink} to={`/events/${event.id}`} sx={{ ml: 2 }}>
                  {t('common.view')}
                </Button>
                <Button
                  component={RouterLink}
                  to={`/events/${event.id}/edit`}
                  sx={{ ml: 2 }}
                  startIcon={<Edit />}
                  variant='contained'
                >
                  {t('common.edit')}
                </Button>
              </Box>
            </Paper>
          ))}
        </>
      ) : (
        <PageError error={eventsQuery.error} />
      )}
    </Container>
  )
}
