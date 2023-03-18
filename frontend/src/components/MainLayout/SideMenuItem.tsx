import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface SubMenuItemData {
  readonly id: string
  readonly displayName: string
  readonly icon: JSX.Element
  readonly path: string
}

interface MenuItemData {
  readonly id: string
  readonly displayName: string
  readonly icon: JSX.Element
  readonly path?: string
  readonly items?: readonly SubMenuItemData[]
}

export default function SideMenuItem({ item }: { item: MenuItemData }): JSX.Element {
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
        <ListItemText primary={item.displayName} primaryTypographyProps={{ fontWeight: 'inherit' }} />
        {item.items && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {item.items && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List disablePadding sx={{ bgcolor: theme.palette.primary.dark }}>
            {item.items.map((subMenuItem) => (
              <ListItemButton key={subMenuItem.id} component={RouterLink} to={subMenuItem.path}>
                <ListItemIcon>-</ListItemIcon>
                <ListItemText sx={{ fontSize: '0.8rem' }}>{subMenuItem.displayName}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
