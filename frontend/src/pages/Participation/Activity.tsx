import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Link from '../../components/Link/Link'
import PageError from '../../components/PageError/PageError'
import NoDataText from '../../components/Typography/NoDataText'
import SpanCreatedAt from '../../components/Typography/SpanCreatedAt'
import UnstyledList from '../../components/UnstyledList/UnstyledList'
import UnstyledListItem from '../../components/UnstyledList/UnstyledListItem'
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
          {commentsQuery.data.length === 0 ? (
            <NoDataText>{t('pages.participation.noComments')}</NoDataText>
          ) : (
            <>
              <Typography>{t('common.commentsWithCount', { count: commentsQuery.data.length })}</Typography>

              <UnstyledList data-test-id='participation-activity'>
                {commentsQuery.data.map((comment) => (
                  <UnstyledListItem key={comment.id} sx={{ mt: 4, display: 'flex' }}>
                    <Avatar src={comment.user.avatarUrl} />

                    <Box sx={{ ml: 2 }}>
                      <Typography>
                        <Link color='inherit' underline='hover' href={`/users/${comment.userId}`}>
                          <b>{comment.user.fullName}</b>
                        </Link>{' '}
                        <SpanCreatedAt date={comment.createdAt} />
                      </Typography>

                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{comment.text}</Typography>
                    </Box>
                  </UnstyledListItem>
                ))}
              </UnstyledList>
            </>
          )}
        </Box>
      ) : (
        <PageError withTitle={false} error={commentsQuery.error} />
      )}
    </>
  )
}
