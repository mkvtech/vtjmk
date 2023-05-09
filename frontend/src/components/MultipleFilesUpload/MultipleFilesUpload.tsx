import { Add, AttachFile, Download, Remove } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography, styled, useTheme } from '@mui/material'
import { produce } from 'immer'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { useApi } from '../../hooks/useApi'

export interface FileEntry {
  file: File
  name: string
  persisted: boolean
}

export interface MultipleFilesUploadValue {
  readonly newFiles: readonly {
    file: File
    name: string
  }[]
  readonly persistedFiles: readonly {
    id: string
    size: number
    name: string
    downloadUrl: string
    removed: boolean
  }[]
}

const StyledDropzoneBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'focused' && prop !== 'accept' && prop !== 'reject',
})<{ focused?: boolean; accept?: boolean; reject?: boolean }>(({ theme, focused, accept, reject }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(8),
  borderWidth: 2,
  borderRadius: theme.shape.borderRadius,
  borderColor: focused
    ? theme.palette.info.main
    : accept
    ? theme.palette.success.main
    : reject
    ? theme.palette.error.main
    : theme.palette.divider,
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
}))

const MultipleFilesUpload = ({
  value,
  onChange,
}: {
  value?: MultipleFilesUploadValue
  onChange: (value: MultipleFilesUploadValue) => void
}): JSX.Element => {
  const { t } = useTranslation()
  const { apiServerUrl } = useApi()
  const theme = useTheme()
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFileEntries = acceptedFiles.map((newFile) => ({ file: newFile, name: newFile.name }))

      onChange(
        value
          ? produce(value, (draft) => {
              draft.newFiles = [...draft.newFiles, ...newFileEntries]
            })
          : { newFiles: newFileEntries, persistedFiles: [] }
      )
    },
  })

  const removeNewFile = (file: File): void => {
    if (!value) {
      return
    }

    onChange(
      produce(value, (draft) => {
        const index = draft.newFiles.findIndex((fileEntry) => fileEntry.file === file)
        draft.newFiles.splice(index, 1)
      })
    )
  }

  const togglePersistedFile = (id: string): void => {
    if (!value) {
      return
    }

    onChange(
      produce(value, (draft) => {
        const index = draft.persistedFiles.findIndex((file) => file.id === id)
        draft.persistedFiles[index].removed = !draft.persistedFiles[index].removed
      })
    )
  }

  const newFilesCount = value?.newFiles.length
  const removedFilesCount = value?.persistedFiles.filter((file) => file.removed).length
  const filesCount = value ? value.newFiles.length + value.persistedFiles.filter((file) => !file.removed).length : 0

  return (
    <>
      <StyledDropzoneBox {...getRootProps()} focused={isFocused} accept={isDragAccept} reject={isDragReject}>
        <input {...getInputProps()} />
        <Typography>{t('components.multipleFilesUpload.dropFilesIntoThisBoxOrClickToAddFiles')}</Typography>
      </StyledDropzoneBox>

      <Typography sx={{ mt: 1 }}>
        {t('components.multipleFilesUpload.xFilesAttached', { count: filesCount })}
        {newFilesCount ? (
          <Typography color='textSecondary' component='span'>
            , {t('components.multipleFilesUpload.xNewFilesWillBeAttached', { count: newFilesCount })}
          </Typography>
        ) : null}
        {removedFilesCount ? (
          <Typography color='textSecondary' component='span'>
            , {t('components.multipleFilesUpload.xFilesWillBeRemoved', { count: removedFilesCount })}
          </Typography>
        ) : null}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
        {value &&
          value.newFiles.map((file) => (
            <Paper
              key={file.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                backgroundColor: theme.palette.successPaperBackground.main,
                color: theme.palette.success.contrastText,
              }}
            >
              <AttachFile />
              <Typography>
                {file.name} ({file.file.size} bytes)
              </Typography>
              <IconButton onClick={(): void => removeNewFile(file.file)}>
                <Remove htmlColor={theme.palette.success.contrastText} />
              </IconButton>
            </Paper>
          ))}

        {value &&
          value.persistedFiles.map((file) => (
            <Paper
              key={file.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                backgroundColor: file.removed ? theme.palette.error.light : '',
              }}
            >
              <AttachFile />
              <Typography>
                {file.name} ({file.size} bytes)
              </Typography>
              <IconButton href={`${apiServerUrl}${file.downloadUrl}`} sx={{ ml: 1 }}>
                <Download />
              </IconButton>
              <IconButton onClick={(): void => togglePersistedFile(file.id)}>
                {file.removed ? <Add /> : <Remove />}
              </IconButton>
            </Paper>
          ))}
      </Box>
    </>
  )
}

export default MultipleFilesUpload
