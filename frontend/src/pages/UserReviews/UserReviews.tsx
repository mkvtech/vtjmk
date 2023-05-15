import { Box, Container, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PageError from '../../components/PageError/PageError'
import NoDataText from '../../components/Typography/NoDataText'
import { useQueryUserReviews } from '../../hooks/api/queries'
import ReviewsList from './ReviewsList'

export default function UserReviews(): JSX.Element {
  const { t } = useTranslation()
  const pendingReviewsQuery = useQueryUserReviews({ status: ['pending'] })
  const completedReviewsQuery = useQueryUserReviews({ status: ['approved', 'rejected'] })

  return (
    <Container maxWidth='lg' sx={{ my: 8 }}>
      <Typography variant='h1'>{t('pages.userReviews.title')}</Typography>

      {pendingReviewsQuery.isLoading || completedReviewsQuery.isLoading ? (
        <Box sx={{ my: 2 }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      ) : pendingReviewsQuery.isSuccess && completedReviewsQuery.isSuccess ? (
        <>
          {pendingReviewsQuery.data.length > 0 ? (
            <>
              <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
                {t('pages.userReviews.pendingReviews')}
              </Typography>

              <ReviewsList reviews={pendingReviewsQuery.data} />
            </>
          ) : null}

          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('pages.userReviews.previouslyReviewedPapers')}
          </Typography>

          {completedReviewsQuery.data.length > 0 ? (
            <ReviewsList reviews={completedReviewsQuery.data} />
          ) : (
            <NoDataText>{t('common.noData')}</NoDataText>
          )}
        </>
      ) : (
        <PageError error={completedReviewsQuery.error} />
      )}
    </Container>
  )
}
