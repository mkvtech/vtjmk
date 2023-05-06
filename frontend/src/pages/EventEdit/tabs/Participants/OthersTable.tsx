import { Reorder } from '@mui/icons-material'
import { TableCell } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EventParticipation } from '../../../../hooks/api/schemas'
import BaseParticipantsTable from './BaseTable'

export function OthersTable({ items }: { items: readonly EventParticipation[] }): JSX.Element {
  const { t } = useTranslation()
  return (
    <BaseParticipantsTable
      items={items}
      droppableId='exclude'
      renderTableHead={(): JSX.Element => (
        <>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{t('common.participant')}</TableCell>
          <TableCell>{t('common.topic')}</TableCell>
        </>
      )}
      renderRow={(participation): JSX.Element => (
        <>
          <TableCell sx={{ width: '56px', borderBottomWidth: 0 }}>
            <Reorder sx={{ display: 'block' }} />
          </TableCell>
          <TableCell sx={{ width: '200px' }}>{participation.user.fullName}</TableCell>
          <TableCell sx={{ width: '650px' }}>{participation.submissionTitle}</TableCell>
        </>
      )}
    />
  )
}
