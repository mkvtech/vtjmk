import { Autocomplete, AutocompleteRenderInputParams, SxProps, TextField, Theme } from '@mui/material'
import { UseQueryResult } from 'react-query'
import { UserSimple } from '../../hooks/api/schemas'
import UserPickerListItem from './UserPickerListItem'

export default function UserPicker({
  query,
  value,
  onChange,
  renderInput,
  sx,
}: {
  query: UseQueryResult<UserSimple[]>
  value: UserSimple | null
  onChange: (newValue: UserSimple | null) => void
  renderInput?: (params: AutocompleteRenderInputParams) => JSX.Element
  sx?: SxProps<Theme>
}): JSX.Element {
  return (
    <Autocomplete
      getOptionLabel={(option): string => option.fullName}
      loading={query.isLoading}
      onChange={(event, newValue): void => onChange(newValue)}
      options={query.isSuccess ? query.data : []}
      renderInput={renderInput ? renderInput : (params): JSX.Element => <TextField {...params} />}
      renderOption={(props, option): JSX.Element => (
        <UserPickerListItem key={option.id} props={props} option={option} />
      )}
      size='small'
      sx={sx}
      value={value}
    />
  )
}
