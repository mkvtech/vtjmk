import { Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ReadonlyFilesView from '../../components/MultipleFilesUpload/ReadonlyFilesView'
import NoDataText from '../../components/Typography/NoDataText'
import { useQueryParticipation } from '../../hooks/api/queries'
import GeneralForm from './GeneralForm'

export default function General({ edit, onEditDone }: { edit: boolean; onEditDone: () => void }): JSX.Element {
  const { t } = useTranslation()
  const { participationId } = useParams() as { participationId: string }
  const participationQuery = useQueryParticipation({ participationId })

  if (edit && participationQuery.isSuccess) {
    return (
      <GeneralForm
        initialData={{
          submissionTitle: participationQuery.data.submissionTitle,
          submissionDescription: participationQuery.data.submissionDescription,
          submissionFiles: participationQuery.data.submissionFiles,
        }}
        onDone={onEditDone}
      />
    )
  }

  return (
    <>
      {participationQuery.isSuccess ? (
        <>
          {participationQuery.data.submissionTitle ? (
            <Typography variant='h2' sx={{ mt: 4 }}>
              {participationQuery.data.submissionTitle}
            </Typography>
          ) : (
            <NoDataText sx={{ my: 2 }}>{t('pages.participation.submissionHasNoTitle')}</NoDataText>
          )}
        </>
      ) : (
        <Typography variant='h2' sx={{ mt: 4 }}>
          <Skeleton />
        </Typography>
      )}

      {participationQuery.isSuccess ? (
        <>
          {participationQuery.data.submissionDescription ? (
            <Typography>{participationQuery.data.submissionDescription}</Typography>
          ) : (
            <NoDataText>{t('pages.participation.submissionHasNoDescription')}</NoDataText>
          )}
        </>
      ) : (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton width='60%' />
        </>
      )}

      <Typography variant='h2' sx={{ my: 4 }}>
        {t('common.attachments')}
      </Typography>

      {participationQuery.isSuccess ? (
        <>
          {participationQuery.data.submissionFiles.length === 0 ? (
            <NoDataText sx={{ my: 2 }}>{t('pages.participation.submissionHasNoAttachments')}</NoDataText>
          ) : (
            <ReadonlyFilesView files={participationQuery.data.submissionFiles} sx={{ my: 2 }} />
          )}
        </>
      ) : (
        <Skeleton variant='rounded' sx={{ height: '200px' }} />
      )}
    </>
  )
}
