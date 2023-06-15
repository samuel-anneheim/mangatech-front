import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // Here
    strictPort: true,
    port: 80, 
    proxy: {
      '/api': {
        target: 'http://20.19.69.214:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
 },
 server: {
   watch: {
    usePolling: true,
   },
   host: true, // Here
   strictPort: true,
   port: 80, 
   proxy: {
     '/api': {
       target: 'http://20.19.69.214:8080/',
       changeOrigin: true,
       secure: false,
       rewrite: (path) => path.replace(/^\/api/, '')
     }
   }
 }
})
