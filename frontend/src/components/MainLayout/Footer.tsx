import { Box, Container, Link, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'

export default function Footer(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Box sx={{ bgcolor: '#F7FBFF', py: 8, bottom: 0 }}>
      <Container maxWidth='lg'>
        <Stack direction='row' divider={<span>-</span>} justifyContent='center' spacing={2}>
          <span>{t('common.websiteName')}</span>
          <Link component={RouterLink} to='/home/contacts'>
            {t('common.contacts')}
          </Link>
          <Link component={RouterLink} to='/home/About'>
            {t('common.about')}
          </Link>
          <Link href='https://www.github.com/mkvtech/vtjmk'>{t('common.github')}</Link>
          <span>2023</span>
        </Stack>
      </Container>
    </Box>
  )
}
