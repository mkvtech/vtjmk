import { Container, List, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'
import { fetchUserParticipations } from '../../hooks/api/queries'
import { UserParticipation } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import ParticipationListItem from './ParticipationListItem'

export default function ReviewParticipations(): JSX.Element {
  const { t } = useTranslation()
  const { client, isAuthenticated } = useApi()

  const [previouslyReviewedParticipations, setPreviouslyReviewedParticipations] = useState<
    readonly Readonly<UserParticipation>[]
  >([])
  const [pendingParticipations, setPendingParticipations] = useState<readonly Readonly<UserParticipation>[]>([])

  const userParticipationsQuery = useQuery(
    ['user', 'participations', { reviewable: true }],
    () => fetchUserParticipations({ client, params: { reviewable: true } }),
    {
      onSuccess: (data) => {
        setPendingParticipations(data.filter((participation) => participation.status === 'pending'))
        setPreviouslyReviewedParticipations(data.filter((participation) => participation.status !== 'pending'))
      },
    }
  )

  if (!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <Container maxWidth='lg' sx={{ my: 8 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        {t('pages.reviewedParticipations.papersAssignedForReview')}
      </Typography>

      {userParticipationsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : userParticipationsQuery.isSuccess && pendingParticipations.length === 0 ? (
        <>
          <Typography>{t('pages.reviewedParticipations.youDontHaveAnyReviewsAssigned')}</Typography>
        </>
      ) : userParticipationsQuery.isSuccess && pendingParticipations.length > 0 ? (
        <>
          <Typography>{t('pages.reviewedParticipations.thesePapersAreAwaitingReview')}</Typography>

          <List>
            {pendingParticipations.map((participation) => (
              <ParticipationListItem key={participation.id} participation={participation} />
            ))}
          </List>
        </>
      ) : (
        'Error'
      )}

      {previouslyReviewedParticipations.length > 0 && (
        <>
          <Typography variant='h1' sx={{ mt: 2, mb: 2 }}>
            {t('pages.reviewedParticipations.previouslyReviewedPapers')}
          </Typography>

          {previouslyReviewedParticipations.map((participation) => (
            <ParticipationListItem key={participation.id} participation={participation} />
          ))}
        </>
      )}
    </Container>
  )
}
