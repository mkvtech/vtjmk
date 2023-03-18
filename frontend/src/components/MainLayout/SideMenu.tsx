import { AccountCircle, AdminPanelSettings, Create, Description, ExitToApp, Key, Monitor } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, List, Typography } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { Session } from '../../hooks/useApi'
import { DRAWER_WIDTH } from './share'
import SideMenuItem from './SideMenuItem'

const sideMenuStructure = [
  {
    id: 'participations',
    displayName: 'Participations',
    icon: <ExitToApp />,
    path: '/',
  },
  {
    id: 'documents',
    displayName: 'Documents',
    icon: <Description />,
    items: [
      {
        id: 'eventCard',
        displayName: 'Event Card',
        icon: <Create />,
        path: '/',
      },
      {
        id: 'participationCertificate',
        displayName: 'Participation Certificate',
        icon: <Create />,
        path: '/',
      },
    ],
  },
  {
    id: 'profile',
    displayName: 'Profile',
    icon: <AccountCircle />,
    path: '/',
  },
  {
    id: 'management',
    displayName: 'Management',
    icon: <Create />,
    items: [
      {
        id: 'events',
        displayName: 'Events',
        icon: <Create />,
        path: '/',
      },
    ],
  },
  {
    id: 'admin',
    displayName: 'Administration',
    icon: <AdminPanelSettings />,
    items: [
      {
        id: 'systemStatus',
        displayName: 'System services / status',
        icon: <Monitor />,
        path: '/',
      },
      {
        id: 'permissions',
        displayName: 'Permissions',
        icon: <Key />,
        path: '/',
      },
    ],
  },
]

const WhiteButton = styled(Button)((_theme) => ({
  backgroundColor: 'white',
  ':hover': {
    backgroundColor: '#eeeeee',
  },
}))

export default function SideMenu({ open, session }: { open: boolean; session: Session }): JSX.Element {
  const theme = useTheme()

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: theme.palette.primary.main,
        },
        color: 'white',
      }}
      open={open}
      variant='persistent'
    >
      <Box sx={{ pt: 4, pb: 2, bgcolor: theme.palette.primary.dark }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, mb: 2 }}>M</Avatar>
        </Box>

        <Typography sx={{ textAlign: 'center', color: 'white' }}>{session.currentUser.fullName}</Typography>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <WhiteButton>Profile</WhiteButton>
          <WhiteButton sx={{ ml: 2 }} onClick={(): void => session.logout()}>
            Logout
          </WhiteButton>
        </Box>
      </Box>

      <List disablePadding sx={{ color: 'white' }}>
        {sideMenuStructure.map((item) => (
          <SideMenuItem key={item.id} item={item} />
        ))}
      </List>
    </Drawer>
  )
}
