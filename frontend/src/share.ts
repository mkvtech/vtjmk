export type VtjmkLocale = 'en-US' | 'lt'

// Note: Extend this function when new locales/languages are added
export function i18nLanguageToVtjmkLocale(i18nLanguage: string): VtjmkLocale {
  return i18nLanguage === 'lt' ? 'lt' : 'en-US'
}
