import { Box, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PageError from '../../components/PageError/PageError'
import NoDataText from '../../components/Typography/NoDataText'
import { useQueryParticipationComments } from '../../hooks/api/queries'
import CommentForm from './CommentForm'

export default function Activity({ showForm }: { showForm: boolean }): JSX.Element {
  const { t, i18n } = useTranslation()
  const { participationId } = useParams() as { participationId: string }

  const commentsQuery = useQueryParticipationComments({ participationId })

  return (
    <>
      <Typography variant='h2' sx={{ my: 4 }}>
        {t('pages.participation.activityHeading')}
      </Typography>

      {showForm && <CommentForm />}

      {commentsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : commentsQuery.isSuccess ? (
        <Box>
          {commentsQuery.data ? (
            <>
              <Typography>{t('common.commentsWithCount', { count: commentsQuery.data.length })}</Typography>

              {commentsQuery.data.map((comment) => (
                <Box key={comment.id} sx={{ mt: 4 }}>
                  <Typography>
                    <b>{comment.user.fullName}</b>{' '}
                    <Typography component='span' color='textSecondary'>
                      {Intl.DateTimeFormat(i18n.language).format(comment.createdAt)}
                    </Typography>
                  </Typography>

                  <Typography>{comment.text}</Typography>
                </Box>
              ))}
            </>
          ) : (
            <NoDataText>{t('pages.participation.noComments')}</NoDataText>
          )}
        </Box>
      ) : (
        <PageError withTitle={false} error={commentsQuery.error} />
      )}
    </>
  )
}
