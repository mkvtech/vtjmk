import { LoadingButton } from '@mui/lab'
import { Alert, Box, Container, Skeleton } from '@mui/material'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import LexicalEditor, { LexicalEditorHandle } from '../../../components/Lexical/LexicalEditor'
import PageError from '../../../components/PageError/PageError'
import { useQueryEvent } from '../../../hooks/api/queries'
import { useApi } from '../../../hooks/useApi'

export default function Description(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { t } = useTranslation()
  const { client } = useApi()
  const queryClient = useQueryClient()
  const lexicalEditorRef = useRef<LexicalEditorHandle>(null)

  const eventQuery = useQueryEvent(eventId)

  const updateEventDescriptionMutation = useMutation((data: { description: string }) =>
    client.patch(`/events/${eventId}`, data)
  )

  const handleSubmit = (): void => {
    if (!lexicalEditorRef.current) {
      return
    }

    updateEventDescriptionMutation.mutate(
      {
        description: JSON.stringify(lexicalEditorRef.current.getEditorState().toJSON()),
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['events', eventId])
        },
      }
    )
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      {updateEventDescriptionMutation.isSuccess && (
        <Alert severity='success' sx={{ my: 2 }}>
          {t('pages.eventEdit.descriptionTab.descriptionWasUpdatedSuccessfully')}
        </Alert>
      )}

      {eventQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' height='58px' />
          <Skeleton variant='rounded' height='250px' sx={{ mt: 4 }} />
        </>
      ) : eventQuery.isSuccess ? (
        <LexicalEditor
          ref={lexicalEditorRef}
          initialEditorState={eventQuery.data.description}
          toolbarEnd={
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pr: 2 }}>
              <LoadingButton
                onClick={handleSubmit}
                loading={updateEventDescriptionMutation.isLoading}
                disabled={!eventQuery.isSuccess}
              >
                {t('common.save')}
              </LoadingButton>
            </Box>
          }
        />
      ) : (
        <PageError error={eventQuery.error} />
      )}
    </Container>
  )
}
