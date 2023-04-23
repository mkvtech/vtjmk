import { Navigate, useParams } from 'react-router-dom'
import { useQueryParticipation, useQueryPolicies } from '../../hooks/api/queries'
import PageError from '../../components/PageError/PageError'
import { Container, Divider, Grid, Skeleton, Typography } from '@mui/material'
import ReadonlyFilesView from '../../components/MultipleFilesUpload/ReadonlyFilesView'
import Status from './Status'
import { z } from 'zod'
import { useIsAllowed } from '../../hooks/api/share'

export default function Participation(): JSX.Element {
  const { participationId } = useParams()

  return participationId ? <Page participationId={participationId} /> : <Navigate to='/' replace />
}

const policiesSchema = z.object({
  policies: z.object({
    participations: z.object({
      items: z.record(
        z.object({
          update: z.boolean(),
          updateStatus: z.boolean(),
        })
      ),
    }),
  }),
})

function Page({ participationId }: { participationId: string }): JSX.Element {
  const participationQuery = useQueryParticipation({ participationId })

  const policiesQuery = useQueryPolicies({
    params: {
      policies: {
        participations: {
          items: {
            [participationId]: ['update', 'updateStatus'],
          },
        },
      },
    },
    schema: policiesSchema,
  })
  const isAllowed = useIsAllowed(policiesQuery, 'participations', participationId)

  return participationQuery.isError ? (
    <PageError withTitle error={participationQuery.error} />
  ) : (
    <Container maxWidth='lg' sx={{ my: 8 }}>
      <Typography variant='h1'>Participation</Typography>

      <Typography sx={{ my: 2 }}>
        This page contains information about{' '}
        {participationQuery.isSuccess ? (
          <b>{participationQuery.data.user.fullName}</b>
        ) : (
          <Skeleton sx={{ display: 'inline-block', width: '200px' }} />
        )}{' '}
        participation in{' '}
        {participationQuery.isSuccess ? (
          <b>{participationQuery.data.event.title}</b>
        ) : (
          <Skeleton sx={{ display: 'inline-block', width: '300px' }} />
        )}
      </Typography>

      <Divider />

      {!participationQuery.isSuccess ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : (
        <>
          <Grid container columnSpacing={{ xs: 0, md: 4 }}>
            <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
              <Status editable={isAllowed('updateStatus')} />

              <Typography variant='h2' sx={{ my: 4 }}>
                Participant
              </Typography>

              <Typography>{participationQuery.data.user.fullName}</Typography>

              <Typography variant='h2' sx={{ my: 4 }}>
                Reviewer
              </Typography>

              <Typography>{participationQuery.data.user.fullName}</Typography>
            </Grid>

            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant='h2' sx={{ mt: 4 }}>
                {participationQuery.data.submissionTitle}
              </Typography>

              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam fuga odit architecto, corporis sequi
                distinctio nam temporibus? Debitis nesciunt nisi dolores, odit eos ipsam ducimus. Illum qui nemo
                pariatur iusto reprehenderit rem consequuntur saepe totam, fuga repudiandae ex nihil accusamus amet,
                asperiores itaque corrupti hic voluptatum mollitia atque. Quod, doloribus quis ad veniam magni pariatur
                alias eum similique asperiores sit iure laborum, porro ullam a sint, deleniti nihil voluptas praesentium
                maxime! Dolorum, impedit delectus. Minima, nihil eveniet deleniti pariatur animi, sequi fugiat adipisci
                et, esse aliquam consequuntur aperiam molestias odit recusandae molestiae ipsa facere est dignissimos
                expedita porro alias. Fuga!
              </Typography>

              <Typography variant='h2' sx={{ my: 4 }}>
                Attachments
              </Typography>

              <ReadonlyFilesView files={participationQuery.data.submissionFiles} sx={{ my: 2 }} />

              <Divider />

              <Typography variant='h2' sx={{ my: 4 }}>
                Activity
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
