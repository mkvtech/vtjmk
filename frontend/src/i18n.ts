import i18n from 'i18next'
import I18NextHttpBackend from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .init({
    // Comment this line & reload to see missing translations
    fallbackLng: 'en',
    debug: !import.meta.env.PROD,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
