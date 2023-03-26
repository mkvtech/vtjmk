import { Download, Print } from '@mui/icons-material'
import {
  Alert,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import Link from '../../components/Link'
import { fetchEventsParticipations, useQueryEvent } from '../../hooks/api/queries'
import { ParticipationStatus } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import ParticipationItem from './ParticipationItem'
import { ParticipationWithUser } from './share'

type SortOrder = 'date' | 'status' | 'fullName'
const statusToOrder = (status: ParticipationStatus): number =>
  status === 'pending' ? 0 : status === 'approved' ? 1 : 2

function sortParticipations(
  participations: ParticipationWithUser[],
  order: SortOrder
): readonly ParticipationWithUser[] {
  return participations.sort(
    order === 'date'
      ? (a, b): number =>
          b.createdAt.getTime() - a.createdAt.getTime() ||
          a.user.fullName.localeCompare(b.user.fullName) ||
          a.id.localeCompare(b.id)
      : order === 'fullName'
      ? (a, b): number =>
          a.user.fullName.localeCompare(b.user.fullName) ||
          b.createdAt.getTime() - a.createdAt.getTime() ||
          a.id.localeCompare(b.id)
      : (a, b): number =>
          statusToOrder(a.status) - statusToOrder(b.status) ||
          b.createdAt.getTime() - a.createdAt.getTime() ||
          a.user.fullName.localeCompare(b.user.fullName) ||
          a.id.localeCompare(b.id)
  )
}

type FilterInput = 'all' | 'pending' | 'approved' | 'rejected'
function filterParticipations(
  participations: readonly ParticipationWithUser[],
  filter: FilterInput
): readonly ParticipationWithUser[] {
  if (filter === 'all') {
    return participations
  }

  return participations.filter((participation) => participation.status === filter)
}

export default function Participants(): JSX.Element {
  const { eventId } = useParams()

  return eventId === undefined ? <Navigate to='/events' replace /> : <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const [allParticipations, setAllParticipations] = useState<readonly ParticipationWithUser[]>([])
  const [renderedParticipations, setRenderedParticipations] = useState<readonly ParticipationWithUser[]>([])
  const [pendingParticipations, setPendingParticipations] = useState<readonly ParticipationWithUser[]>([])

  const updateParticipations = (
    participations: readonly ParticipationWithUser[],
    order: SortOrder,
    filter: FilterInput
  ): void => {
    const sorted = sortParticipations(participations.concat(), order)
    setAllParticipations(sorted)
    setRenderedParticipations(filterParticipations(sorted, filter))
  }

  const [order, setOrder] = useState<SortOrder>('date')
  const [filter, setFilter] = useState<FilterInput>('all')

  const { client } = useApi()
  const participationsQuery = useQuery(
    ['events', eventId, 'participations'],
    () => fetchEventsParticipations({ client, eventId }),
    {
      onSuccess: (data) => {
        setPendingParticipations(data.filter((participation) => participation.status === 'pending'))
        updateParticipations(data, order, filter)
      },
    }
  )
  const eventQuery = useQueryEvent(eventId)

  const handleOrderSelectChange = (event: SelectChangeEvent): void => {
    const { value } = event.target

    if (value !== 'date' && value !== 'fullName' && value !== 'status') {
      return
    }

    setOrder(value)
    updateParticipations(allParticipations, value, filter)
  }

  const handleFilterSelectChange = (event: SelectChangeEvent): void => {
    const { value } = event.target

    if (value !== 'all' && value !== 'pending' && value !== 'approved' && value !== 'rejected') {
      return
    }

    setFilter(value)
    updateParticipations(allParticipations, order, value)
  }

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography>
          <Link href={`/events/${eventId}`}>{eventQuery.isSuccess ? eventQuery.data.title : 'Back'}</Link>
        </Typography>

        <Typography component='h1' variant='h4'>
          Participants
        </Typography>
      </Box>

      {pendingParticipations.length > 0 && (
        <>
          <Divider />

          <Box sx={{ my: 2 }}>
            <Typography component='h2' variant='h5'>
              Pending Requests
            </Typography>

            <Alert severity='info'>
              These attendants are awaiting answer - please review these requests as soon as possible. Each request must
              be reviewed individually.
            </Alert>

            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {pendingParticipations.map((participation) => (
                <ParticipationItem key={participation.id} participation={participation} />
              ))}
            </List>
          </Box>
        </>
      )}

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h2' variant='h5'>
          All requests
        </Typography>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel id='participants-filter-label'>Filter</InputLabel>
          <Select labelId='participants-filter-label' label='Filter' value={filter} onChange={handleFilterSelectChange}>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='approved'>Approved</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='participants-sort-label'>Sort</InputLabel>
          <Select labelId='participants-sort-label' label='Sort' value={order} onChange={handleOrderSelectChange}>
            <MenuItem value='date'>Date</MenuItem>
            <MenuItem value='fullName'>Full Name</MenuItem>
            <MenuItem value='status'>Status</MenuItem>
          </Select>
        </FormControl>

        <Typography></Typography>

        {participationsQuery.isLoading ? (
          <Skeleton />
        ) : participationsQuery.isSuccess ? (
          <Box sx={{ my: 2 }}>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {renderedParticipations.map((participation) => (
                <ParticipationItem key={participation.id} participation={participation} />
              ))}
            </List>
          </Box>
        ) : (
          participationsQuery.status
        )}

        <Box display='flex' flexDirection='row-reverse'>
          <Box>
            <Button variant='outlined' sx={{ mr: 2 }} startIcon={<Download />}>
              Download
            </Button>
            <Button variant='contained' startIcon={<Print />}>
              Print
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
