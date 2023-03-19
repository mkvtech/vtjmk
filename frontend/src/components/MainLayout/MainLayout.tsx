import { AccountCircle, Help, Menu, Translate } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import Footer from './Footer'
import { DRAWER_WIDTH } from './share'
import SideMenu from './SideMenu'

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

  const [sideMenuOpened, setSideMenuOpened] = React.useState(true)

  const sideMenuEnabled = !!session

  return (
    <Box>
      {sideMenuEnabled && <SideMenu session={session} open={sideMenuOpened} />}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ...(sideMenuEnabled && sideMenuOpened && { ml: `${DRAWER_WIDTH}px` }),
        }}
      >
        <AppBar
          sx={{
            bgcolor: 'white',
            borderBottom: '1px solid #F3F3F3',
            // ...(sideMenuEnabled && sideMenuOpened && { width: `calc(100% - ${DRAWER_WIDTH}px)` }),
          }}
          position='sticky'
          color='default'
          elevation={0}
        >
          {sideMenuEnabled && (
            <IconButton
              sx={{ mr: 2, position: 'absolute', top: 8, left: 8 }}
              onClick={(): void => setSideMenuOpened(!sideMenuOpened)}
            >
              <Menu />
            </IconButton>
          )}
          <Container maxWidth='lg'>
            <Toolbar variant='dense'>
              <img src='/VilniusTech.png' />

              <Box sx={{ flexGrow: 1 }} />

              <Stack direction='row' spacing={1} divider={<Divider orientation='vertical' flexItem />}>
                {session ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>{session.currentUser.fullName}</Typography>

                    <IconButton>
                      <Badge badgeContent={9} color='primary'>
                        <AccountCircle />
                      </Badge>
                    </IconButton>
                  </Box>
                ) : (
                  <Button component={RouterLink} to='/login' variant='text'>
                    Login
                  </Button>
                )}

                <IconButton>
                  <Help />
                </IconButton>

                <IconButton>
                  <Translate />
                </IconButton>
              </Stack>
            </Toolbar>
          </Container>

          <Container maxWidth='lg'>
            <Box sx={{ display: 'flex' }}>
              <AppBarTabLink component={RouterLink} to='/home'>
                Home
              </AppBarTabLink>
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

        <Box sx={{ flex: 1 }}>{children}</Box>

        <Footer />
      </Box>
    </Box>
  )
}
