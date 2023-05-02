import { Edit } from '@mui/icons-material'
import { Badge, Button, Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import dayjs from 'dayjs'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom'
import { z } from 'zod'

import { useQuery } from 'react-query'
import EventStatusChip from '../../components/EventStatusChip/EventStatusChip'
import LexicalView from '../../components/Lexical/LexicalView'
import Link from '../../components/Link'
import PageError from '../../components/PageError'
import { fetchEventsParticipations, useQueryConference, useQueryEvent } from '../../hooks/api/queries'
import { useIsAllowed } from '../../hooks/api/share'
import { useApi } from '../../hooks/useApi'
import ParticipationMenu from './ParticipationMenu'

const EVENT_PAGE_POLICIES_SCHEMA = z.object({
  policies: z.object({
    events: z.object({
      items: z.record(
        z.object({
          update: z.boolean(),
          participate: z.boolean(),
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
          [eventId]: ['update', 'participate', 'participationsIndex'],
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
    () => fetchEventsParticipations({ client, params: { eventId } }),
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
                .{' '}
                {dayjs(eventQuery.data.registrationTo).isBefore(dayjs())
                  ? t('common.registrationWasFromDateToDate', {
                      fromDate: eventQuery.data.registrationFrom,
                      toDate: eventQuery.data.registrationTo,
                    })
                  : dayjs(eventQuery.data.registrationFrom).isAfter(dayjs())
                  ? t('common.registrationWillFromDateToDate', {
                      fromDate: eventQuery.data.registrationFrom,
                      toDate: eventQuery.data.registrationTo,
                    })
                  : t('common.registrationIsFromDateToDate', {
                      fromDate: eventQuery.data.registrationFrom,
                      toDate: eventQuery.data.registrationTo,
                    })}
              </Typography>

              {!session ? (
                <Typography component='p'>
                  <Trans i18nKey='common.youMustLoginToAttend'>
                    You must <Link href='/login'>login</Link> to attend
                  </Trans>
                </Typography>
              ) : (
                <ParticipationMenu eventId={eventId} isAllowedToParticipate={isAllowed('participate')} />
              )}
            </Box>
          </Box>

          {policiesQuery.isSuccess && (isAllowed('participationsIndex') || isAllowed('update')) && (
            <>
              <Divider />

              <Box sx={{ my: 2, display: 'flex', alignContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <EventStatusChip status={eventQuery.data.status} />
                </Box>

                {isAllowed('participationsIndex') && (
                  <Box display='flex'>
                    <Badge badgeContent={participationsQuery.isSuccess ? participationsQuery.data : 0} color='warning'>
                      <Button component={RouterLink} to={`/events/${eventId}/edit/participants`} variant='outlined'>
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
                    sx={{ ml: 2 }}
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
