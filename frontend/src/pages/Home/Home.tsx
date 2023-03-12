import { Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Navigation from '../../components/Navigation'

export default function Home(): JSX.Element {
  return (
    <div>
      <Navigation />

      <Typography component='h1' variant='h4'>
        Home
      </Typography>

      <Link component={RouterLink} to='/login'>
        Login
      </Link>
    </div>
  )
}
