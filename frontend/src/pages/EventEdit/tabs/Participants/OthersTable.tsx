import { Reorder } from '@mui/icons-material'
import { TableCell } from '@mui/material'
import { EventParticipation } from '../../../../hooks/api/schemas'
import BaseParticipantsTable from './BaseTable'

export function OthersTable({ items }: { items: readonly EventParticipation[] }): JSX.Element {
  return (
    <BaseParticipantsTable
      items={items}
      droppableId='exclude'
      renderTableHead={(): JSX.Element => (
        <>
          <TableCell>&nbsp;</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Topic</TableCell>
        </>
      )}
      renderRow={(participation): JSX.Element => (
        <>
          <TableCell sx={{ width: '56px', borderBottomWidth: 0 }}>
            <Reorder sx={{ display: 'block' }} />
          </TableCell>
          <TableCell sx={{ width: '300px' }}>{participation.user.fullName}</TableCell>
          <TableCell sx={{ width: '550px' }}>{participation.submissionTitle}</TableCell>
        </>
      )}
    />
  )
}
