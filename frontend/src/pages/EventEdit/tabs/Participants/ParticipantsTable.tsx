import { Reorder } from '@mui/icons-material'
import { Box, TableCell, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EventParticipation } from '../../../../hooks/api/schemas'
import BaseParticipantsTable from './BaseTable'

export default function ParticipantsTable({
  items,
  onItemUpdate,
}: {
  items: readonly EventParticipation[]
  onItemUpdate?: (participationId: string, time: number) => void
}): JSX.Element {
  const { t } = useTranslation()
  return (
    <BaseParticipantsTable
      items={items}
      droppableId='include'
      renderTableHead={(): JSX.Element => (
        <>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{t('common.participant')}</TableCell>
          <TableCell>{t('common.topic')}</TableCell>
          <TableCell>{t('common.time')}</TableCell>
        </>
      )}
      renderRow={(participation): JSX.Element => (
        <>
          <TableCell sx={{ width: '56px', borderBottomWidth: 0 }}>
            <Reorder sx={{ display: 'block' }} />
          </TableCell>
          <TableCell sx={{ width: '200px' }}>{participation.user.fullName}</TableCell>
          <TableCell sx={{ width: '650px' }}>{participation.submissionTitle}</TableCell>
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
              <Typography>{t('common.minutes')}</Typography>
            </Box>
          </TableCell>
        </>
      )}
    />
  )
}
