import { Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ReadonlyFilesView from '../../components/MultipleFilesUpload/ReadonlyFilesView'
import PageError from '../../components/PageError/PageError'
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
      {participationQuery.isLoading ? (
        <>
          <Typography variant='h2' sx={{ mt: 4 }}>
            <Skeleton />
          </Typography>

          <Typography>
            <Skeleton />
            <Skeleton />
            <Skeleton width='60%' />
          </Typography>
        </>
      ) : participationQuery.isSuccess ? (
        <>
          {participationQuery.data.submissionTitle ? (
            <>
              <Typography variant='h2' sx={{ mt: 4 }}>
                {participationQuery.data.submissionTitle}
              </Typography>

              {participationQuery.data.submissionDescription ? (
                <Typography sx={{ my: 2 }}>{participationQuery.data.submissionDescription}</Typography>
              ) : (
                <NoDataText sx={{ my: 2 }}>{t('pages.participation.submissionHasNoDescription')}</NoDataText>
              )}
            </>
          ) : participationQuery.data.submissionDescription ? (
            <>
              <Typography variant='h2' sx={{ mt: 4 }}>
                {t('common.submissionDescription')}
              </Typography>

              <Typography sx={{ my: 2 }}>{participationQuery.data.submissionDescription}</Typography>
            </>
          ) : null}
        </>
      ) : (
        <PageError withTitle={false} error={participationQuery.error} />
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
