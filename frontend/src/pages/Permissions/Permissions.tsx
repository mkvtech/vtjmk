import { Box, Container, Divider, Skeleton, Typography } from '@mui/material'
import { useQueryPermissions } from '../../hooks/api/queries'
import Link from '../../components/Link/Link'
import PermissionsItem from './PermissionsItem'

export default function Permissions(): JSX.Element {
  const permissionsQuery = useQueryPermissions()

  return (
    <Container maxWidth='lg' sx={{ pt: 8, pb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Typography>
          <Link href={'/permissions/create'}>Create new Permission</Link>
        </Typography>
      </Box>
      <Typography variant='h1' sx={{ mb: 2 }}>
        Permissions
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography>This page allows you to assign permissions to individual users.</Typography>
      </Box>

      <Divider />

      {permissionsQuery.isLoading ? (
        <>
          <Skeleton variant='rounded' />
          <Skeleton variant='rounded' />
          <Skeleton variant='rounded' />
        </>
      ) : permissionsQuery.isSuccess ? (
        <Box>
          {permissionsQuery.data.map((permission) => (
            <PermissionsItem key={permission.id} permission={permission} />
          ))}
        </Box>
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
