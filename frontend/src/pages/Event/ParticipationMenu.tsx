import { Box, Button, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import ParticipationStatusChip from '../../components/ParticipationStatusChip/ParticipationStatusChip'
import { useQueryUserParticipation } from '../../hooks/api/queries'

export default function ParticipationMenu({
  eventId,
  isAllowedToParticipate,
}: {
  eventId: string
  isAllowedToParticipate: boolean
}): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const participationQuery = useQueryUserParticipation({ eventId })

  return (
    <Box>
      {participationQuery.isLoading ? (
        <Skeleton variant='rounded' />
      ) : participationQuery.isSuccess && participationQuery.data ? (
        <>
          {t('common.participationRequestStatus')}:{' '}
          <ParticipationStatusChip
            status={participationQuery.data.status}
            onClick={(): void => participationQuery.data && navigate(`/participations/${participationQuery.data.id}`)}
          />
        </>
      ) : isAllowedToParticipate ? (
        <Button variant='contained' component={RouterLink} to={`/events/${eventId}/participate`}>
          {t('common.participate')}
        </Button>
      ) : null}
    </Box>
  )
}
