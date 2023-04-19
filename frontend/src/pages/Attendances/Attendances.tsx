import { ArrowBack, Download, Print } from '@mui/icons-material'
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
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import Link from '../../components/Link'
import { attendanceSchema, userSchema } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import AttendanceItem from './AttendanceItem'
import { AttendanceWithUser } from './types'

const attendancesQueryResponseSchema = z.array(attendanceSchema.merge(z.object({ user: userSchema })))
type AttendancesQueryResponse = readonly AttendanceWithUser[]

export default function Attendances(): JSX.Element {
  const { eventId } = useParams()

  if (eventId === undefined) {
    return <Navigate to='/' replace />
  }

  return <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const [allAttendances, setAllAttendances] = useState<readonly AttendanceWithUser[]>([])
  const [pendingAttendances, setPendingAttendances] = useState<readonly AttendanceWithUser[]>([])

  const { client } = useApi()
  const attendancesQuery = useQuery<AttendancesQueryResponse>(
    ['/events', eventId, '/attendances'],
    async () => {
      const response = await client.get(`/events/${eventId}/attendances`)

      const parsedData = attendancesQueryResponseSchema.parse(response.data)
      parsedData.sort(
        (a, b) =>
          a.createdAt.getTime() - b.createdAt.getTime() ||
          a.user.fullName.localeCompare(b.user.fullName) ||
          a.id.localeCompare(b.id)
      )

      return parsedData
    },
    {
      onSuccess: (data) => {
        setPendingAttendances(data.filter((attendance) => attendance.status === 'pending'))
        setAllAttendances(data)
      },
    }
  )

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography variant='h1'>Attendants</Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back to {eventId}
          </Link>
        </Typography>
      </Box>

      {pendingAttendances.length > 0 && (
        <>
          <Divider />

          <Box sx={{ my: 2 }}>
            <Typography variant='h1'>Pending Requests</Typography>

            <Alert severity='info'>
              These attendants are awaiting answer - please review these requests as soon as possible. Each request must
              be reviewed individually.
            </Alert>

            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {pendingAttendances.map((attendance) => (
                <AttendanceItem key={attendance.id} attendance={attendance} />
              ))}
            </List>
          </Box>
        </>
      )}

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography variant='h1'>All requests</Typography>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel id='attendancies-filter-label'>Filter</InputLabel>
          <Select labelId='attendancies-filter-label' label='Filter' value=''>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='accepted'>Accepted</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='attendancies-sort-label'>Sort</InputLabel>
          <Select labelId='attendancies-sort-label' label='Sort' value=''>
            <MenuItem value='firstName'>First Name</MenuItem>
            <MenuItem value='lastName'>Last Name</MenuItem>
            <MenuItem value='email'>Email</MenuItem>
            <MenuItem value='date'>Date</MenuItem>
          </Select>
        </FormControl>

        <Typography></Typography>

        {attendancesQuery.isLoading ? (
          <Skeleton />
        ) : attendancesQuery.isSuccess ? (
          <Box sx={{ my: 2, mx: 5 }}>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {allAttendances.map((attendance) => (
                <AttendanceItem key={attendance.id} attendance={attendance} />
              ))}
            </List>
          </Box>
        ) : (
          attendancesQuery.status
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
