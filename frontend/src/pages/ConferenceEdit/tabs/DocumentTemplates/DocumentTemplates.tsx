import { LoadingButton } from '@mui/lab'
import { Box, Container, Paper, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import Link from '../../../../components/Link/Link'
import PageError from '../../../../components/PageError/PageError'
import SpanCreatedAt from '../../../../components/Typography/SpanCreatedAt'
import { useQueryConferenceDocumentTemplates } from '../../../../hooks/api/queries'
import { useApi } from '../../../../hooks/useApi'

export default function DocumentTemplates(): JSX.Element {
  const { conferenceId } = useParams() as { conferenceId: string }
  const { t } = useTranslation()
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
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Typography>
        <Link href={`/conferences/${conferenceId}/documentTemplates/create`}>{t('common.addNewDocumentTemplate')}</Link>
      </Typography>

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
                <Typography variant='h4' component='h2'>
                  {documentTemplate.name} <SpanCreatedAt date={documentTemplate.createdAt} />
                </Typography>

                <LoadingButton
                  color='error'
                  variant='outlined'
                  loading={deleteDocumentTemplateMutation.isLoading}
                  onClick={(): void => deleteDocumentTemplateMutation.mutate({ id: documentTemplate.id })}
                >
                  {t('common.delete')}
                </LoadingButton>
              </Box>
            </Paper>
          ))}
        </>
      ) : (
        <PageError error={templatesQuery.error} />
      )}
    </Container>
  )
}
