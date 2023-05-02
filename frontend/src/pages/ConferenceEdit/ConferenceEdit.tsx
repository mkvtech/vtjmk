import { Box, Container, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link/Link'
import PageError from '../../components/PageError/PageError'
import { useQueryConference } from '../../hooks/api/queries'
import Description from './tabs/Description/Description'
import General from './tabs/General/General'

export default function ConferenceEdit(): JSX.Element {
  const { conferenceId } = useParams()

  return conferenceId === undefined ? <Navigate to='/conferences' replace /> : <Page conferenceId={conferenceId} />
}

function Page({ conferenceId }: { conferenceId: string }): JSX.Element {
  const { t } = useTranslation()
  const conferenceQuery = useQueryConference(conferenceId)

  const [tabIndex, setTabIndex] = useState(0)

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
            <Link href={`/conferences/${conferenceId}`}>Back to conference page</Link>
          </Typography>

          <Typography variant='h1' sx={{ mb: 2 }}>
            {conferenceQuery.isSuccess ? (
              t('common.editingSomethingQuoted', { something: conferenceQuery.data.title })
            ) : (
              <Skeleton />
            )}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabIndex}
              onChange={(event, newTabIndex): void => setTabIndex(newTabIndex)}
              aria-label='event tabs'
            >
              <Tab label={t('common.general')} />
              <Tab label={t('common.description')} />
              <Tab label={t('common.documentTemplates')} />
              <Tab label={t('common.events')} />
            </Tabs>
          </Box>

          {tabIndex === 0 ? <General /> : tabIndex === 1 ? <Description /> : null}
        </>
      )}
    </Container>
  )
}
