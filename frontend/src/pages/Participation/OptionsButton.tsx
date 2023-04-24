import { Delete, Edit, KeyboardArrowDown } from '@mui/icons-material'
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type OptionsButtonAction = 'edit' | 'delete'

export default function OptionsButton({
  actions,
  onActionClick,
}: {
  actions: Record<OptionsButtonAction, boolean>
  onActionClick: (action: OptionsButtonAction) => void
}): JSX.Element {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleActionClick = (action: OptionsButtonAction): void => {
    onActionClick(action)
    setAnchorEl(null)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button variant='contained' endIcon={<KeyboardArrowDown />} onClick={handleClick}>
        {t('common.options')}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {actions.edit && (
          <MenuItem onClick={(): void => handleActionClick('edit')}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>{t('common.edit')}</ListItemText>
          </MenuItem>
        )}

        {actions.delete && (
          <MenuItem onClick={(): void => handleActionClick('delete')}>
            <ListItemIcon>
              <Delete fontSize='small' />
            </ListItemIcon>
            <ListItemText>{t('common.delete')}</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
