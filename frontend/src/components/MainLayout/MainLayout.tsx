import { AccountCircle } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, Container, IconButton, Link, styled, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

// Reverse engineered from main website ;-;
const AppBarTabLink = styled(Link)((_theme) => ({
  paddingLeft: 16,
  paddingRight: 16,
  textAlign: 'center',
  position: 'relative',
  cursor: 'pointer',
  textDecoration: 'none',
  color: '#0b4dc7',
  height: 60,
  lineHeight: '60px',
  verticalAlign: 'bottom',
  fontSize: '13px',
  fontWeight: 'bold',
  ':hover': {
    color: '#269BF0',
    '&::after': {
      content: '""',
      height: 3,
      width: '100%',
      background: '#269BF0',
      position: 'absolute',
      bottom: -3,
      left: 0,
      borderRadius: 1.5,
    },
  },
  // https://github.com/mui/material-ui/issues/15759#issuecomment-984553630
})) as typeof Link

export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  const { session } = useApi()

  return (
    <>
      <AppBar
        sx={{ bgcolor: 'white', borderBottom: '1px solid #F3F3F3' }}
        position='sticky'
        color='default'
        elevation={0}
      >
        <Container maxWidth='lg'>
          <Toolbar variant='dense'>
            <img src='/VilniusTech.png' />

            <Box sx={{ flexGrow: 1 }} />

            {session ? (
              <>
                <Typography>{session.currentUser.fullName}</Typography>

                <IconButton size='large'>
                  <Badge badgeContent={9} color='primary'>
                    <AccountCircle />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <Button component={RouterLink} to='/login' variant='text'>
                Login
              </Button>
            )}
          </Toolbar>

          <Box sx={{ display: 'flex' }}>
            <AppBarTabLink component={RouterLink} to='/conferences'>
              Conferences
            </AppBarTabLink>
            <AppBarTabLink component={RouterLink} to='/upcomingEvents'>
              Upcoming Events
            </AppBarTabLink>
            <AppBarTabLink component={RouterLink} to='/about'>
              About
            </AppBarTabLink>
          </Box>
        </Container>
      </AppBar>

      {children}
    </>
  )
}
