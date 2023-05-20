import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { TimeField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { EventParticipation } from '../../../../hooks/api/schemas'
import { useApi } from '../../../../hooks/useApi'
import ParticipantsMenu, { ParticipationMenuValue } from './ParticipantsMenu'

interface InitialData {
  date: Date
  participations: readonly EventParticipation[]
}

interface FieldValues {
  date: Dayjs
  participants: ParticipationMenuValue
}

interface UpdateEventParticipantsMutationInput {
  date: string
  participationsOrder: Record<string, { order: number; time: number | null }>
}

export default function Form({ initialData }: { initialData: InitialData }): JSX.Element {
  const { eventId } = useParams() as { eventId: string }
  const { client } = useApi()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const { control, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      date: dayjs(initialData.date),
      participants: {
        include: initialData.participations
          .filter((participation) => participation.order !== null)
          .sort((a, b) => (a.order || 0) - (b.order || 0)),
        exclude: initialData.participations.filter((participation) => participation.order === null),
      },
    },
  })

  const updateParticipantsMutation = useMutation((data: UpdateEventParticipantsMutationInput) =>
    client.patch(`/events/${eventId}/update_participations_order`, data)
  )

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    updateParticipantsMutation.mutate(
      {
        participationsOrder: data.participants.include.reduce<Record<string, { order: number; time: number | null }>>(
          (prev, current, index) => {
            prev[current.id] = { order: index, time: current.time }
            return prev
          },
          {}
        ),
        date: data.date.toISOString(),
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['events', eventId, 'participations'])
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
        {t('common.conferenceProgramme')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Controller
          name='date'
          control={control}
          render={({ field }): JSX.Element => (
            <TimeField {...field} format='HH:mm' label={t('common.conferenceStartTime')} size='small' />
          )}
        />

        <LoadingButton variant='contained' type='submit'>
          {t('common.save')}
        </LoadingButton>
      </Box>

      <Controller
        name='participants'
        control={control}
        render={({ field: { value, onChange } }): JSX.Element => <ParticipantsMenu value={value} onChange={onChange} />}
      />
    </form>
  )
}
