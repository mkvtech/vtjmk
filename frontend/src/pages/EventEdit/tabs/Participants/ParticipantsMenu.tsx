import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { produce } from 'immer'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import { reorderItemMap } from '../../../../components/rbd/utils'
import { EventParticipation } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'
import { OthersTable } from './OthersTable'
import ParticipantsTable from './ParticipantsTable'

type UpdateParticipationsOrderMutationInput = Record<string, { order: number; time: number | null }>

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
    (data: { participationsOrder: UpdateParticipationsOrderMutationInput }) =>
      client.patch(`/events/${eventId}/update_participations_order`, data)
  )

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    const { source, destination } = result

    setItems(
      reorderItemMap({
        itemMap: items,
        source,
        destination,
        transformItem: (item) => {
          if (source.droppableId === 'exclude' && destination.droppableId === 'include') {
            // Moving an item from 'exclude' list to 'include' list

            return { ...item, time: 15 }
          }

          return item
        },
      })
    )
  }

  const handleSave = (): void => {
    updateParticipantsOrderMutation.mutate({
      participationsOrder: items['include'].reduce<UpdateParticipationsOrderMutationInput>((prev, current, index) => {
        prev[current.id] = { order: index, time: current.time }
        return prev
      }, {}),
    })
  }

  // TODO: This function (and some related) produces a noticeable lag as it causes all components to re-render.
  // Perhaps the whole situation could be improved with `useReducer()` hook?
  const handleTimeUpdate = (participationId: string, time: number): void => {
    setItems(
      produce(items, (draft) => {
        const index = draft['include'].findIndex((participation) => participation.id === participationId)

        if (index === -1) {
          return
        }

        draft['include'][index].time = time
      })
    )
  }

  const totalTime = items['include'].reduce((prev, current) => prev + (current.time || 0), 0)

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

        <ParticipantsTable items={items['include']} onItemUpdate={handleTimeUpdate} />

        <Typography sx={{ my: 2 }} align='right'>
          Total time: {totalTime} minutes
        </Typography>

        <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
          Others
        </Typography>

        <OthersTable items={items['exclude']} />
      </DragDropContext>
    </>
  )
}
