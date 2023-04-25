import { Box, Button, TextField, Typography } from '@mui/material'

export default function Reviewers(): JSX.Element {
  return (
    <>
      <Typography variant='h2'>Add a Reviewer</Typography>

      <Box sx={{ display: 'flex' }}>
        <TextField sx={{ flexGrow: 1 }} fullWidth />

        <Button>Add</Button>
      </Box>

      <Typography>List...</Typography>
    </>
  )
}
