import { LoadingButton } from '@mui/lab'
import { Autocomplete, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UseQueryResult } from 'react-query'
import { Event, EventDocumentTemplate } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'

interface FieldValues {
  documentTemplate: { id: string; label: string } | null
  fileType: 'pdf' | 'docx'
}

export default function GenerateFileForm({
  event,
  availableTemplatesQuery,
}: {
  event: Event
  availableTemplatesQuery: UseQueryResult<readonly EventDocumentTemplate[]>
}): JSX.Element {
  const { t } = useTranslation()
  const { client } = useApi()

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      documentTemplate: availableTemplatesQuery.isSuccess
        ? { id: availableTemplatesQuery.data[0].id, label: availableTemplatesQuery.data[0].name }
        : null,
      fileType: 'pdf',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name='documentTemplate'
            control={control}
            render={({ field: { value, onChange } }): JSX.Element => (
              <Autocomplete
                value={value}
                onChange={(event, newValue): void => onChange(newValue)}
                options={
                  availableTemplatesQuery.isSuccess
                    ? availableTemplatesQuery.data.map((template) => ({ id: template.id, label: template.name }))
                    : []
                }
                loading={availableTemplatesQuery.isLoading}
                renderInput={(props): JSX.Element => (
                  <TextField {...props} size='small' fullWidth label={t('common.documentTemplate')} />
                )}
                isOptionEqualToValue={(option, value): boolean => option.id === value.id}
              />
            )}
          />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth size='small'>
            <InputLabel id='document-type-select-label'>{t('common.fileType')}</InputLabel>
            <Controller
              name='fileType'
              control={control}
              render={({ field }): JSX.Element => (
                <Select
                  {...field}
                  labelId='document-type-select-label'
                  label={t('common.fileType')}
                  fullWidth
                  size='small'
                  required
                >
                  <MenuItem value='docx'>DOCX</MenuItem>
                  <MenuItem value='pdf'>PDF</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <LoadingButton variant='contained' type='submit'>
            {t('common.generate')}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}
