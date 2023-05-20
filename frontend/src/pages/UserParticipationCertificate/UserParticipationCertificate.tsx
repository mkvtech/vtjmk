import { Download } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { useMutation, useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { fetchUserParticipations, fetchUserParticipationsDocumentTemplates } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'
import { downloadFromResponse } from '../../share'

type DocumentType = 'docx' | 'pdf'

interface FormValues {
  participationId: string | ''
  documentTemplateId: string | ''
  documentType: DocumentType
}

interface GenerateDocumentMutationData {
  participationId: string
  documentTemplateId: string
  documentType: DocumentType
}

export default function UserParticipationCertificate(): JSX.Element {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const queryStringParticipationId = searchParams.get('participationId')

  const { control, watch, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      participationId: queryStringParticipationId || '',
      documentTemplateId: '',
      documentType: 'pdf',
    },
  })

  const watchParticipationId = watch('participationId')
  const watchDocumentTemplateId = watch('documentTemplateId')

  const { client } = useApi()
  const userParticipationsQuery = useQuery(
    ['user', 'participations', { approved: true }],
    () => fetchUserParticipations({ client }),
    {
      select: (data) => data.filter((participation) => participation.status === 'approved'),
      onSuccess: (data) => {
        if (!data.find((participation) => participation.id === queryStringParticipationId)) {
          setValue('participationId', '')
          searchParams.delete('participationId')
          setSearchParams(searchParams)
        }
      },
    }
  )

  const documentTemplatesQuery = useQuery(
    ['user', 'participations', 'availableDocumentTemplates', { participationId: watchParticipationId }],
    () => fetchUserParticipationsDocumentTemplates({ client, participationId: watchParticipationId }),
    {
      enabled: watchParticipationId !== '',
      onSuccess: (data) => {
        if (
          data.length > 0 &&
          (watchDocumentTemplateId === '' || !data.some((template) => template.id === watchDocumentTemplateId))
        ) {
          setValue('documentTemplateId', data[0].id)
        }
      },
    }
  )

  const generateDocumentMutation = useMutation(
    (data: GenerateDocumentMutationData) =>
      client.post('/documents/generate_participation_certificate', data, { responseType: 'blob' }),
    {
      onSuccess: (response) => {
        downloadFromResponse(response)
      },
    }
  )

  const onSubmit = (): void => {
    generateDocumentMutation.mutate({
      participationId: getValues('participationId'),
      documentTemplateId: getValues('documentTemplateId'),
      documentType: getValues('documentType'),
    })
  }

  const generateButtonEnabled =
    userParticipationsQuery.isSuccess &&
    watchParticipationId !== '' &&
    documentTemplatesQuery.isSuccess &&
    watchDocumentTemplateId !== ''

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        {t('pages.userParticipationCertificate.title')}
      </Typography>

      <Divider />

      <Box sx={{ my: 4 }}>
        <Typography>{t('pages.userParticipationCertificate.pageDescription')}</Typography>
      </Box>

      {generateDocumentMutation.isError && (
        <Container maxWidth='sm'>
          <Alert severity='error'>
            <AlertTitle>{t('pages.userParticipationCertificate.errorAlertTitle')}</AlertTitle>
            <Trans i18nKey='pages.userParticipationCertificate.errorAlertDescription'>
              <p>Please try one of the following:</p>
              <ul>
                <li>Select different file type</li>
                <li>Select different document template</li>
              </ul>
              <p>If this issue persists, please contact service support or system administrator</p>
            </Trans>
          </Alert>
        </Container>
      )}

      {generateDocumentMutation.isSuccess && (
        <Container maxWidth='sm'>
          <Alert severity='success'>
            <AlertTitle>{t('pages.userParticipationCertificate.successAlertTitle')}</AlertTitle>
            <p>{t('pages.userParticipationCertificate.successAlertDescription')}</p>
          </Alert>
        </Container>
      )}

      {userParticipationsQuery.isLoading ? (
        <>Loading</>
      ) : userParticipationsQuery.isSuccess ? (
        <>
          {userParticipationsQuery.data.length === 0 ? (
            <p>{t('pages.userParticipationCertificate.noParticipations')}</p>
          ) : (
            <>
              <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='event-select-label'>{t('common.conference')}</InputLabel>
                  <Controller
                    name='participationId'
                    control={control}
                    render={({ field }): JSX.Element => (
                      <Select
                        {...field}
                        onChange={(value): void => {
                          setValue('documentTemplateId', '')
                          setSearchParams({ participationId: value.target.value })
                          field.onChange(value)
                        }}
                        labelId='event-select-label'
                        label={t('common.conference')}
                        fullWidth
                        size='small'
                        required
                      >
                        {userParticipationsQuery.data.map((participation) => (
                          <MenuItem key={participation.id} value={participation.id}>
                            {participation.event.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Container>

              {documentTemplatesQuery.isLoading ? (
                <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                  <Skeleton />
                </Container>
              ) : documentTemplatesQuery.isSuccess && documentTemplatesQuery.data.length === 0 ? (
                <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                  <Alert severity='warning'>
                    {t('pages.userParticipationCertificate.certificateUnavailableForThisConference')}
                  </Alert>
                </Container>
              ) : (
                <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='document-template-select-label'>{t('common.template')}</InputLabel>
                    <Controller
                      name='documentTemplateId'
                      control={control}
                      render={({ field }): JSX.Element => (
                        <Select
                          {...field}
                          labelId='document-template-select-label'
                          label={t('common.template')}
                          fullWidth
                          size='small'
                          required
                          disabled={documentTemplatesQuery.isLoading || documentTemplatesQuery.isIdle}
                        >
                          {documentTemplatesQuery.isSuccess &&
                            documentTemplatesQuery.data.map((documentTemplate) => (
                              <MenuItem key={documentTemplate.id} value={documentTemplate.id}>
                                {documentTemplate.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Container>
              )}

              <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='document-type-select-label'>{t('common.fileType')}</InputLabel>
                  <Controller
                    name='documentType'
                    control={control}
                    render={({ field }): JSX.Element => (
                      <Select
                        {...field}
                        labelId='document-type-select-label'
                        label={t('common.fileType')}
                        fullWidth
                        size='small'
                        required
                      >
                        <MenuItem value='docx'>DOCX</MenuItem>
                        <MenuItem value='pdf'>PDF</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Container>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <LoadingButton
                  variant='contained'
                  startIcon={<Download />}
                  disabled={!generateButtonEnabled}
                  onClick={onSubmit}
                  loading={generateDocumentMutation.isLoading}
                >
                  {t('pages.userParticipationCertificate.submitButtonLabel')}
                </LoadingButton>
              </Box>
            </>
          )}
        </>
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
