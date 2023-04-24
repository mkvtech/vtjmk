import { Typography, styled } from '@mui/material'

export default styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  textAlign: 'center',
}))
