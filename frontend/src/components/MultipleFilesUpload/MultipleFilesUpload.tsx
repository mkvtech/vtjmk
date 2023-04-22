import { AttachFile, Download, Remove } from '@mui/icons-material'
import { Box, IconButton, Paper, Typography, styled } from '@mui/material'
import { useDropzone } from 'react-dropzone'

export interface FileEntry {
  file: File
  name: string
  persisted: boolean
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
  value?: readonly FileEntry[]
  onChange: (value: readonly FileEntry[]) => void
}): JSX.Element => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFileEntries = acceptedFiles.map((newFile) => ({ file: newFile, name: newFile.name, persisted: false }))

      onChange(value ? [...value, ...newFileEntries] : newFileEntries)
    },
  })

  const removeFile = (file: File): void => {
    if (!value) {
      return
    }

    const newFiles = [...value]
    const index = newFiles.findIndex((fileEntry) => fileEntry.file === file)
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  return (
    <>
      <StyledDropzoneBox {...getRootProps()} focused={isFocused} accept={isDragAccept} reject={isDragReject}>
        <input {...getInputProps()} />
        <Typography>Drop files into this box or click to add files</Typography>
      </StyledDropzoneBox>

      <Typography sx={{ mt: 1 }}>{value ? value.length : 0} file(s) attached</Typography>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
        {value &&
          value.map((file) => (
            <Paper
              key={file.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: 1,
                pr: 1,
                py: 1,
                backgroundColor: file.persisted ? 'green' : '',
              }}
            >
              <AttachFile />
              <Typography>
                {file.name} ({file.file.size} bytes)
              </Typography>
              <IconButton onClick={(): void => removeFile(file.file)} sx={{ ml: 1 }}>
                <Download />
              </IconButton>
              <IconButton onClick={(): void => removeFile(file.file)}>
                <Remove />
              </IconButton>
            </Paper>
          ))}
      </Box>
    </>
  )
}

export default MultipleFilesUpload
