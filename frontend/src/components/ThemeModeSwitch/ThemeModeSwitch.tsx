import { DarkMode, LightMode } from '@mui/icons-material'
import { IconButton, useTheme } from '@mui/material'
import { useColorMode } from '../AppTheme/AppTheme'

export default function ThemeModeSwitch(): JSX.Element {
  const theme = useTheme()
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton onClick={toggleColorMode}>{theme.palette.mode === 'dark' ? <DarkMode /> : <LightMode />}</IconButton>
  )
}
