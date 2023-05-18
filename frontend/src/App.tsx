import dayjs from 'dayjs'
import 'dayjs/locale/lt'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'

import AppThemeProvider from './components/AppTheme/AppTheme'
import i18n from './i18n'
import router from './router'

dayjs.extend(relativeTime)
dayjs.extend(duration)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

declare global {
  interface Window {
    // This variable is for debugging from browser's console, ts is unnecessary here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vtjmk: any
  }
}

if (!import.meta.env.PROD) {
  // console.log('import.meta.env: ', import.meta.env)

  window.vtjmk = {}

  window.vtjmk.dayjs = dayjs

  console.log('React QueryClient is accessible from this console with `vtjmk.queryClient`')
  window.vtjmk.queryClient = queryClient
}

function App(): JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppThemeProvider>
    </I18nextProvider>
  )
}

export default App
