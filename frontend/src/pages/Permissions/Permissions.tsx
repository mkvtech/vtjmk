import { Box, Container, Divider, Skeleton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Link from '../../components/Link/Link'
import UnstyledList from '../../components/UnstyledList/UnstyledList'
import UnstyledListItem from '../../components/UnstyledList/UnstyledListItem'
import { useQueryPermissions } from '../../hooks/api/queries'
import PermissionsItem from './PermissionsItem'

export default function Permissions(): JSX.Element {
  const { t } = useTranslation()
  const permissionsQuery = useQueryPermissions()

  return (
    <Container maxWidth='lg' sx={{ pt: 8, pb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Typography>
          <Link href={'/permissions/create'}>{t('pages.permissions.createNewPermission')}</Link>
        </Typography>
      </Box>
      <Typography variant='h1' sx={{ mb: 2 }}>
        {t('pages.permissions.title')}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography>{t('pages.permissions.description')}</Typography>
      </Box>

      <Divider />

      {permissionsQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' />
          <Skeleton variant='rounded' />
          <Skeleton variant='rounded' />
        </>
      ) : permissionsQuery.isSuccess ? (
        <UnstyledList>
          {permissionsQuery.data.map((permission) => (
            <UnstyledListItem key={permission.id}>
              <PermissionsItem permission={permission} />
            </UnstyledListItem>
          ))}
        </UnstyledList>
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
