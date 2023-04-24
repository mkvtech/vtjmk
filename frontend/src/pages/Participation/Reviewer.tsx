import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useQueryParticipation } from '../../hooks/api/queries'
import NoDataText from '../../components/Typography/NoDataText'
import { useState } from 'react'
import { Edit } from '@mui/icons-material'
import ReviewerForm from './ReviewerForm'

export default function Reviewer({ editable }: { editable: boolean }): JSX.Element {
  const { participationId } = useParams() as { participationId: string }
  const participationQuery = useQueryParticipation({ participationId })

  const [edit, setEdit] = useState(false)

  return (
    <>
      <Typography variant='h2' sx={{ my: 4 }}>
        Reviewer
      </Typography>

      {!participationQuery.isSuccess ? (
        <Typography>
          <Skeleton />
        </Typography>
      ) : edit ? (
        <ReviewerForm
          initialValue={participationQuery.data.reviewer}
          participationId={participationId}
          onEditDone={(): void => setEdit(false)}
        />
      ) : !participationQuery.data.reviewer ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <NoDataText>No reviewer assigned</NoDataText>
          {editable && (
            <IconButton onClick={(): void => setEdit(true)}>
              <Edit />
            </IconButton>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{participationQuery.data.reviewer.fullName}</Typography>
          {editable && (
            <IconButton onClick={(): void => setEdit(true)}>
              <Edit />
            </IconButton>
          )}
        </Box>
      )}
    </>
  )
}
