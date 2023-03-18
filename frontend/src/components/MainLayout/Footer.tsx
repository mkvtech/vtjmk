import { Box, Container, Link, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer(): JSX.Element {
  return (
    <Box sx={{ bgcolor: '#F7FBFF', py: 8, bottom: 0 }}>
      <Container maxWidth='lg'>
        <Stack direction='row' divider={<span>-</span>} justifyContent='center' spacing={2}>
          <span>VilniusTECH JMK</span>
          <Link component={RouterLink} to='/home/contacts'>
            Contacts
          </Link>
          <Link component={RouterLink} to='/home/About'>
            About
          </Link>
          <Link href='https://www.github.com/mkvtech/vtjmk'>GitHub</Link>
          <span>2023</span>
        </Stack>
      </Container>
    </Box>
  )
}
