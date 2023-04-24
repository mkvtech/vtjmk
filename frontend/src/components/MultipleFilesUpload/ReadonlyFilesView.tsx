import { AttachFile, Download } from '@mui/icons-material'
import { Box, IconButton, Paper, SxProps, Theme, Typography } from '@mui/material'
import { useApi } from '../../hooks/useApi'

export interface FileEntry {
  id: string
  name: string
  size: number
  downloadUrl: string
}

export default function ReadonlyFilesView({
  files,
  sx,
}: {
  files: readonly FileEntry[]
  sx?: SxProps<Theme>
}): JSX.Element {
  const { apiServerUrl } = useApi()

  return (
    <Box sx={[{ display: 'flex', gap: 1, flexWrap: 'wrap' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {files.map((fileEntry) => (
        <Paper key={fileEntry.id} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <AttachFile />
          <Typography>
            {fileEntry.name}{' '}
            <Typography component='span' color='textSecondary'>
              ({fileEntry.size} bytes)
            </Typography>
            <IconButton sx={{ ml: 1 }} href={`${apiServerUrl}${fileEntry.downloadUrl}`}>
              <Download />
            </IconButton>
          </Typography>
        </Paper>
      ))}
    </Box>
  )
}
