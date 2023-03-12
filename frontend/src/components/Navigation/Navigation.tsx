import { Box, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

export default function Navigation(): JSX.Element {
  const { logout, session } = useApi()

  const handleLogout = (): void => {
    logout()
  }

  return (
    <Box display='flex' justifyContent='space-between'>
      <Box>
        <Link component={RouterLink} to='/'>
          Home
        </Link>

        {/* TODO: Drop down on hover with conference list */}
        <Link component={RouterLink} to='/conferences'>
          Conferences
        </Link>
      </Box>
      <Box>
        {session ? (
          <>
            <Link component={RouterLink} to='/'>
              {session.currentUser.fullName}
            </Link>
            <Button variant='contained' onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link component={RouterLink} to='/login'>
            Login
          </Link>
        )}
      </Box>
    </Box>
  )
}
