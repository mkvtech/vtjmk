import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, TextField, Typography, createFilterOptions } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { useQueryEventUsersAvailableAsReviewers } from '../../../../hooks/api/queries'
import { useApi } from '../../../../hooks/useApi'

interface User {
  id: string
  fullName: string
  email: string
}

export default function AddReviewer(): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { client } = useApi()
  const queryClient = useQueryClient()

  const usersQuery = useQueryEventUsersAvailableAsReviewers({ eventId })

  const [value, setValue] = useState<User | null>(null)

  const addReviewerMutation = useMutation((data: { reviewerId: string }) =>
    client.post(`/events/${eventId}/reviewers`, data)
  )

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()

    if (!value) {
      return
    }

    addReviewerMutation.mutate(
      { reviewerId: value.id },
      {
        onSuccess: () => {
          setValue(null)
        },
        onSettled: () => {
          queryClient.invalidateQueries(['events', eventId, 'reviewers'])
          queryClient.invalidateQueries(['events', eventId, 'users', 'available_as_reviewers'])
        },
      }
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          getOptionLabel={(options): string => options.fullName}
          filterOptions={createFilterOptions({ matchFrom: 'any', limit: 20 })}
          loading={usersQuery.isLoading}
          onChange={(event, newValue): void => setValue(newValue)}
          options={usersQuery.isSuccess ? usersQuery.data : []}
          renderInput={(params): JSX.Element => <TextField {...params} fullWidth />}
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
          value={value}
          sx={{ flexGrow: 1 }}
        />

        <LoadingButton
          type='submit'
          variant='contained'
          sx={{ ml: 2 }}
          loading={addReviewerMutation.isLoading}
          disabled={!value}
        >
          Add
        </LoadingButton>
      </Box>
    </form>
  )
}
