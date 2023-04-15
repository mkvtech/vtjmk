import { LoadingButton } from '@mui/lab'
import { Box, Container, Divider, Paper, Skeleton, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useMutation } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import { useQueryConferenceDocumentTemplates } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'

export default function DocumentTemplates(): JSX.Element {
  const { conferenceId } = useParams()

  return conferenceId ? <Page conferenceId={conferenceId} /> : <Navigate to='/conferences' replace />
}

function Page({ conferenceId }: { conferenceId: string }): JSX.Element {
  const { client } = useApi()

  const templatesQuery = useQueryConferenceDocumentTemplates({ conferenceId })
  const deleteDocumentTemplateMutation = useMutation(
    ({ id }: { id: string }) => client.delete(`/document_templates/${id}`),
    {
      onSuccess: () => {
        templatesQuery.refetch()
      },
    }
  )

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <Link href={`/conferences/${conferenceId}`}>Back to conference page</Link>
        </Typography>

        <Typography>
          <Link href={`/conferences/${conferenceId}/documentTemplates/create`}>Create new Document Template</Link>
        </Typography>
      </Box>

      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Document Templates
      </Typography>

      <Divider />

      {templatesQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton width='60%' />
        </>
      ) : templatesQuery.isSuccess ? (
        <>
          {templatesQuery.data.map((documentTemplate) => (
            <Paper key={documentTemplate.id} sx={{ p: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography component='h2' variant='h4'>
                  {documentTemplate.name}
                </Typography>

                <LoadingButton
                  color='error'
                  variant='outlined'
                  loading={deleteDocumentTemplateMutation.isLoading}
                  onClick={(): void => deleteDocumentTemplateMutation.mutate({ id: documentTemplate.id })}
                >
                  Delete
                </LoadingButton>
              </Box>

              <Typography>{dayjs(documentTemplate.createdAt).toString()}</Typography>
            </Paper>
          ))}
        </>
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
