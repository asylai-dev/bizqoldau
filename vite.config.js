import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — сайт можно положить на любой хостинг, в том числе в подпапку.
export default defineConfig({
  plugins: [react()],
  base: './',
})
