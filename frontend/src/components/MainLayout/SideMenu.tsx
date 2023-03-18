import { AccountCircle, AdminPanelSettings, Create, Description, ExitToApp, Key, Monitor } from '@mui/icons-material'
import { Avatar, Box, Divider, Drawer, List, Typography } from '@mui/material'
import React from 'react'
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

export default function SideMenu({ open }: { open: boolean }): JSX.Element {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#0B4DC7',
        },
        color: 'white',
      }}
      open={open}
      variant='persistent'
    >
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ width: 64, height: 64, mb: 2 }}>M</Avatar>
        </Box>

        <Typography sx={{ textAlign: 'center' }}>M</Typography>
      </Box>

      <Divider />

      <List disablePadding sx={{ color: 'white' }}>
        {sideMenuStructure.map((item) => (
          <SideMenuItem key={item.id} item={item} />
        ))}
      </List>
    </Drawer>
  )
}
