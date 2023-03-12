import { Link as MuiLink, LinkProps } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Link(props: LinkProps): JSX.Element {
  return <MuiLink component={RouterLink} {...props} to={props.href ?? '#'} />
}
