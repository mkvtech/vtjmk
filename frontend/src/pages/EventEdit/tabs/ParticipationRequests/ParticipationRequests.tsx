import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError/PageError'
import NoDataText from '../../../../components/Typography/NoDataText'
import { fetchEventsParticipations } from '../../../../hooks/api/queries'
import { useApi } from '../../../../hooks/useApi'
import ParticipationRequestsListItem from './ParticipationRequestsListItem'

type SortOrder = 'createdAt' | 'status' | 'users.fullName'
type StatusFilterInput = 'all' | 'pending' | 'approved' | 'rejected'

export default function Participants(): JSX.Element {
  const { t } = useTranslation()
  const { eventId } = useParams() as { eventId: string }
  const { client } = useApi()

  const [order, setOrder] = useState<SortOrder>('createdAt')
  const [statusFilter, setStatusFilter] = useState<StatusFilterInput>('all')

  const queryParams = { order, status: statusFilter === 'all' ? undefined : statusFilter }

  const participationsQuery = useQuery(
    ['events', eventId, 'participations', queryParams],
    () => fetchEventsParticipations({ client, params: { eventId, ...queryParams } }),
    {}
  )

  const handleOrderSelectChange = (event: SelectChangeEvent): void => {
    const { value } = event.target

    if (value !== 'createdAt' && value !== 'users.fullName' && value !== 'status') {
      return
    }

    setOrder(value)
  }

  const handleFilterSelectChange = (event: SelectChangeEvent): void => {
    const { value } = event.target

    if (value !== 'all' && value !== 'pending' && value !== 'approved' && value !== 'rejected') {
      return
    }

    setStatusFilter(value)
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel id='participants-filter-label'>{t('common.status')}</InputLabel>
          <Select
            labelId='participants-filter-label'
            label={t('common.status')}
            value={statusFilter}
            onChange={handleFilterSelectChange}
          >
            <MenuItem value='all'>{t('common.all')}</MenuItem>
            <MenuItem value='approved'>{t('common.approved')}</MenuItem>
            <MenuItem value='rejected'>{t('common.rejected')}</MenuItem>
            <MenuItem value='pending'>{t('common.pending')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='participants-sort-label'>{t('common.sort')}</InputLabel>
          <Select
            labelId='participants-sort-label'
            label={t('common.sort')}
            value={order}
            onChange={handleOrderSelectChange}
          >
            <MenuItem value='createdAt'>{t('common.date')}</MenuItem>
            <MenuItem value='users.fullName'>{t('common.fullName')}</MenuItem>
            <MenuItem value='status'>{t('common.status')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {participationsQuery.isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : participationsQuery.isSuccess && participationsQuery.data.length > 0 ? (
        <>
          {participationsQuery.data.map((participation) => (
            <ParticipationRequestsListItem key={participation.id} participation={participation} />
          ))}
        </>
      ) : participationsQuery.isSuccess ? (
        <>
          <NoDataText>{t('common.noData')}</NoDataText>
        </>
      ) : (
        <PageError error={participationsQuery.error} />
      )}
    </Container>
  )
}
