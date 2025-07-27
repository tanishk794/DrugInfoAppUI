import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // allows external access
    port: process.env.PORT || 4173, // lets Render bind to the correct port
    allowedHosts: ['druginfoappui-1.onrender.com'], // your Render domain
  },
})
