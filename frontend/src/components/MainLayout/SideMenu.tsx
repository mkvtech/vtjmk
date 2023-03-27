import { AccountCircle, AdminPanelSettings, Create, Description, ExitToApp, Key, Monitor } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, List, Typography } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { z } from 'zod'
import { useQueryPolicies } from '../../hooks/api/queries'
import { Session } from '../../hooks/useApi'
import { DRAWER_WIDTH } from './share'
import SideMenuItem from './SideMenuItem'

const sideMenuPoliciesSchema = z.object({
  policies: z.object({
    user: z.object({
      general: z.object({
        admin: z.boolean(),
        manageEvents: z.boolean(),
      }),
    }),
  }),
})
type SideMenuPolicies = z.infer<typeof sideMenuPoliciesSchema>

const sideMenuStructure = [
  {
    id: 'participations',
    displayName: 'Participations',
    icon: <ExitToApp />,
    isVisible: true,
    path: '/',
  },
  {
    id: 'documents',
    displayName: 'Documents',
    icon: <Description />,
    isVisible: true,
    items: [
      {
        id: 'eventCard',
        displayName: 'Event Card',
        icon: <Create />,
        isVisible: true,
        path: '/',
      },
      {
        id: 'participationCertificate',
        displayName: 'Participation Certificate',
        icon: <Create />,
        isVisible: true,
        path: '/',
      },
    ],
  },
  {
    id: 'profile',
    displayName: 'Profile',
    icon: <AccountCircle />,
    isVisible: true,
    path: '/',
  },
  {
    id: 'management',
    displayName: 'Management',
    icon: <Create />,
    isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.manageEvents,
    items: [
      {
        id: 'events',
        displayName: 'Events',
        icon: <Create />,
        isVisible: true,
        path: '/',
      },
    ],
  },
  {
    id: 'admin',
    displayName: 'Administration',
    icon: <AdminPanelSettings />,
    isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.admin,
    items: [
      {
        id: 'systemStatus',
        displayName: 'System services / status',
        icon: <Monitor />,
        isVisible: true,
        path: '/',
      },
      {
        id: 'permissions',
        displayName: 'Permissions',
        icon: <Key />,
        isVisible: true,
        path: '/',
      },
      {
        id: 'createConference',
        displayName: 'Create Conference',
        icon: <Create />,
        isVisible: true,
        path: '/conferences/new',
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
  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        user: {
          general: ['admin', 'manageEvents'],
        },
      },
    },
    schema: sideMenuPoliciesSchema,
  })

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

      {policiesQuery.isLoading ? (
        <Box></Box>
      ) : policiesQuery.isSuccess ? (
        <List disablePadding sx={{ color: 'white' }}>
          {sideMenuStructure
            .filter(
              (item) =>
                item.isVisible === true || (typeof item.isVisible === 'function' && item.isVisible(policiesQuery.data))
            )
            .map((item) => (
              <SideMenuItem key={item.id} item={item} />
            ))}
        </List>
      ) : (
        <Box>Something went wrong...</Box>
      )}
    </Drawer>
  )
}
