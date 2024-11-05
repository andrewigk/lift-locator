import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    port: 5173,
  },
  server: {
    host: true,
    port: 5173,
    origin: 'http://0.0.0.0:5173', // Make sure this matches your exposed port
  },
})
