import { Button, Skeleton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQueryUserParticipation } from '../../hooks/api/queries'

const eventStatusToI18nKeyMap = {
  approved: 'common.approved',
  pending: 'common.pending',
  rejected: 'common.rejected',
}

export default function ParticipationMenu({ eventId }: { eventId: string }): JSX.Element {
  const { t } = useTranslation()
  const participationQuery = useQueryUserParticipation({ eventId })

  return (
    <>
      {participationQuery.isLoading ? (
        <Skeleton variant='rounded' />
      ) : participationQuery.isSuccess && participationQuery.data ? (
        <>
          {t('pages.event.participatingMenuParticipatingLabel', {
            status: t(eventStatusToI18nKeyMap[participationQuery.data.status] || 'common.unkonwn'),
          })}
          Participating: {participationQuery.data.status}
        </>
      ) : (
        <Button variant='contained' component={RouterLink} to={`/events/${eventId}/participate`}>
          {t('common.participate')}
        </Button>
      )}
    </>
  )
}
