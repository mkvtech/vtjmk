import { Container, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError'
import NoDataText from '../../../../components/Typography/NoDataText'
import { useQueryEvent, useQueryEventParticipations } from '../../../../hooks/api/queries'
import Form from './Form'
import GenerateFileMenu from './GenerateFileMenu'

export default function Participants(): JSX.Element {
  const { t } = useTranslation()
  const { eventId } = useParams() as { eventId: string }
  const participationsQuery = useQueryEventParticipations({ eventId })
  const eventQuery = useQueryEvent(eventId)

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      {participationsQuery.isLoading || eventQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : eventQuery.isSuccess && participationsQuery.isSuccess && participationsQuery.data.length > 0 ? (
        <>
          <GenerateFileMenu event={eventQuery.data} />

          <Form initialData={{ date: eventQuery.data.date, participations: participationsQuery.data }} />
        </>
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
