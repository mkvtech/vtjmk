import { AccountCircle, Help, Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, Container, Divider, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import LocaleSwitch from '../LocaleSwitch'
import AppBarTabs from './AppBarTabs'
import Footer from './Footer'
import { DRAWER_WIDTH } from './share'
import SideMenu from './SideMenu'
import ThemeModeSwitch from '../ThemeModeSwitch/ThemeModeSwitch'

export default function MainLayout({ children }: PropsWithChildren): JSX.Element {
  const { session } = useApi()
  const { t } = useTranslation()

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
            bgcolor: 'background.default',
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
                    {t('common.login')}
                  </Button>
                )}

                <ThemeModeSwitch />

                <IconButton>
                  <Help />
                </IconButton>

                <LocaleSwitch />
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
