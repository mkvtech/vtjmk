import { Box, Container, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Link as RouterLink, Routes, useMatch, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import PageError from '../../components/PageError/PageError'
import { useQueryEvent } from '../../hooks/api/queries'
import Description from './tabs/Description'
import General from './tabs/General/General'
import Participants from './tabs/Participants'
import ParticipationRequests from './tabs/ParticipationRequests'
import Reviewers from './tabs/Reviewers'

export default function EventEdit(): JSX.Element {
  const { eventId } = useParams<'eventId'>()

  return eventId === undefined ? <Navigate to='/conferences' replace /> : <Page eventId={eventId} />
}

const tabRoutes = ['general', 'description', 'reviewers', 'participants', 'participationRequests']

function Page({ eventId }: { eventId: string }): JSX.Element {
  const { t } = useTranslation()

  const eventQuery = useQueryEvent(eventId)

  const match = useMatch('/events/:id/edit/:tab')
  const currentTab = match?.params.tab

  if (!currentTab || !tabRoutes.includes(currentTab)) {
    // Note: Change carefully, this might start a recursion
    return <Navigate to='general' replace />
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {eventQuery.isError ? (
        <PageError error={eventQuery} withTitle />
      ) : (
        <>
          <Typography>
            <Link href={`/events/${eventId}`}>{t('common.backToEventPage')}</Link>
          </Typography>

          <Typography variant='h1' sx={{ mb: 2 }}>
            {eventQuery.isLoading || eventQuery.isIdle ? (
              <Skeleton sx={{ display: 'inline-block' }} width='66%' />
            ) : (
              t('common.editingSomethingQuoted', { something: eventQuery.data.title })
            )}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} aria-label='event tabs'>
              <Tab label={t('common.general')} value='general' to='general' component={RouterLink} />
              <Tab label={t('common.description')} value='description' to='description' component={RouterLink} />
              <Tab label={t('common.reviewers')} value='reviewers' to='reviewers' component={RouterLink} />
              <Tab label={t('common.participants')} value='participants' to='participants' component={RouterLink} />
              <Tab
                label={t('common.participationRequests')}
                value='participationRequests'
                to='participationRequests'
                component={RouterLink}
              />
            </Tabs>
          </Box>

          <Routes>
            <Route path='general' element={<General />} />
            <Route path='description' element={<Description />} />
            <Route path='reviewers' element={<Reviewers />} />
            <Route path='participants' element={<Participants />} />
            <Route path='participationRequests' element={<ParticipationRequests />} />
          </Routes>
        </>
      )}
    </Container>
  )
}
