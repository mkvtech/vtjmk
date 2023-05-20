import { Alert, Typography } from '@mui/material'
import { Trans, useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import Link from '../../../../components/Link/Link'
import { fetchEventDocumentTemplates } from '../../../../hooks/api/queries'
import { Event } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'
import GenerateFileForm from './GenerateFileForm'

export default function GenerateFileMenu({ event }: { event: Event }): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()

  const availableTemplatesQuery = useQuery(['events', event.id, 'documentTemplates'], () =>
    fetchEventDocumentTemplates({ client, params: { eventId: event.id } })
  )

  return (
    <>
      <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
        {t('common.generateFile')}
      </Typography>

      {availableTemplatesQuery.isSuccess && availableTemplatesQuery.data.length === 0 ? (
        <Alert severity='warning'>
          <Trans i18nKey='pages.eventEdit.participantsTab.noDocumentTemplateAvailableNotice'>
            There is no document templates for participants list. You can upload a document template at{' '}
            <Link href={`/conferences/${event.conferenceId}/edit/documentTemplates`}>document templates page</Link>.
          </Trans>
        </Alert>
      ) : (
        <>
          <Alert severity='info' sx={{ mt: 2, mb: 4 }}>
            <Trans i18nKey='pages.eventEdit.participantsTab.documentTemplatesNotice'>
              You can manage document templates at{' '}
              <Link href={`/conferences/${event.conferenceId}/edit/documentTemplates`}>document templates page</Link>.
            </Trans>
          </Alert>

          <GenerateFileForm event={event} availableTemplatesQuery={availableTemplatesQuery} />
        </>
      )}
    </>
  )
}
