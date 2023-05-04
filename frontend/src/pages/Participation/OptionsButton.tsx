import { Delete, Description, Edit, KeyboardArrowDown } from '@mui/icons-material'
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

export type OptionsButtonAction = 'delete' | 'edit' | 'generateCertificate'

export default function OptionsButton({
  actions,
  onEditClick,
}: {
  actions: Record<OptionsButtonAction, boolean>
  onEditClick: () => void
}): JSX.Element {
  const { participationId } = useParams() as { participationId: string }
  const { t } = useTranslation()
  const { client } = useApi()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const destroyMutation = useMutation(({ participationId }: { participationId: string }) =>
    client.delete(`/participations/${participationId}`)
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleEdit = (): void => {
    onEditClick()
    setAnchorEl(null)
  }

  const handleDelete = (): void => {
    destroyMutation.mutate(
      { participationId },
      {
        onSuccess: () => {
          navigate('/')
        },
      }
    )
    setAnchorEl(null)
  }

  const handleGenerateCertificate = (): void => {
    navigate(`/user/documents/participationCertificate?participationId=${participationId}`)
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
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <Edit fontSize='small' />
            </ListItemIcon>
            <ListItemText>{t('common.edit')}</ListItemText>
          </MenuItem>
        )}

        {actions.generateCertificate && (
          <MenuItem onClick={handleGenerateCertificate}>
            <ListItemIcon>
              <Description fontSize='small' />
            </ListItemIcon>
            <ListItemText>{t('common.getCertificate')}</ListItemText>
          </MenuItem>
        )}

        {actions.delete && (
          <MenuItem onClick={handleDelete}>
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
