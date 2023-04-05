import { AccountCircle, Help, Menu as MenuIcon, Translate } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import AppBarTabs from './AppBarTabs'
import Footer from './Footer'
import { DRAWER_WIDTH } from './share'
import SideMenu from './SideMenu'

export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  const { session } = useApi()
  const { t, i18n } = useTranslation()

  const [sideMenuOpened, setSideMenuOpened] = React.useState(true)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleLanguageMenuSetLanguage = (locale: 'en' | 'lt'): void => {
    i18n.changeLanguage(locale)
    setAnchorEl(null)
  }

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
              <MenuIcon />
            </IconButton>
          )}
          <Container maxWidth='lg'>
            <Toolbar variant='dense'>
              <img src='/VilniusTech.png' />

              <Box sx={{ flexGrow: 1 }} />

              <Stack direction='row' spacing={1} divider={<Divider orientation='vertical' flexItem />}>
                {session ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                      {t('hello')}, {session.currentUser.fullName}
                    </Typography>

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

                <IconButton onClick={handleLanguageMenuOpen}>
                  <Translate />
                </IconButton>

                <Menu
                  id='languages-menu'
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={(): void => setAnchorEl(null)}
                >
                  <MenuItem onClick={(): void => handleLanguageMenuSetLanguage('en')}>English</MenuItem>
                  <MenuItem onClick={(): void => handleLanguageMenuSetLanguage('lt')}>Lithuanian</MenuItem>
                </Menu>
              </Stack>
            </Toolbar>
          </Container>

          <AppBarTabs />
        </AppBar>

        <Box sx={{ flex: 1 }}>{children}</Box>

        <Footer />
      </Box>
    </Box>
  )
}
