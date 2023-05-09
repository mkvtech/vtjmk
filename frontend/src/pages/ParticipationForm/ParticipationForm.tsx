import { ArrowBack } from '@mui/icons-material'
import { Box, Button, Container, Divider, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  submissionFiles?: MultipleFilesUploadValue
}

interface CreateParticipationMutationData {
  submissionTitle: string
  submissionFiles: File[]
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { client } = useApi()
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      submissionTitle: '',
      submissionFiles: undefined,
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
        submissionFiles: data.submissionFiles?.newFiles.map((entry) => entry.file) || [],
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
        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            {t('common.backToEventPage')}
          </Link>
        </Typography>

        <Typography variant='h1'>{t('pages.participationForm.title')}</Typography>
      </Box>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('pages.participationForm.submission')}
          </Typography>

          <Controller
            name='submissionTitle'
            control={control}
            render={({ field }): JSX.Element => (
              <TextField {...field} label={t('common.title')} required fullWidth margin='normal' />
            )}
          />

          <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
            {t('common.files')}
          </Typography>

          <Typography sx={{ my: 2 }}>{t('pages.participationForm.youCanUploadFilesLike')}</Typography>

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
          <Typography>{t('pages.participationForm.afterYouSubmitThisForm')}</Typography>

          <Box display='flex' flexDirection='row-reverse'>
            <Box>
              <Button type='submit' variant='contained'>
                {t('common.submit')}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  )
}
