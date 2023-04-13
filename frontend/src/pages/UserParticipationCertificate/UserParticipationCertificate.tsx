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
import { useMutation, useQuery } from 'react-query'
import { fetchUserParticipations, fetchUserParticipationsDocumentTemplates } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'

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
  const { control, watch, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      participationId: '',
      documentTemplateId: '',
      documentType: 'docx',
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
      client
        .post('/documents/generate_participation_certificate', data, { responseType: 'blob' })
        .then((response) => response.data),
    {
      onSuccess: (data) => {
        // Note: This is a 'hacky' solution for downloading files using AJAX but it seems to be popular:
        // https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
        // https://medium.com/yellowcode/download-api-files-with-react-fetch-393e4dae0d9e

        const href = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'file.docx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(href)

        // A better solution would be to create a resource on the server, get URL to file from the response, then make
        // user download the file using traditional link (or click the link automatically)

        // Pros:
        // - not hacky, not manipulating the dom unnecessarily
        // - browser's JS runtime does not hold file data in memory
        // - `generate` endpoint can return JSON object, errors or metadata
        // Cons:
        // - server has to create a DB record
        // - server has to cleanup generated files after they were downloaded (or every X minutes)
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
      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Generate Participation Certificate
      </Typography>

      <Divider />

      <Box sx={{ my: 4 }}>
        <Typography>This tool allows you to generate participation certificate in DOCX or PDF format.</Typography>
      </Box>

      {generateDocumentMutation.isError && (
        <Container maxWidth='sm'>
          <Alert severity='error'>
            <AlertTitle>Document generation failed</AlertTitle>
            <p>Please try one of the following:</p>
            <ul>
              <li>Select different file type</li>
              <li>Select different document template</li>
            </ul>
            <p>If this issue persists, please contact service support or system administrator</p>
          </Alert>
        </Container>
      )}

      {generateDocumentMutation.isSuccess && (
        <Container maxWidth='sm'>
          <Alert severity='success'>
            <AlertTitle>Document was generated successfuly</AlertTitle>
            <p>
              The download will begin shortly. Once it is done, please find generated document in Downloads folder on
              your computer.
            </p>
          </Alert>
        </Container>
      )}

      {userParticipationsQuery.isLoading ? (
        <>Loading</>
      ) : userParticipationsQuery.isSuccess ? (
        <>
          {userParticipationsQuery.data.length === 0 ? (
            <>This tool is only available when you have at least one approved participation</>
          ) : (
            <>
              <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='event-select-label'>Conference</InputLabel>
                  <Controller
                    name='participationId'
                    control={control}
                    render={({ field }): JSX.Element => (
                      <Select
                        {...field}
                        onChange={(value): void => {
                          setValue('documentTemplateId', '')
                          field.onChange(value)
                        }}
                        labelId='event-select-label'
                        label='Conference'
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
                  <Alert severity='warning'>Participation Certificate is not available for this conference</Alert>
                </Container>
              ) : (
                <Container maxWidth='sm' sx={{ mt: 4, mb: 4 }}>
                  <FormControl fullWidth size='small'>
                    <InputLabel id='document-template-select-label'>Template</InputLabel>
                    <Controller
                      name='documentTemplateId'
                      control={control}
                      render={({ field }): JSX.Element => (
                        <Select
                          {...field}
                          labelId='document-template-select-label'
                          label='Template'
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
                  <InputLabel id='document-type-select-label'>File Type</InputLabel>
                  <Controller
                    name='documentType'
                    control={control}
                    render={({ field }): JSX.Element => (
                      <Select
                        {...field}
                        labelId='document-type-select-label'
                        label='File Type'
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
                  Generate
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
