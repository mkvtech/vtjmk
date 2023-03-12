import { ArrowBack, Download, Print } from '@mui/icons-material'
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import Link from '../../components/Link'
import Navigation from '../../components/Navigation'

export default function Participants(): JSX.Element {
  const { eventId } = useParams()

  return (
    <>
      <Navigation />

      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          Participants
        </Typography>

        <Typography>
          <Link href={`/events/${eventId}`}>
            <ArrowBack fontSize='small' />
            Back to {eventId}
          </Link>
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          Pending Requests
        </Typography>

        <Typography>
          These participants are awaiting answer - please review these request as soon as possible. Each request must be
          reviewed individually.
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ my: 2 }}>
        <Typography component='h1' variant='h4'>
          All requests
        </Typography>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel id='participants-filter-label'>Filter</InputLabel>
          <Select labelId='participants-filter-label' label='Filter'>
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='accepted'>Accepted</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 150, ml: 2 }}>
          <InputLabel id='participants-sort-label'>Sort</InputLabel>
          <Select labelId='participants-sort-label' label='Sort'>
            <MenuItem value='firstName'>First Name</MenuItem>
            <MenuItem value='lastName'>Last Name</MenuItem>
            <MenuItem value='email'>Email</MenuItem>
            <MenuItem value='date'>Date</MenuItem>
          </Select>
        </FormControl>

        <Typography></Typography>

        <Box sx={{ my: 2, mx: 5 }}>
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
            <ListItem>
              <ListItemText primary='FirstName LastName' secondary='2023-01-01' />
              <Button color='success'>Approve</Button>
              <Button color='error'>Deny</Button>
            </ListItem>
          </List>
        </Box>

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
    </>
  )
}
