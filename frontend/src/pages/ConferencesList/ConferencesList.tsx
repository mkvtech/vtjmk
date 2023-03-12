import { Typography, List, ListItem } from '@mui/material'
import { useQuery } from 'react-query'
import Link from '../../components/Link'
import Navigation from '../../components/Navigation'
import { useApi } from '../../hooks/useApi'

interface Conference {
  id: string
  title: string
  description: string
}

export default function ConferencesList(): JSX.Element {
  const { client } = useApi()
  const query = useQuery<readonly Readonly<Conference>[]>('GET /conferences', async () => {
    const { data } = await client.get('/conferences')

    return data
  })

  return (
    <>
      <Navigation />

      <Typography component='h1' variant='h4'>
        Conferences
      </Typography>

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
    </>
  )
}
