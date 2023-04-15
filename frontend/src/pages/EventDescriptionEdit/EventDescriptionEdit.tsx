import { Box, Container, Paper, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import LexicalRichTextEditor from '../../components/LexicalRichTextEditor'

export default function EventDescriptionEdit(): JSX.Element {
  const { eventId } = useParams()

  return eventId ? <Page eventId={eventId} /> : <Navigate to='/conferences' replace />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  return (
    <Container maxWidth='lg' sx={{ mt: 8, mb: 8 }}>
      <Typography>
        <Link href={`/events/${eventId}/edit`}>Back to event editing</Link>
      </Typography>

      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Editing &quot;{eventId}&quot; description.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography>This page allows you to edit public appearance of the event.</Typography>
      </Box>

      <Paper>
        <LexicalRichTextEditor />
      </Paper>
    </Container>
  )
}
