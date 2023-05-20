import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import { produce } from 'immer'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { isCorrectDraggableLocation, reorderItemMap } from '../../../../components/rbd/utils'
import { EventParticipation } from '../../../../hooks/api/schemas'
import { durationToSentence, i18nLanguageToIntlLocale } from '../../../../share'
import { OthersTable } from './OthersTable'
import ParticipantsTable from './ParticipantsTable'

export interface ParticipationMenuValue {
  include: readonly EventParticipation[]
  exclude: readonly EventParticipation[]
}

export default function ParticipantsMenu({
  value,
  onChange,
}: {
  value: ParticipationMenuValue
  onChange: (newValue: ParticipationMenuValue) => void
}): JSX.Element {
  const { t, i18n } = useTranslation()

  const handleDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return
    }

    const { source, destination } = result

    if (source.droppableId !== 'include' && source.droppableId !== 'exclude') {
      return
    }

    if (
      !isCorrectDraggableLocation(source, ['include', 'exclude']) ||
      !isCorrectDraggableLocation(destination, ['include', 'exclude'])
    ) {
      return
    }

    onChange(
      reorderItemMap({
        itemMap: value,
        source,
        destination,
        transformItem: (item) => {
          if (source.droppableId === 'exclude' && destination.droppableId === 'include') {
            // Moving an item from 'exclude' list to 'include' list

            return { ...item, time: 15 }
          }

          return item
        },
      })
    )
  }

  // TODO: This function (and some related) produces a noticeable lag as it causes all components to re-render.
  // Perhaps the whole situation could be improved with `useReducer()` hook?
  const handleTimeUpdate = (participationId: string, time: number): void => {
    onChange(
      produce(value, (draft) => {
        const index = draft.include.findIndex((participation) => participation.id === participationId)

        if (index === -1) {
          return
        }

        draft['include'][index].time = time
      })
    )
  }

  const totalTimeMinutes = value['include'].reduce((prev, current) => prev + (current.time || 0), 0)
  const totalTimeText = durationToSentence({
    duration: dayjs.duration({ minutes: totalTimeMinutes }),
    parts: ['hour', 'minute'],
    t,
    intlLocale: i18nLanguageToIntlLocale(i18n.language),
  })

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
          {t('common.participants')}
        </Typography>

        <ParticipantsTable items={value['include']} onItemUpdate={handleTimeUpdate} />

        {value['include'].length > 0 ? (
          <Typography sx={{ my: 2 }} align='right'>
            {t('common.totalTimeX', { totalTimeText })}
          </Typography>
        ) : null}

        <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
          {t('common.others')}
        </Typography>

        <OthersTable items={value['exclude']} />
      </DragDropContext>
    </>
  )
}
