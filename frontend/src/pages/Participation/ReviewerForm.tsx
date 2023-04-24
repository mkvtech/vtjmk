import { Close, Done } from '@mui/icons-material'
import { Autocomplete, Box, IconButton, TextField, Typography } from '@mui/material'
import { SyntheticEvent, useMemo, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryParticipationAvailableReviewers } from '../../hooks/api/queries'
import { useApi } from '../../hooks/useApi'

interface Reviewer {
  id: string
  fullName: string
  email: string
}

export default function ReviewerForm({
  initialValue,
  onEditDone,
  participationId,
}: {
  initialValue: Reviewer | null
  onEditDone: () => void
  participationId: string
}): JSX.Element {
  const { client } = useApi()
  const queryClient = useQueryClient()

  const availableReviewersQuery = useQueryParticipationAvailableReviewers({ participationId })

  const [value, setValue] = useState<Reviewer | null>(initialValue)

  const updateReviewerMutation = useMutation((data: { reviewerId: string | null }) =>
    client.patch(`/participations/${participationId}/update_reviewer`, data)
  )

  // Note: using useEffect here would drop warnings in the console about MUI.
  // Another way to achieve same logic would be to pass onSuccess callback to useQuery
  useMemo(() => {
    if (
      value &&
      availableReviewersQuery.data &&
      !availableReviewersQuery.data.find((availableReviewer) => availableReviewer.id === value.id)
    ) {
      setValue(null)
    }
  }, [availableReviewersQuery.data])

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()

    updateReviewerMutation.mutate(
      { reviewerId: value ? value.id : null },
      {
        onSuccess: () => {
          onEditDone()
        },
        onSettled: () => {
          queryClient.invalidateQueries(['participations', participationId])
        },
      }
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          getOptionLabel={(option): string => option.fullName}
          loading={availableReviewersQuery.isLoading}
          isOptionEqualToValue={(option, value): boolean => option.id === value.id}
          value={value}
          onChange={(event, newValue): void => {
            setValue(newValue)
          }}
          options={availableReviewersQuery.isSuccess ? availableReviewersQuery.data : []}
          renderInput={(params): JSX.Element => <TextField {...params} />}
          renderOption={(props, option): JSX.Element => (
            <li {...props}>
              <Box>
                {option.fullName}
                <br />
                <Typography component='span' color='textSecondary'>
                  {option.email}
                </Typography>
              </Box>
            </li>
          )}
          size='small'
          sx={{ flexGrow: 1 }}
        />

        <IconButton size='small' sx={{ ml: 1 }} type='submit'>
          <Done />
        </IconButton>

        <IconButton size='small' sx={{ ml: 1 }} onClick={(): void => onEditDone()}>
          <Close />
        </IconButton>
      </Box>
    </form>
  )
}
