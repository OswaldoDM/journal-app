import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: '/',
    server: {
      host:'localhost',
      port: 3000
    }
  }

  if (command !== 'serve') {
    config.base = '/journal-app/'
  }

  return config
})
