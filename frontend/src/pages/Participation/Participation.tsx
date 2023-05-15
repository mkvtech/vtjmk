import { Box, Container, Divider, Grid, Link, Paper, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Link as RouterLink, Routes, useMatch, useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import PageError from '../../components/PageError/PageError'
import SpanCreatedAt from '../../components/Typography/SpanCreatedAt'
import { useQueryParticipation, useQueryPolicies } from '../../hooks/api/queries'
import { useIsAllowed } from '../../hooks/api/share'
import Activity from './Activity'
import General from './General'
import Reviews from './MainColumn/Tabs/Reviews/Reviews'
import OptionsButton from './OptionsButton'
import Reviewer from './Reviewer'
import Reviewers from './SideColumn/Reviewers/Reviewers'
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
          reviewsCreate: z.boolean(),
          update: z.boolean(),
          updateReviewer: z.boolean(),
          updateStatus: z.boolean(),
        })
      ),
    }),
  }),
})

const tabRoutes = ['activity', 'reviews']

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
              'reviewsCreate',
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

  const match = useMatch('/participations/:id/:tab')
  const currentTab = match?.params.tab
  if (!currentTab || !tabRoutes.includes(currentTab)) {
    return <Navigate to={tabRoutes[0]} replace />
  }

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

                {participationQuery.data.reviews !== null ? (
                  <Reviewers reviews={participationQuery.data.reviews} />
                ) : null}

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

              {participationQuery.data.reviews !== null ? (
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentTab} aria-label='Tabs'>
                      <Tab label={t('common.activity')} value='activity' to='activity' component={RouterLink} />
                      <Tab label={t('common.reviews')} value='reviews' to='reviews' component={RouterLink} />
                    </Tabs>
                  </Box>

                  <Routes>
                    <Route path='activity' element={<Activity showForm={isAllowed('comment')} />} />
                    <Route
                      path='reviews'
                      element={
                        <Reviews reviews={participationQuery.data.reviews} showForm={isAllowed('reviewsCreate')} />
                      }
                    />
                  </Routes>
                </>
              ) : (
                <>
                  <Typography variant='h2'>{t('common.activity')}</Typography>

                  <Activity showForm={isAllowed('comment')} />
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
