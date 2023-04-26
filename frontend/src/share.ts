export type VtjmkLocale = 'en-US' | 'lt'

// Note: Extend this function when new locales/languages are added
export function i18nLanguageToVtjmkLocale(i18nLanguage: string): VtjmkLocale {
  return i18nLanguage === 'lt' ? 'lt' : 'en-US'
}

export function i18nLanguageToDayjsLocale(i18nLanguage: string): string {
  return i18nLanguage === 'lt' ? 'lt' : 'en'
}

// https://stackoverflow.com/a/23054920
const contentDispositionHeaderFilenameRegex = /filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/
export function contentDispositionToFilename(contentDispositionHeaderValue: string): string | null {
  const matchResult = contentDispositionHeaderValue.match(contentDispositionHeaderFilenameRegex)
  return matchResult ? matchResult[1] : null
}
