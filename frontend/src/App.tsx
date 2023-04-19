import { CssBaseline } from '@mui/material'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { I18nextProvider } from 'react-i18next'

import { ApiProvider } from './hooks/useApi'
import i18n from './i18n'
import router from './router'
import AppThemeProvider from './components/AppTheme/AppTheme'

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
  window.vtjmk = {}

  console.log('React QueryClient is accessible from this console with `vtjmk.queryClient`')
  window.vtjmk.queryClient = queryClient
}

function App(): JSX.Element {
  return (
    <I18nextProvider i18n={i18n}>
      <AppThemeProvider>
        <CssBaseline />

        <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <ApiProvider>
              <RouterProvider router={router} />
            </ApiProvider>
          </QueryClientProvider>
        </MuiLocalizationProvider>
      </AppThemeProvider>
    </I18nextProvider>
  )
}

export default App
