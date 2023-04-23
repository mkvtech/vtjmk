import { Box, Button, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import MultipleFilesUpload, { MultipleFilesUploadValue } from '../../components/MultipleFilesUpload/MultipleFilesUpload'
import { useApi } from '../../hooks/useApi'

interface InitialFormData {
  submissionTitle?: string | undefined | null
  submissionDescription?: string | undefined | null
  submissionFiles: {
    id: string
    size: number
    name: string
    downloadUrl: string
  }[]
}

interface FormInput {
  submissionTitle: string
  submissionDescription: string
  submissionFiles: MultipleFilesUploadValue
}

interface MutationData {
  submissionTitle: string
  submissionDescription: string
  submissionFilesNew: readonly {
    file: File
    name: string
  }[]
  submissionFilesPersisted: readonly {
    id: string
    name: string
    remove: boolean
  }[]
}

export default function GeneralForm({
  initialData,
  onDone,
}: {
  initialData: InitialFormData
  onDone: () => void
}): JSX.Element {
  const { participationId } = useParams() as { participationId: string }
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { control, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      submissionTitle: initialData.submissionTitle || '',
      submissionDescription: initialData.submissionDescription || '',
      submissionFiles: {
        newFiles: [],
        persistedFiles: initialData.submissionFiles.map((file) => ({ ...file, removed: false })),
      },
    },
  })

  const updateMutation = useMutation((data: MutationData) => {
    const formData = new FormData()

    formData.append('submissionTitle', data.submissionTitle)
    formData.append('submissionDescription', data.submissionDescription)

    data.submissionFilesNew.forEach((file) => {
      formData.append('submissionFilesNew[][file]', file.file)
      formData.append('submissionFilesNew[][name]', file.name)
    })

    data.submissionFilesPersisted.forEach((file) => {
      formData.append('submissionFilesPersisted[][id]', file.id)
      formData.append('submissionFilesPersisted[][name]', file.name)
      file.remove && formData.append('submissionFilesPersisted[][remove]', 'true')
    })

    return client.patch(`/participations/${participationId}`, formData)
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)

    updateMutation.mutate(
      {
        ...data,
        submissionFilesNew: data.submissionFiles.newFiles,
        submissionFilesPersisted: data.submissionFiles.persistedFiles.map(({ id, name, removed }) => ({
          id,
          name,
          remove: removed,
        })),
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['participations', participationId])
        },
        onSuccess: () => {
          onDone()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='submissionTitle'
        control={control}
        render={({ field }): JSX.Element => (
          <TextField {...field} label='Submission Title' type='text' fullWidth required size='small' sx={{ mt: 2 }} />
        )}
      />

      <Controller
        name='submissionDescription'
        control={control}
        render={({ field }): JSX.Element => (
          <TextField
            {...field}
            label='Submission Description'
            type='text'
            fullWidth
            required
            multiline
            sx={{ mt: 2 }}
          />
        )}
      />

      <Typography variant='h2' sx={{ my: 4 }}>
        Attachments
      </Typography>

      <Controller
        name='submissionFiles'
        control={control}
        render={({ field: { value, onChange } }): JSX.Element => (
          <MultipleFilesUpload value={value} onChange={onChange} />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Button onClick={(): void => onDone()}>Cancel</Button>
        <Button variant='contained' type='submit' sx={{ ml: 2 }}>
          Update
        </Button>
      </Box>
    </form>
  )
}
