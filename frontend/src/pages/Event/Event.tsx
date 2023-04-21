import { Edit } from '@mui/icons-material'
import { Badge, Button, Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Trans, useTranslation } from 'react-i18next'

import Link from '../../components/Link'
import { fetchEventsParticipations, useQueryConference, useQueryEvent } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'
import { useIsAllowed } from '../../hooks/api/share'
import ParticipationMenu from './ParticipationMenu'
import { useQuery } from 'react-query'
import LexicalView from '../../components/Lexical/LexicalView'
import PageError from '../../components/PageError'

const EVENT_PAGE_POLICIES_SCHEMA = z.object({
  policies: z.object({
    events: z.object({
      items: z.record(
        z.object({
          update: z.boolean(),
          participationsIndex: z.boolean(),
        })
      ),
    }),
  }),
})

export default function Event(): JSX.Element {
  const { eventId } = useParams()

  return eventId ? <Page eventId={eventId} /> : <Navigate to='/conferences' replace />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const { t } = useTranslation()

  const policiesQueryInput = {
    policies: {
      events: {
        items: {
          [eventId]: ['update', 'participationsIndex'],
        },
      },
    },
  }

  const { client, session } = useApi()

  const policiesQuery = useQuery(
    ['policies', policiesQueryInput],
    () =>
      client.post('/policies', policiesQueryInput).then((response) => EVENT_PAGE_POLICIES_SCHEMA.parse(response.data)),
    {
      enabled: !!session,
    }
  )
  const isAllowed = useIsAllowed(policiesQuery, 'events', eventId)

  const eventQuery = useQueryEvent(eventId)
  // TODO: eventQuery must also return conference data
  const conferenceQuery = useQueryConference(eventQuery.data?.conferenceId)
  const participationsQuery = useQuery(
    ['events', eventId, 'participations'],
    () => fetchEventsParticipations({ client, eventId }),
    {
      enabled: isAllowed('participationsIndex'),
      select: (data) => data.filter((participation) => participation.status === 'pending').length,
    }
  )

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {eventQuery.isLoading || eventQuery.isIdle ? (
        <Typography component='p'>We are loading conference...</Typography>
      ) : eventQuery.isError ? (
        <PageError withTitle error={eventQuery.error} />
      ) : (
        <>
          {conferenceQuery.isSuccess && (
            <Typography>
              <Link href={`/conferences/${eventQuery.data.conferenceId}`}>{conferenceQuery.data.title}</Link>
            </Typography>
          )}

          <Typography variant='h1'>{eventQuery.data.title}</Typography>

          <Box sx={{ my: 2 }}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <Typography>
                {dayjs(eventQuery.data.date).isBefore(dayjs())
                  ? t('common.tookPlace', { date: eventQuery.data.date })
                  : t('common.willTakePlace', { date: eventQuery.data.date })}
              </Typography>

              {!session ? (
                <Typography component='p'>
                  <Trans i18nKey='common.youMustLoginToAttend'>
                    You must <Link href='/login'>login</Link> to attend
                  </Trans>
                </Typography>
              ) : (
                <ParticipationMenu eventId={eventId} />
              )}
            </Box>
          </Box>

          {policiesQuery.isSuccess && (isAllowed('participationsIndex') || isAllowed('update')) && (
            <>
              <Divider />

              <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                {isAllowed('participationsIndex') && (
                  <Box display='flex'>
                    <Badge badgeContent={participationsQuery.isSuccess ? participationsQuery.data : 0} color='primary'>
                      <Button component={RouterLink} to={`/events/${eventId}/participants`}>
                        {t('common.viewParticipants')}
                      </Button>
                    </Badge>
                  </Box>
                )}

                {isAllowed('update') && (
                  <Button
                    variant='contained'
                    startIcon={<Edit />}
                    component={RouterLink}
                    to={`/events/${eventId}/edit`}
                  >
                    {t('common.edit')}
                  </Button>
                )}
              </Box>
            </>
          )}

          <Divider />

          <Box sx={{ my: 2 }}>
            <LexicalView initialEditorState={eventQuery.data.description} />
          </Box>
        </>
      )}
    </Container>
  )
}
