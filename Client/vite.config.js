import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy configuration
      '/api': {
        target: 'https://asylum-backend.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')}}}
        ,
  plugins: [react()],
  
})
