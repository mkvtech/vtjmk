import { Box, Button, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Event } from '../../hooks/api/types'

export default function Form({ event }: { event: Event }): JSX.Element {
  return (
    <form>
      <TextField label='Title' type='text' fullWidth required margin='normal' value={event.title} />

      <TextField label='Participants Limit' type='number' fullWidth required margin='normal' />

      <Typography component='h2' variant='h6'>
        Registration
      </Typography>

      <Box display='flex'>
        <DatePicker label='From' />
        <DatePicker sx={{ marginLeft: 2 }} label='To' />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button variant='contained' type='submit'>
          Update
        </Button>
      </Box>
    </form>
  )
}
