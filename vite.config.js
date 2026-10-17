import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const sourceDirectory = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': sourceDirectory,
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:44327',
        changeOrigin: true,
        secure: false, // accepts self-signed .NET dev certs
      },
    },
  },
})
