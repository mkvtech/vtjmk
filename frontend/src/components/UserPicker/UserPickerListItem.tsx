import { Avatar, Box, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'
import { User } from './share'

export default function UserPickerListItem({
  props,
  option,
}: {
  props: HTMLAttributes<HTMLLIElement>
  option: User
}): JSX.Element {
  return (
    <li {...props}>
      <Box sx={{ display: 'flex' }}>
        <Avatar src={option.avatarUrl} sx={{ width: '40px', height: '40px', mr: 2 }} />

        <Box>
          {option.fullName}

          <br />

          <Typography component='span' color='textSecondary'>
            {option.email}
          </Typography>
        </Box>
      </Box>
    </li>
  )
}
