import { Typography, List, ListItem, Container } from '@mui/material'
import { useQuery } from 'react-query'
import Link from '../../components/Link'
import { useApi } from '../../hooks/useApi'
import { useTranslation } from 'react-i18next'

interface Conference {
  id: string
  title: string
  description: string
}

export default function ConferencesList(): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()
  const query = useQuery<readonly Readonly<Conference>[]>('GET /conferences', async () => {
    const { data } = await client.get('/conferences')

    return data
  })

  return (
    <Container maxWidth='lg' sx={{ pt: 8 }}>
      <Typography variant='h1'>{t('common.conferences')}</Typography>

      {query.isLoading ? (
        <Typography component='p'>We are loading conferences...</Typography>
      ) : query.isError ? (
        <Typography component='p'>Cannot load conferences... sorry.</Typography>
      ) : query.isSuccess ? (
        <List>
          {query.data.map((conference) => (
            <ListItem key={conference.id}>
              <Link href={`/conferences/${conference.id}`}>{conference.title}</Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography component='p'>Unexpected state :(</Typography>
      )}
    </Container>
  )
}
