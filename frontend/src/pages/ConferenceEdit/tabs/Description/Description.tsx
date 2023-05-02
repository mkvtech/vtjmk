import { LoadingButton } from '@mui/lab'
import { Alert, Box, Container, Skeleton } from '@mui/material'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import LexicalEditor, { LexicalEditorHandle } from '../../../../components/Lexical/LexicalEditor'
import { useQueryConference } from '../../../../hooks/api/queries'
import { useApi } from '../../../../hooks/useApi'

export default function Description(): JSX.Element {
  const { conferenceId } = useParams() as { conferenceId: string }
  const { client } = useApi()
  const queryClient = useQueryClient()
  const lexicalEditorRef = useRef<LexicalEditorHandle>(null)

  const conferenceQuery = useQueryConference(conferenceId)

  const updateConferenceDescriptionMutation = useMutation((data: { description: string }) =>
    client.patch(`/conferences/${conferenceId}`, data)
  )

  const handleSubmit = (): void => {
    if (!lexicalEditorRef.current) {
      return
    }

    updateConferenceDescriptionMutation.mutate(
      {
        description: JSON.stringify(lexicalEditorRef.current.getEditorState().toJSON()),
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['conferences', conferenceId])
        },
      }
    )
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      {updateConferenceDescriptionMutation.isSuccess && (
        <Alert severity='success' sx={{ my: 2 }}>
          Description was updated successfully
        </Alert>
      )}

      {conferenceQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' height='58px' />
          <Skeleton variant='rounded' height='250px' sx={{ mt: 4 }} />
        </>
      ) : conferenceQuery.isSuccess ? (
        <LexicalEditor
          ref={lexicalEditorRef}
          initialEditorState={conferenceQuery.data.description}
          toolbarEnd={
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pr: 2 }}>
              <LoadingButton
                onClick={handleSubmit}
                loading={updateConferenceDescriptionMutation.isLoading}
                disabled={!conferenceQuery.isSuccess}
              >
                Save
              </LoadingButton>
            </Box>
          }
        />
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
