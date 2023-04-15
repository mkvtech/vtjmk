import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import { useApi } from '../../hooks/useApi'

export default function DocumentTemplateCreate(): JSX.Element {
  const { conferenceId } = useParams()

  return conferenceId === undefined ? <Navigate to='/conferences' replace /> : <Page conferenceId={conferenceId} />
}

interface FormValues {
  name: string
  docx?: FileList
  documentType: 'participationCertificate' | 'eventCard'
  placeholderPrefix: string
  placeholderPostfix: string
}

function Page({ conferenceId }: { conferenceId: string }): JSX.Element {
  const navigate = useNavigate()

  const { client } = useApi()
  const { control, handleSubmit, register, watch } = useForm<FormValues>({
    defaultValues: {
      name: '',
      documentType: 'participationCertificate',
      placeholderPrefix: '',
      placeholderPostfix: '',
    },
  })

  const watchPlaceholderPrefix = watch('placeholderPrefix')
  const watchPlaceholderPostfix = watch('placeholderPostfix')
  const watchDocx = watch('docx')

  const createDocumentTemplateMutation = useMutation((data: FormValues) => {
    if (!data.docx) {
      throw new Error('Illegal state')
    }

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('docx', data.docx[0])
    formData.append('documentType', data.documentType)
    formData.append('placeholderPrefix', data.placeholderPrefix)
    formData.append('placeholderPostfix', data.placeholderPostfix)
    formData.append('conferenceId', conferenceId)

    return client.post('/document_templates', formData)
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createDocumentTemplateMutation.mutate(data, {
      onSuccess: (_response) => {
        navigate(`/conferences/${conferenceId}/documentTemplates`)
      },
    })
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Typography>
        <Link href={`/conferences/${conferenceId}`}>Back to conference page</Link>
      </Typography>

      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Create new Document Template
      </Typography>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth='md' sx={{ mb: 4 }}>
          <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
            General
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }): JSX.Element => (
                  <TextField {...field} label='Name' type='text' fullWidth required size='small' />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth size='small'>
                <InputLabel id='document-type-label'>Type</InputLabel>
                <Controller
                  name='documentType'
                  control={control}
                  render={({ field }): JSX.Element => (
                    <Select {...field} labelId='document-type-label' label='Type' fullWidth size='small' required>
                      <MenuItem value='participationCertificate'>Participation Certificate</MenuItem>
                      <MenuItem value='eventCard'>Event Card</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
            Placeholder format
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2 }}>
            <Controller
              name='placeholderPrefix'
              control={control}
              render={({ field }): JSX.Element => (
                <TextField {...field} sx={{ width: '100px' }} label='Prefix' type='text' size='small' />
              )}
            />

            <Typography>PLACEHOLDER</Typography>

            <Controller
              name='placeholderPostfix'
              control={control}
              render={({ field }): JSX.Element => (
                <TextField {...field} sx={{ width: '100px' }} label='Postfix' type='text' size='small' />
              )}
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={6}>
              <Typography variant='h6'>Example Template</Typography>
              <Typography sx={{ mt: 1 }}>
                Document generated at {watchPlaceholderPrefix}DATE{watchPlaceholderPostfix} for {watchPlaceholderPrefix}
                USER_FULLNAME{watchPlaceholderPostfix}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='h6'>Example Generated Document</Typography>
              <Typography sx={{ mt: 1 }}>Document generated at 2023-04-04 for John Doe</Typography>
            </Grid>
          </Grid>

          <Typography component='h2' variant='h6' sx={{ mt: 4 }}>
            File
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Button variant='contained' component='label'>
              Upload
              <input {...register('docx')} hidden type='file' />
            </Button>

            <Box sx={{ ml: 2 }}>
              <Typography>{watchDocx && watchDocx.length > 0 && watchDocx[0].name}</Typography>
            </Box>
          </Box>
        </Container>

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', my: 4 }}>
          <LoadingButton variant='contained' type='submit' loading={createDocumentTemplateMutation.isLoading}>
            Create
          </LoadingButton>
        </Box>
      </form>
    </Container>
  )
}
