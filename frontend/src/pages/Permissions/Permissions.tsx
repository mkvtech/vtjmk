import { Box, Container, Divider, Paper, Skeleton, Typography, styled } from '@mui/material'
import { useQueryPermissions } from '../../hooks/api/queries'
import { LoadingButton } from '@mui/lab'
import Link from '../../components/Link/Link'

const HighlightedText = styled('span')((_theme) => ({
  fontWeight: 900,
}))

const SecondaryText = styled('span')((theme) => ({
  color: theme.theme.palette.grey[600],
}))

export default function Permissions(): JSX.Element {
  const permissionsQuery = useQueryPermissions()

  return (
    <Container maxWidth='lg' sx={{ pt: 8, pb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Typography>
          <Link href={'/permissions/create'}>Create new Permission</Link>
        </Typography>
      </Box>
      <Typography component='h1' variant='h2' sx={{ mb: 2 }}>
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
            <Paper key={permission.id} sx={{ p: 2, mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  <HighlightedText>{permission.user.fullName}</HighlightedText>{' '}
                  <SecondaryText>{permission.user.email}</SecondaryText>
                </Typography>

                <LoadingButton color='error' variant='outlined'>
                  Delete
                </LoadingButton>
              </Box>

              <Typography sx={{ mt: 1 }}>
                <SecondaryText>Action:</SecondaryText> <em>{permission.action}</em>,{' '}
                <SecondaryText>Target:</SecondaryText> {permission.targetType === 'Conference' ? 'Conference' : 'Event'}
                , {permission.target.title} ({permission.targetId})
              </Typography>
            </Paper>
          ))}
        </Box>
      ) : (
        <>Error</>
      )}
    </Container>
  )
}
