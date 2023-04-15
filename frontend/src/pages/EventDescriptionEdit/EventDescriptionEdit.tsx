import { Box, Container, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import LexicalRichTextEditor from '../../components/LexicalRichTextEditor'
import { LoadingButton } from '@mui/lab'
import { useRef } from 'react'
import { LexicalRichTextEditorHandle } from '../../components/LexicalRichTextEditor/LexicalRichTextEditor'

export default function EventDescriptionEdit(): JSX.Element {
  const { eventId } = useParams()

  return eventId ? <Page eventId={eventId} /> : <Navigate to='/conferences' replace />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const lexicalEditorRef = useRef<LexicalRichTextEditorHandle>(null)

  const handleSubmit = (): void => {
    if (!lexicalEditorRef.current) {
      return
    }

    console.log(lexicalEditorRef.current.getEditorState().toJSON())
  }

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

      <LexicalRichTextEditor ref={lexicalEditorRef} />

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }}>
        <LoadingButton variant='contained' onClick={handleSubmit}>
          Submit
        </LoadingButton>
      </Box>
    </Container>
  )
}
