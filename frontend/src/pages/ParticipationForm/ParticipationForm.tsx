import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import MultipleFilesUpload from '../../components/MultipleFilesUpload'
import { MultipleFilesUploadValue } from '../../components/MultipleFilesUpload/MultipleFilesUpload'
import { participationSchema } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'

export default function ParticipationForm(): JSX.Element {
  const { eventId } = useParams()

  return eventId ? <Page eventId={eventId} /> : <Navigate to='/conferences' replace />
}

interface IFormInput {
  submissionTitle: string
  submissionFiles: MultipleFilesUploadValue
}

interface CreateParticipationMutationData {
  submissionTitle: string
  submissionFiles: File[]
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const navigate = useNavigate()
  const { client } = useApi()
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      submissionTitle: '',
    },
  })
  const createMutation = useMutation((data: CreateParticipationMutationData) => {
    if (!data.submissionFiles) {
      throw new Error('missing files')
    }

    const formData = new FormData()
    formData.append('eventId', eventId)
    formData.append('submissionTitle', data.submissionTitle)

    data.submissionFiles.forEach((file) => {
      // Note: This is a correct way of sending an array of items to Rails server.
      // This key format may be not applicable to other servers.
      // Read:
      // https://iambryanhaney.medium.com/structuring-multipart-formdata-with-rails-naming-conventions-ded7113f7593
      // https://smiz.medium.com/how-does-rails-and-rack-parse-form-variables-4576813d75a6
      formData.append('submissionFiles[]', file)
    })

    return client.post('/participations', formData).then((response) => participationSchema.parse(response.data))
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createMutation.mutate(
      {
        submissionTitle: data.submissionTitle,
        submissionFiles: data.submissionFiles.newFiles.map((entry) => entry.file),
      },
      {
        onSuccess: (data) => {
          navigate(`/participations/${data.id}`)
        },
      }
    )
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant='h1'>Participation Form</Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back to {eventId}
          </Link>
        </Typography>

        <Typography sx={{ my: 1 }}>
          You are registering to participate in {eventId} with presentation. If you want to attend an event without
          presenting, please fill <Link href={`/events/${eventId}/attend`}>attendance form</Link> instead.
        </Typography>
      </Box>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <Typography variant='h2'>Submission</Typography>

          <Typography>This event requires a submission.</Typography>

          <Controller
            name='submissionTitle'
            control={control}
            render={({ field }): JSX.Element => (
              <TextField {...field} label='Title' required fullWidth margin='normal' />
            )}
          />

          <Typography variant='h2'>Files</Typography>

          <Typography>
            You can upload files like paper document (DOCX, PDF), presentation slides (PPTX) or any other relevant
            document
          </Typography>

          <Controller
            name='submissionFiles'
            control={control}
            render={({ field: { value, onChange } }): JSX.Element => (
              <MultipleFilesUpload value={value} onChange={onChange} />
            )}
          />
        </Box>

        <Divider />

        <Box sx={{ my: 2 }}>
          <Typography>After you submit this form, it will be reviewed by event management.</Typography>
          <Box display='flex' flexDirection='row-reverse'>
            <Box>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  )
}
