import { Box, Container, Divider, Grid, Link, Paper, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import PageError from '../../components/PageError/PageError'
import SpanCreatedAt from '../../components/Typography/SpanCreatedAt'
import { useQueryParticipation, useQueryPolicies } from '../../hooks/api/queries'
import { useIsAllowed } from '../../hooks/api/share'
import Activity from './Activity'
import General from './General'
import OptionsButton from './OptionsButton'
import Reviewer from './Reviewer'
import Status from './Status'
import UserButton from './UserButton'

export default function Participation(): JSX.Element {
  const { participationId } = useParams()

  return participationId ? <Page participationId={participationId} /> : <Navigate to='/' replace />
}

const policiesSchema = z.object({
  policies: z.object({
    participations: z.object({
      items: z.record(
        z.object({
          comment: z.boolean(),
          destroy: z.boolean(),
          generateCertificate: z.boolean(),
          update: z.boolean(),
          updateReviewer: z.boolean(),
          updateStatus: z.boolean(),
        })
      ),
    }),
  }),
})

function Page({ participationId }: { participationId: string }): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const participationQuery = useQueryParticipation({ participationId })

  const [editGeneral, setEditGeneral] = useState(false)
  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        participations: {
          items: {
            [participationId]: [
              'comment',
              'destroy',
              'generateCertificate',
              'update',
              'updateReviewer',
              'updateStatus',
            ],
          },
        },
      },
    },
    schema: policiesSchema,
  })
  const isAllowed = useIsAllowed(policiesQuery, 'participations', participationId)

  const updateAllowed = isAllowed('update')
  const destroyAllowed = isAllowed('destroy')
  const generateCertificateAllowed = isAllowed('generateCertificate')

  const showOptions = updateAllowed || destroyAllowed || generateCertificateAllowed

  return participationQuery.isError ? (
    <PageError withTitle error={participationQuery.error} />
  ) : (
    <Container maxWidth='lg' sx={{ my: 8 }}>
      <Link component='button' onClick={(): void => navigate(-1)}>
        {t('common.back')}
      </Link>

      <Typography variant='h1'>{t('common.participationRequest')}</Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Typography sx={{ my: 2, flexGrow: 1 }}>
          {participationQuery.isSuccess ? (
            t('pages.participation.pageSubtitle', {
              userFullName: participationQuery.data.user.fullName,
              eventTitle: participationQuery.data.event.title,
            })
          ) : (
            <Skeleton />
          )}
        </Typography>

        {showOptions && (
          <OptionsButton
            actions={{ edit: updateAllowed, delete: destroyAllowed, generateCertificate: generateCertificateAllowed }}
            onEditClick={(): void => setEditGeneral(true)}
          />
        )}
      </Box>

      <Divider />

      {!participationQuery.isSuccess ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <Grid container columnSpacing={{ xs: 0, md: 4 }}>
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
              <Paper
                variant='outlined'
                sx={{ position: 'sticky', top: '150px', mt: 4, p: 2 }}
                data-test-id='participation-side-bar'
              >
                <Status editable={isAllowed('updateStatus')} />

                <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
                  {t('common.participant')}
                </Typography>

                <UserButton user={participationQuery.data.user} withEmail />

                <Reviewer editable={isAllowed('updateReviewer')} />

                <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
                  {t('common.createdAt')}
                </Typography>

                <Typography>
                  <SpanCreatedAt date={participationQuery.data.createdAt} />
                </Typography>

                <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
                  {t('common.lastUpdate')}
                </Typography>

                <Typography>
                  <SpanCreatedAt date={participationQuery.data.updatedAt} />
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
              <General edit={editGeneral} onEditDone={(): void => setEditGeneral(false)} />

              <Divider />

              <Activity showForm={isAllowed('comment')} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
