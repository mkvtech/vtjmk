import { Edit } from '@mui/icons-material'
import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import NoDataText from '../../components/Typography/NoDataText'
import { useQueryParticipation } from '../../hooks/api/queries'
import ReviewerForm from './ReviewerForm'
import UserButton from './UserButton'

export default function Reviewer({ editable }: { editable: boolean }): JSX.Element {
  const { t } = useTranslation()
  const { participationId } = useParams() as { participationId: string }
  const participationQuery = useQueryParticipation({ participationId })

  const [edit, setEdit] = useState(false)

  const initialValue =
    participationQuery.isSuccess && participationQuery.data.reviewer && participationQuery.data.reviewerId
      ? { reviewerId: participationQuery.data.reviewerId, reviewer: participationQuery.data.reviewer }
      : null

  return (
    <>
      <Typography component='h2' variant='h4' sx={{ mt: 4, mb: 2 }}>
        {t('common.reviewer')}
      </Typography>

      {!participationQuery.isSuccess ? (
        <Typography>
          <Skeleton />
        </Typography>
      ) : edit ? (
        <ReviewerForm
          initialValue={initialValue}
          participationId={participationId}
          onEditDone={(): void => setEdit(false)}
        />
      ) : !participationQuery.data.reviewer ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <NoDataText>{t('common.noReviewerAssigned')}</NoDataText>
          {editable && (
            <IconButton onClick={(): void => setEdit(true)}>
              <Edit />
            </IconButton>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <UserButton user={participationQuery.data.reviewer} withEmail sx={{ flexGrow: 1, minWidth: 0 }} />

          {editable && (
            <IconButton onClick={(): void => setEdit(true)} sx={{ ml: 1 }}>
              <Edit />
            </IconButton>
          )}
        </Box>
      )}
    </>
  )
}
