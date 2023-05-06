import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { reorderItemMap } from '../../../../components/rbd/utils'
import { EventParticipation } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'
import ParticipantsTable from './ParticipantsTable'

export default function ParticipantsMenu({
  participations,
}: {
  participations: readonly EventParticipation[]
}): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { t } = useTranslation()
  const { client } = useApi()

  const [items, setItems] = useState<Record<string, readonly EventParticipation[]>>({
    include: participations
      .filter((participation) => participation.order !== null)
      .sort((a, b) => (a.order || 0) - (b.order || 0)),
    exclude: participations.filter((participation) => participation.order === null),
  })

  const updateParticipantsOrderMutation = useMutation(
    (data: { participationsOrder: Record<string, { order: number }> }) =>
      client.patch(`/events/${eventId}/update_participations_order`, data)
  )

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    setItems(reorderItemMap({ itemMap: items, source: result.source, destination: result.destination }))
  }

  const handleSave = (): void => {
    console.log(items)

    updateParticipantsOrderMutation.mutate({
      participationsOrder: items['include'].reduce<Record<string, { order: number }>>((prev, current, index) => {
        prev[current.id] = { order: index }
        return prev
      }, {}),
    })
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton variant='contained' loading={updateParticipantsOrderMutation.isLoading} onClick={handleSave}>
          {t('common.save')}
        </LoadingButton>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
          Participants
        </Typography>

        <ParticipantsTable droppableId='include' items={items['include']} />

        <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
          Others
        </Typography>

        <ParticipantsTable droppableId='exclude' items={items['exclude']} />
      </DragDropContext>
    </>
  )
}
