import { Edit } from '@mui/icons-material'
import { Box, Button, Container, Divider, List, ListItem, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom'
import { z } from 'zod'
import LexicalView from '../../components/Lexical/LexicalView'
import Link from '../../components/Link'
import { useQueryConference, useQueryEvents, useQueryPolicies } from '../../hooks/api/queries'
import { useIsAllowed } from '../../hooks/api/share'

const policiesSchema = z.object({
  policies: z.object({
    conferences: z.object({
      items: z.record(
        z.object({
          documentTemplatesIndex: z.boolean(),
          update: z.boolean(),
        })
      ),
    }),
  }),
})

export default function Conference(): JSX.Element {
  const { conferenceId } = useParams()

  return conferenceId ? <Page conferenceId={conferenceId} /> : <Navigate to='/conferences' />
}

function Page({ conferenceId }: { conferenceId: string }): JSX.Element {
  const { t } = useTranslation()

  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        conferences: {
          items: {
            [conferenceId]: ['update', 'documentTemplatesIndex'],
          },
        },
      },
    },
    schema: policiesSchema,
  })
  const isAllowed = useIsAllowed(policiesQuery, 'conferences', conferenceId)

  const conferenceQuery = useQueryConference(conferenceId)
  const eventsQuery = useQueryEvents({ conferenceId })

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      {conferenceQuery.isError ? (
        <Typography component='p'>/!\ There was an error while loading a query</Typography>
      ) : conferenceQuery.isLoading || conferenceQuery.isIdle ? (
        <>
          <Typography variant='h1'>
            <Skeleton />
          </Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <div>
          <Typography variant='h1' sx={{ my: 4 }}>
            {conferenceQuery.data.title}
          </Typography>

          {isAllowed('update') && (
            <>
              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                <Button
                  variant='contained'
                  startIcon={<Edit />}
                  component={RouterLink}
                  to={`/conferences/${conferenceId}/edit/general`}
                >
                  {t('common.edit')}
                </Button>
              </Box>
            </>
          )}

          <Divider />

          <Box sx={{ my: 2 }}>
            <LexicalView initialEditorState={conferenceQuery.data.description} />
          </Box>

          <Typography variant='h1'>{t('common.events')}</Typography>

          {eventsQuery.isError ? (
            <Typography component='p'>Cannot load conference events</Typography>
          ) : eventsQuery.isLoading || eventsQuery.isIdle ? (
            <Typography component='p'>We are loading conference events...</Typography>
          ) : (
            <List>
              {eventsQuery.data.map((event) => (
                <ListItem key={event.id}>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      )}
    </Container>
  )
}
