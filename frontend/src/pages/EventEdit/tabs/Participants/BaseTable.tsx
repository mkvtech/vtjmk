import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import { Draggable, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../../../../components/rbd/StrictModeDroppable'
import { EventParticipation } from '../../../../hooks/api/schemas'

const Row = styled(TableRow, { shouldForwardProp: (prop) => prop !== 'isDragging' })<{ isDragging?: boolean }>(
  ({ isDragging }) =>
    isDragging
      ? { 'td, th': { border: 0 } }
      : {
          '&:last-child td, &:last-child th': { border: 0 },
        }
)

// TODO: Make this component more responsive to display size changes
// 1. Fix hard-coded width by https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/patterns/tables.md#strategy-2-dimension-locking
// 2. Fix hard-coded height

export default function BaseParticipantsTable({
  items,
  droppableId,
  renderTableHead,
  renderRow,
}: {
  items: readonly EventParticipation[]
  droppableId: string
  renderTableHead: () => JSX.Element
  renderRow: (participation: EventParticipation) => JSX.Element
}): JSX.Element {
  return (
    <TableContainer sx={{ minHeight: '300px', width: '1056px' }} component={Paper} variant='outlined'>
      <Table sx={{}}>
        <TableHead>
          <TableRow>{renderTableHead()}</TableRow>
        </TableHead>

        <StrictModeDroppable droppableId={droppableId} direction='vertical'>
          {(droppableProvided: DroppableProvided): JSX.Element => (
            <TableBody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              sx={{ height: items.length === 0 ? '243px' : undefined }}
            >
              {items.map((participation: EventParticipation, index: number) => (
                <Draggable key={participation.id} draggableId={participation.id} index={index}>
                  {(draggableProvided: DraggableProvided, snapshot: DraggableStateSnapshot): JSX.Element => (
                    <Row
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      sx={{}}
                    >
                      {renderRow(participation)}
                    </Row>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </TableBody>
          )}
        </StrictModeDroppable>
      </Table>
    </TableContainer>
  )
}
