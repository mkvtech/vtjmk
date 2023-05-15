import { Autocomplete, AutocompleteRenderInputParams, SxProps, TextField, Theme } from '@mui/material'
import { UseControllerProps, useController } from 'react-hook-form'
import { UseQueryResult } from 'react-query'
import { UserSimple } from '../../hooks/api/schemas'
import UserPickerListItem from './UserPickerListItem'

export default function UserPickerRhf<FormValues extends object>({
  query,
  renderInput,
  sx,
  control,
  name,
}: {
  query: UseQueryResult<UserSimple[]>
  renderInput?: (params: AutocompleteRenderInputParams) => JSX.Element
  sx?: SxProps<Theme>
} & UseControllerProps<FormValues>): JSX.Element {
  const { field } = useController({ control, name })

  return (
    <Autocomplete
      {...field}
      getOptionLabel={(option): string => option.fullName}
      loading={query.isLoading}
      isOptionEqualToValue={(option, value): boolean => option.id === value.id}
      onChange={(event, newValue): void => field.onChange(newValue)}
      options={query.isSuccess ? query.data : []}
      renderInput={renderInput ? renderInput : (params): JSX.Element => <TextField {...params} />}
      renderOption={(props, option): JSX.Element => (
        <UserPickerListItem key={option.id} props={props} option={option} />
      )}
      size='small'
      sx={sx}
    />
  )
}
