import { Navigate, useParams } from 'react-router-dom'
import { useQueryParticipation, useQueryPolicies } from '../../hooks/api/queries'
import PageError from '../../components/PageError/PageError'
import { Box, Container, Divider, Grid, Skeleton, Typography } from '@mui/material'
import Status from './Status'
import { z } from 'zod'
import { useIsAllowed } from '../../hooks/api/share'
import General from './General'
import { useState } from 'react'
import OptionsButton, { OptionsButtonAction } from './OptionsButton'
import Reviewer from './Reviewer'
import { useTranslation } from 'react-i18next'

export default function Participation(): JSX.Element {
  const { participationId } = useParams()

  return participationId ? <Page participationId={participationId} /> : <Navigate to='/' replace />
}

const policiesSchema = z.object({
  policies: z.object({
    participations: z.object({
      items: z.record(
        z.object({
          update: z.boolean(),
          updateReviewer: z.boolean(),
          updateStatus: z.boolean(),
          destroy: z.boolean(),
        })
      ),
    }),
  }),
})

function Page({ participationId }: { participationId: string }): JSX.Element {
  const { t } = useTranslation()
  const participationQuery = useQueryParticipation({ participationId })

  const [editGeneral, setEditGeneral] = useState(false)
  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        participations: {
          items: {
            [participationId]: ['update', 'updateReviewer', 'updateStatus', 'destroy'],
          },
        },
      },
    },
    schema: policiesSchema,
  })
  const isAllowed = useIsAllowed(policiesQuery, 'participations', participationId)

  const updateAllowed = isAllowed('update')
  const destroyAllowed = isAllowed('destroy')

  return participationQuery.isError ? (
    <PageError withTitle error={participationQuery.error} />
  ) : (
    <Container maxWidth='lg' sx={{ my: 8 }}>
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

        {(updateAllowed || destroyAllowed) && (
          <OptionsButton
            actions={{ edit: updateAllowed, delete: destroyAllowed }}
            onActionClick={(action: OptionsButtonAction): void => {
              if (action === 'edit') {
                setEditGeneral(true)
              } else if (action === 'delete') {
                throw new Error('Not implemented!')
              }
            }}
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
            <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
              <Status editable={isAllowed('updateStatus')} />

              <Typography variant='h2' sx={{ my: 4 }}>
                {t('common.participant')}
              </Typography>

              <Typography>{participationQuery.data.user.fullName}</Typography>

              <Reviewer editable={isAllowed('updateReviewer')} />
            </Grid>

            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <General edit={editGeneral} onEditDone={(): void => setEditGeneral(false)} />

              <Divider />

              <Typography variant='h2' sx={{ my: 4 }}>
                {t('pages.participation.activityHeading')}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
