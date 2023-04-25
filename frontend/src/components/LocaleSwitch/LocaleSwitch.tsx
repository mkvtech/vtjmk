import { Translate } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useApi } from '../../hooks/useApi'
import { VtjmkLocale } from '../../share'

export default function LocaleSwitch(): JSX.Element {
  const { i18n } = useTranslation()
  const { setLocale } = useApi()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleLanguageMenuSetLocale = (locale: VtjmkLocale): void => {
    i18n.changeLanguage(locale)
    setLocale(locale)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleLanguageMenuOpen}>
        <Translate />
      </IconButton>

      <Menu id='languages-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(): void => setAnchorEl(null)}>
        <MenuItem onClick={(): void => handleLanguageMenuSetLocale('en-US')}>English</MenuItem>
        <MenuItem onClick={(): void => handleLanguageMenuSetLocale('lt')}>Lithuanian</MenuItem>
      </Menu>
    </>
  )
}
