import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { Duration } from 'dayjs/plugin/duration'
import { TFunction } from 'i18next'

export type VtjmkLocale = 'en-US' | 'lt'

// Note: Extend this function when new locales/languages are added
export function i18nLanguageToVtjmkLocale(i18nLanguage: string): VtjmkLocale {
  return i18nLanguage === 'lt' ? 'lt' : 'en-US'
}

export function i18nLanguageToDayjsLocale(i18nLanguage: string): string {
  return i18nLanguage === 'lt' ? 'lt' : 'en'
}

export function i18nLanguageToIntlLocale(i18nLanguage: string): string {
  return i18nLanguage === 'lt' ? 'lt' : 'en'
}

// https://stackoverflow.com/a/23054920
const contentDispositionHeaderFilenameRegex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/
export function contentDispositionToFilename(contentDispositionHeaderValue: string): string | null {
  const matchResult = contentDispositionHeaderValue.match(contentDispositionHeaderFilenameRegex)
  return matchResult ? matchResult[1] : null
}

type DurationToSentencePart = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'

const timeUnitToI18nKey = {
  millisecond: 'common.xMillisecondsWithCount',
  second: 'common.xSecondsWithCount',
  minute: 'common.xMinutesWithCount',
  hour: 'common.xHoursWithCount',
  day: 'common.xDaysWithCount',
  month: 'common.xMonthsWithCount',
  year: 'common.xYearsWithCount',
}

export function durationToSentence({
  duration: inputDuration,
  parts,
  t,
  intlLocale,
}: {
  duration: Duration
  parts: readonly DurationToSentencePart[]
  t: TFunction
  intlLocale: string
}): string {
  // Note: Need to fix dayjs duration instance
  // Similar bug explained here: https://observablehq.com/@guypursey/dayjs-diff-and-duration-workaround
  const duration = dayjs.duration(inputDuration.asMilliseconds())

  const sentenceParts = parts.reduce<readonly string[]>((prev, timeUnit) => {
    const count = duration.get(timeUnit)
    // const count = duration[timeUnit]

    if (count === 0) {
      return prev
    }

    const i18nKey = timeUnitToI18nKey[timeUnit]
    const countWithTimeUnitText = t(i18nKey, { count })

    return [...prev, countWithTimeUnitText]
  }, [])

  const listFormat = new Intl.ListFormat(intlLocale)

  return listFormat.format(sentenceParts)
}

// Used in react-i18next's <Trans /> component ONLY
// https://github.com/i18next/react-i18next/issues/1483#issuecomment-1268455602
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TI = any

export function downloadFromData({ data, filename }: { data: Blob; filename?: string | null | undefined }): void {
  // Note: This is a 'hacky' solution for downloading files using AJAX but it seems to be popular:
  // https://stackoverflow.com/questions/41938718/how-to-download-files-using-axios
  // https://medium.com/yellowcode/download-api-files-with-react-fetch-393e4dae0d9e

  const href = URL.createObjectURL(data)
  const link = document.createElement('a')
  link.href = href
  link.setAttribute('download', filename || 'file.docx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(href)

  // A better solution would be to create a resource on the server, get URL to file from the response, then make
  // user download the file using traditional link (or click the link automatically)

  // Pros:
  // - not hacky, not manipulating the dom unnecessarily
  // - browser's JS runtime does not hold file data in memory
  // - `generate` endpoint can return JSON object, errors or metadata
  // Cons:
  // - server has to create a DB record
  // - server has to cleanup generated files after they were downloaded (or every X minutes)
}

export function downloadFromResponse(response: AxiosResponse): void {
  const { data } = response
  const filename = contentDispositionToFilename(response.headers['content-disposition'])

  downloadFromData({ data, filename })
}
