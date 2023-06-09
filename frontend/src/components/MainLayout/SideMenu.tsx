import { AdminPanelSettings, Create, Description, ExitToApp, Key, Visibility } from '@mui/icons-material'
import { Avatar, Box, Button, Drawer, List, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useQueryPolicies } from '../../hooks/api/queries'
import { Session } from '../../hooks/useApi'
import SideMenuItem from './SideMenuItem'
import { DRAWER_WIDTH, SideMenuPolicies, sideMenuPoliciesSchema } from './share'

const sideMenuStructure = [
  {
    id: 'participations',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelParticipations',
    icon: <ExitToApp />,
    isVisible: true,
    path: '/user/participations',
  },
  {
    id: 'documents',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelDocuments',
    icon: <Description />,
    isVisible: true,
    items: [
      {
        id: 'participationCertificate',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelParticipationCertificate',
        icon: <Create />,
        isVisible: true,
        path: '/user/documents/participationCertificate',
      },
    ],
  },
  {
    id: 'management',
    displayNameTranslationKey: 'components.mainLayout.sideMenuLabelManagement',
    icon: <Create />,
    isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.reviewsIndex,
    items: [
      {
        id: 'reviews',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelReviews',
        icon: <Visibility />,
        isVisible: (policies: SideMenuPolicies): boolean => policies.policies.user.general.reviewsIndex,
        path: '/user/reviews',
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
        id: 'permissions',
        displayNameTranslationKey: 'components.mainLayout.sideMenuLabelPermissions',
        icon: <Key />,
        isVisible: true,
        path: '/permissions',
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
          general: ['admin', 'manageEvents', 'reviewsIndex'],
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
          <Avatar src={session.currentUser.avatarUrl} />
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
