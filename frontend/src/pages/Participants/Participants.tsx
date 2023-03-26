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
import { participationSchema, userSchema } from '../../hooks/api/schemas'
import { useApi } from '../../hooks/useApi'
import ParticipationItem from './ParticipationItem'
import { ParticipationWithUser } from './share'

const participationsQueryResponseSchema = z.array(participationSchema.merge(z.object({ user: userSchema })))

export default function Participants(): JSX.Element {
  const { eventId } = useParams()

  return eventId === undefined ? <Navigate to='/events' replace /> : <Page eventId={eventId} />
}

function Page({ eventId }: { eventId: string }): JSX.Element {
  const [allParticipations, setAllParticipations] = useState<readonly ParticipationWithUser[]>([])
  const [pendingParticipations, setPendingParticipations] = useState<readonly ParticipationWithUser[]>([])

  const { client } = useApi()
  const participationsQuery = useQuery(
    [`/events/${eventId}/participations`],
    async () => {
      const response = await client.get(`/events/${eventId}/participations`)

      const parsedData = participationsQueryResponseSchema.parse(response.data)
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
        setPendingParticipations(data.filter((participation) => participation.status === 'pending'))
        setAllParticipations(data)
      },
    }
  )

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          Participants
        </Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back
          </Link>
        </Typography>
      </Box>

      {pendingParticipations.length > 0 && (
        <>
          <Divider />

          <Box sx={{ my: 2 }}>
            <Typography component='h1' variant='h4'>
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
        <Typography component='h1' variant='h4'>
          All requests
        </Typography>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel id='participants-filter-label'>Filter</InputLabel>
          <Select labelId='participants-filter-label' label='Filter' value=''>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='accepted'>Accepted</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='participants-sort-label'>Sort</InputLabel>
          <Select labelId='participants-sort-label' label='Sort' value=''>
            <MenuItem value='firstName'>First Name</MenuItem>
            <MenuItem value='lastName'>Last Name</MenuItem>
            <MenuItem value='email'>Email</MenuItem>
            <MenuItem value='date'>Date</MenuItem>
          </Select>
        </FormControl>

        <Typography></Typography>

        {participationsQuery.isLoading ? (
          <Skeleton />
        ) : participationsQuery.isSuccess ? (
          <Box sx={{ my: 2 }}>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {allParticipations.map((participation) => (
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
