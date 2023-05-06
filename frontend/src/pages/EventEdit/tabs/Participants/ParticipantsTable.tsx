import { Reorder } from '@mui/icons-material'
import { Box, TableCell, TextField, Typography } from '@mui/material'
import { EventParticipation } from '../../../../hooks/api/schemas'
import BaseParticipantsTable from './BaseTable'

export default function ParticipantsTable({
  items,
  onItemUpdate,
}: {
  items: readonly EventParticipation[]
  onItemUpdate?: (participationId: string, time: number) => void
}): JSX.Element {
  return (
    <BaseParticipantsTable
      items={items}
      droppableId='include'
      renderTableHead={(): JSX.Element => (
        <>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Topic</TableCell>
          <TableCell>Time</TableCell>
        </>
      )}
      renderRow={(participation): JSX.Element => (
        <>
          <TableCell sx={{ width: '56px', borderBottomWidth: 0 }}>
            <Reorder sx={{ display: 'block' }} />
          </TableCell>
          <TableCell sx={{ width: '300px' }}>{participation.user.fullName}</TableCell>
          <TableCell sx={{ width: '550px' }}>{participation.submissionTitle}</TableCell>
          <TableCell sx={{ width: '150px', py: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <TextField
                label='Time'
                type='number'
                size='small'
                variant='standard'
                value={participation.time || ''}
                onChange={(event): void => onItemUpdate && onItemUpdate(participation.id, +event.target.value)}
                sx={{ mr: 1 }}
              />
              <Typography>minutes</Typography>
            </Box>
          </TableCell>
        </>
      )}
    />
  )
}
