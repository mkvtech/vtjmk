import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { SideMenuPolicies } from './share'

interface SubMenuItemData {
  readonly id: string
  readonly displayNameTranslationKey: string
  readonly icon: JSX.Element
  readonly path: string
  readonly isVisible: boolean | ((policies: SideMenuPolicies) => boolean)
}

interface MenuItemData {
  readonly id: string
  readonly displayNameTranslationKey: string
  readonly icon: JSX.Element
  readonly path?: string
  readonly items?: readonly SubMenuItemData[]
}

export default function SideMenuItem({
  item,
  policies,
}: {
  item: MenuItemData
  policies: SideMenuPolicies
}): JSX.Element {
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(true)

  return (
    <>
      <ListItemButton
        onClick={(): void => setOpen(!open)}
        {...(item.path
          ? {
              component: RouterLink,
              to: item.path,
            }
          : {})}
      >
        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
        <ListItemText primary={t(item.displayNameTranslationKey)} primaryTypographyProps={{ fontWeight: 'inherit' }} />
        {item.items && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {item.items && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List disablePadding sx={{ bgcolor: theme.palette.primary.dark }}>
            {item.items
              .filter(
                (item) => item.isVisible === true || (typeof item.isVisible === 'function' && item.isVisible(policies))
              )
              .map((subMenuItem) => (
                <ListItemButton key={subMenuItem.id} component={RouterLink} to={subMenuItem.path}>
                  <ListItemIcon>-</ListItemIcon>
                  <ListItemText sx={{ fontSize: '0.8rem' }}>{t(subMenuItem.displayNameTranslationKey)}</ListItemText>
                </ListItemButton>
              ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
