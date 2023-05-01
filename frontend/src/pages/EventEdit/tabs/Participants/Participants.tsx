import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import PageError from '../../../../components/PageError/PageError'
import NoDataText from '../../../../components/Typography/NoDataText'
import { fetchEventsParticipations } from '../../../../hooks/api/queries'
import { useApi } from '../../../../hooks/useApi'
import ParticipantsListItem from './ParticipantsListItem'

type SortOrder = 'createdAt' | 'status' | 'users.fullName'
type StatusFilterInput = 'all' | 'pending' | 'approved' | 'rejected'

export default function Participants(): JSX.Element {
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
          <InputLabel id='participants-filter-label'>Status</InputLabel>
          <Select
            labelId='participants-filter-label'
            label='Filter'
            value={statusFilter}
            onChange={handleFilterSelectChange}
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='approved'>Approved</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='participants-sort-label'>Sort</InputLabel>
          <Select labelId='participants-sort-label' label='Sort' value={order} onChange={handleOrderSelectChange}>
            <MenuItem value='createdAt'>Date</MenuItem>
            <MenuItem value='users.fullName'>Full Name</MenuItem>
            <MenuItem value='status'>Status</MenuItem>
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
            <ParticipantsListItem key={participation.id} participation={participation} />
          ))}
        </>
      ) : participationsQuery.isSuccess ? (
        <>
          <NoDataText>No Data</NoDataText>
        </>
      ) : (
        <PageError error={participationsQuery.error} />
      )}
    </Container>
  )
}
