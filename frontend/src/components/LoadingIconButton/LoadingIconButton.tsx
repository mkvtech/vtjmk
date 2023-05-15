import { CircularProgress, IconButton, SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export default function LoadingIconButton({
  icon,
  label,
  loading,
  onClick,
  size,
  sx,
}: {
  icon: JSX.Element
  label: string | null
  loading?: boolean
  onClick?: () => void
  size?: 'small' | 'medium' | undefined
  sx?: SxProps<Theme>
}): JSX.Element {
  if (loading) {
    const sizePx = size === 'small' ? '34px' : '40px'
    const p = size === 'small' ? '5px' : '8px'

    return <CircularProgress size={sizePx} sx={[{ p }, ...(Array.isArray(sx) ? sx : [sx])]} />
  }

  return (
    <IconButton aria-label={label || undefined} onClick={onClick} size={size} sx={sx}>
      {icon}
    </IconButton>
  )
}
