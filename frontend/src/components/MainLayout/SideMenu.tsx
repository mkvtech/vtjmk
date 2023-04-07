import { AccountCircle, AdminPanelSettings, Create, Description, ExitToApp, Key, Monitor } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, List, Typography } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useQueryPolicies } from '../../hooks/api/queries'
import { Session } from '../../hooks/useApi'
import { DRAWER_WIDTH, SideMenuPolicies, sideMenuPoliciesSchema } from './share'
import SideMenuItem from './SideMenuItem'

const sideMenuStructure = [
  {
    id: 'participations',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelParticipations',
    icon: <ExitToApp />,
    isVisible: true,
    path: '/',
  },
  {
    id: 'documents',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelDocuments',
    icon: <Description />,
    isVisible: true,
    items: [
      {
        id: 'eventCard',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelEventCard',
        icon: <Create />,
        isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.manageEvents,
        path: '/',
      },
      {
        id: 'participationCertificate',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelParticipationCertificate',
        icon: <Create />,
        isVisible: true,
        path: '/',
      },
    ],
  },
  {
    id: 'profile',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelProfile',
    icon: <AccountCircle />,
    isVisible: true,
    path: '/',
  },
  {
    id: 'management',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelManagement',
    icon: <Create />,
    isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.manageEvents,
    items: [
      {
        id: 'events',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelEvents',
        icon: <Create />,
        isVisible: true,
        path: '/',
      },
    ],
  },
  {
    id: 'admin',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelAdministration',
    icon: <AdminPanelSettings />,
    isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.admin,
    items: [
      {
        id: 'systemStatus',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelSystemStatus',
        icon: <Monitor />,
        isVisible: true,
        path: '/',
      },
      {
        id: 'permissions',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelPermissions',
        icon: <Key />,
        isVisible: true,
        path: '/',
      },
      {
        id: 'createConference',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelCreateConference',
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
  const { t } = useTranslation()
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
          <WhiteButton>{t('common.profile')}</WhiteButton>
          <WhiteButton sx={{ ml: 2 }} onClick={(): void => session.logout()}>
            {t('common.logout')}
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
              <SideMenuItem key={item.id} item={item} policies={policiesQuery.data} />
            ))}
        </List>
      ) : (
        <Box>Something went wrong...</Box>
      )}
    </Drawer>
  )
}
