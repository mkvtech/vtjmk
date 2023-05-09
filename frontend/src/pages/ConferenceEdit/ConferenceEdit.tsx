import { Box, Container, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Link as RouterLink, Routes, useMatch, useParams } from 'react-router-dom'
import Link from '../../components/Link/Link'
import PageError from '../../components/PageError/PageError'
import { useQueryConference } from '../../hooks/api/queries'
import Description from './tabs/Description'
import DocumentTemplates from './tabs/DocumentTemplates'
import Events from './tabs/Events'
import General from './tabs/General'

export default function ConferenceEdit(): JSX.Element {
  const { conferenceId } = useParams()

  return conferenceId === undefined ? <Navigate to='/conferences' replace /> : <Page conferenceId={conferenceId} />
}

function Page({ conferenceId }: { conferenceId: string }): JSX.Element {
  const { t } = useTranslation()
  const conferenceQuery = useQueryConference(conferenceId)

  const match = useMatch('/conferences/:id/edit/:tab')
  const currentTab = match?.params.tab || 'general'

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {conferenceQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : conferenceQuery.isError ? (
        <PageError error={conferenceQuery.error} withTitle />
      ) : (
        <>
          <Typography>
            <Link href={`/conferences/${conferenceId}`}>{t('common.backToConferencePage')}</Link>
          </Typography>

          <Typography variant='h1' sx={{ mb: 2 }}>
            {conferenceQuery.isSuccess ? (
              t('common.editingSomethingQuoted', { something: conferenceQuery.data.title })
            ) : (
              <Skeleton />
            )}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} aria-label='tabs'>
              <Tab label={t('common.general')} value='general' to='general' component={RouterLink} />
              <Tab label={t('common.description')} value='description' to='description' component={RouterLink} />
              <Tab
                label={t('common.documentTemplates')}
                value='documentTemplates'
                to='documentTemplates'
                component={RouterLink}
              />
              <Tab label={t('common.events')} value='events' to='events' component={RouterLink} />
            </Tabs>
          </Box>

          <Routes>
            <Route path='general' element={<General />} />
            <Route path='description' element={<Description />} />
            <Route path='documentTemplates' element={<DocumentTemplates />} />
            <Route path='events' element={<Events />} />
          </Routes>
        </>
      )}
    </Container>
  )
}
