import { LoadingButton } from '@mui/lab'
import { Box, Container, Skeleton } from '@mui/material'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import LexicalEditor, { LexicalEditorHandle } from '../../../components/Lexical/LexicalEditor'
import { useQueryEvent } from '../../../hooks/api/queries'
import { useApi } from '../../../hooks/useApi'

export default function Description(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { client } = useApi()
  const lexicalEditorRef = useRef<LexicalEditorHandle>(null)

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
      {eventQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' height='58px' />
          <Skeleton variant='rounded' height='250px' sx={{ mt: 4 }} />
        </>
      ) : eventQuery.isSuccess ? (
        <LexicalEditor ref={lexicalEditorRef} initialEditorState={eventQuery.data.description} />
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
