import { Box, Container, Skeleton, Typography } from '@mui/material'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import LexicalRichTextEditor from '../../components/LexicalRichTextEditor'
import { LoadingButton } from '@mui/lab'
import { useRef } from 'react'
import { LexicalRichTextEditorHandle } from '../../components/LexicalRichTextEditor/LexicalRichTextEditor'
import { useMutation } from 'react-query'
import { useApi } from '../../hooks/useApi'
import { useQueryEvent } from '../../hooks/api/queries'

export default function EventDescriptionEdit(): JSX.Element {
  const { eventId } = useParams()

  return eventId ? <Page eventId={eventId} /> : <Navigate to='/conferences' replace />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const { client } = useApi()
  const lexicalEditorRef = useRef<LexicalRichTextEditorHandle>(null)

  const eventQuery = useQueryEvent(eventId)

  const updateEventDescriptionMutation = useMutation((data: { description: string }) =>
    client.patch(`/events/${eventId}`, data)
  )

  const handleSubmit = (): void => {
    if (!lexicalEditorRef.current) {
      return
    }

    updateEventDescriptionMutation.mutate({
      description: JSON.stringify(lexicalEditorRef.current.getEditorState().toJSON()),
    })
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 8, mb: 8 }}>
      <Typography>
        <Link href={`/events/${eventId}/edit`}>Back to event editing</Link>
      </Typography>

      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
        Editing &quot;
        {eventQuery.isSuccess ? eventQuery.data.title : <Skeleton sx={{ display: 'inline-block', width: '40%' }} />}
        &quot; description.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography>This page allows you to edit public appearance of the event.</Typography>
      </Box>

      {eventQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' height='58px' />
          <Skeleton variant='rounded' height='250px' sx={{ mt: 4 }} />
        </>
      ) : eventQuery.isSuccess ? (
        <LexicalRichTextEditor ref={lexicalEditorRef} initialEditorState={eventQuery.data.description} />
      ) : (
        <>Error</>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }}>
        <LoadingButton
          variant='contained'
          onClick={handleSubmit}
          loading={updateEventDescriptionMutation.isLoading}
          disabled={!eventQuery.isSuccess}
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  )
}
