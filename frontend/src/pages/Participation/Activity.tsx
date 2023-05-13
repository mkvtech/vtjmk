import { Avatar, Box, List, ListItem, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PageError from '../../components/PageError/PageError'
import NoDataText from '../../components/Typography/NoDataText'
import SpanCreatedAt from '../../components/Typography/SpanCreatedAt'
import { useQueryParticipationComments } from '../../hooks/api/queries'
import CommentForm from './CommentForm'

export default function Activity({ showForm }: { showForm: boolean }): JSX.Element {
  const { t } = useTranslation()
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

              <List data-test-id='participation-activity'>
                {commentsQuery.data.map((comment) => (
                  <ListItem key={comment.id} sx={{ mt: 4, display: 'flex' }}>
                    <Avatar src={comment.user.avatarUrl} />

                    <Box sx={{ ml: 2 }}>
                      <Typography>
                        <b>{comment.user.fullName}</b> <SpanCreatedAt date={comment.createdAt} />
                      </Typography>

                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.text}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
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
