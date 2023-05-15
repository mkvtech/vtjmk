import { List, SxProps, Theme } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function UnstyledList({ children, sx }: PropsWithChildren<{ sx?: SxProps<Theme> }>): JSX.Element {
  return (
    <List disablePadding sx={sx}>
      {children}
    </List>
  )
}
