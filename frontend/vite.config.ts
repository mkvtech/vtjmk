import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (
            id.includes('@mui/material') ||
            id.includes('@mui/lab') ||
            id.includes('@mui/icons-material') ||
            id.includes('@mui/x-date-pickers')
          ) {
            return 'vendor_mui'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
