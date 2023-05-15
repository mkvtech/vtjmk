import { Avatar, Box, Paper, SxProps, Theme, Typography } from '@mui/material'
import Link from '../../components/Link/Link'

interface User {
  id: string
  fullName: string
  email: string
  avatarUrl: string
}

export default function UserButton({
  user,
  withEmail,
  variant,
  sx,
}: {
  user: User
  withEmail?: boolean
  variant?: 'elevated' | 'outlined' | 'withoutBorder'
  sx?: SxProps<Theme>
}): JSX.Element {
  if (withEmail) {
    return (
      <Box sx={sx}>
        <Link href={`/users/${user.id}`} sx={{ textDecoration: 'none' }}>
          <Paper
            sx={{ pt: 1, pr: 2, pb: 1, pl: 1, display: 'flex', alignItems: 'center' }}
            elevation={variant === 'withoutBorder' ? 0 : undefined}
            variant={variant === 'outlined' ? 'outlined' : undefined}
          >
            <Avatar src={user.avatarUrl} sx={{ width: '40px', height: '40px', mr: 2 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography>{user.fullName}</Typography>
              <Typography color='textSecondary' noWrap>
                {user.email}
              </Typography>
            </Box>
          </Paper>
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={sx}>
      <Link href={`/users/${user.id}`} sx={{ textDecoration: 'none' }}>
        <Paper
          sx={{ pt: 1, pr: 2, pb: 1, pl: 1, display: 'flex', alignItems: 'center' }}
          elevation={variant === 'withoutBorder' ? 0 : undefined}
          variant={variant === 'outlined' ? 'outlined' : undefined}
        >
          <Avatar src={user.avatarUrl} sx={{ width: '24px', height: '24px', mr: 1 }} />
          <Typography>{user.fullName}</Typography>
        </Paper>
      </Link>
    </Box>
  )
}
