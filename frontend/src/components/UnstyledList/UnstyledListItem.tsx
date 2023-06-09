import { ListItem, SxProps, Theme } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function UnstyledListItem({ children, sx }: PropsWithChildren<{ sx?: SxProps<Theme> }>): JSX.Element {
  return (
    <ListItem disablePadding sx={[{ display: 'block' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      {children}
    </ListItem>
  )
}
