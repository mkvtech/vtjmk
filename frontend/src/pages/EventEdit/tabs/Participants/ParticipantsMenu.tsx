import { Typography } from '@mui/material'
import { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { reorderItemMap } from '../../../../components/rbd/utils'
import { EventParticipation } from '../../../../hooks/api/schemas'
import ParticipantsTable from './ParticipantsTable'

export default function ParticipantsMenu({
  participations,
}: {
  participations: readonly EventParticipation[]
}): JSX.Element {
  const [items, setItems] = useState<Record<string, readonly EventParticipation[]>>({
    include: participations,
    exclude: [],
  })

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    setItems(reorderItemMap({ itemMap: items, source: result.source, destination: result.destination }))
  }

  return (
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
  )
}
