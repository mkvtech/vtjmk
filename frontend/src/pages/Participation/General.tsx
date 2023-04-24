import { Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import ReadonlyFilesView from '../../components/MultipleFilesUpload/ReadonlyFilesView'
import { useQueryParticipation } from '../../hooks/api/queries'
import GeneralForm from './GeneralForm'
import NoDataText from '../../components/Typography/NoDataText'

export default function General({ edit, onEditDone }: { edit: boolean; onEditDone: () => void }): JSX.Element {
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
            <NoDataText sx={{ my: 2 }}>This submission has no title</NoDataText>
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
            <NoDataText>This submission has no description</NoDataText>
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
        Attachments
      </Typography>

      {participationQuery.isSuccess ? (
        <>
          {participationQuery.data.submissionFiles.length === 0 ? (
            <NoDataText sx={{ my: 2 }}>No files attached</NoDataText>
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
