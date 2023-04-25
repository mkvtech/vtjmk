import { Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

export default function SpanCreatedAt({ date }: { date: Date }): JSX.Element {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <Tooltip title={Intl.DateTimeFormat(language, { dateStyle: 'long', timeStyle: 'long' }).format(date)}>
      <Typography component='span' color='textSecondary'>
        {dayjs(date).fromNow()}
      </Typography>
    </Tooltip>
  )
}
