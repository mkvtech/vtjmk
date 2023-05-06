import { Container, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError'
import NoDataText from '../../../../components/Typography/NoDataText'
import { useQueryEventParticipations } from '../../../../hooks/api/queries'
import ParticipantsTable from './ParticipantsMenu'

export default function Participants(): JSX.Element {
  const { t } = useTranslation()
  const { eventId } = useParams() as { eventId: string }
  const participationsQuery = useQueryEventParticipations({ eventId })

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      {participationsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : participationsQuery.isSuccess && participationsQuery.data.length > 0 ? (
        <ParticipantsTable participations={participationsQuery.data} />
      ) : participationsQuery.isSuccess ? (
        <>
          <NoDataText>{t('common.noData')}</NoDataText>
        </>
      ) : (
        <PageError error={participationsQuery.error} />
      )}
    </Container>
  )
}
