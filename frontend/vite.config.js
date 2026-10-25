import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],

  build: {
    rollupOptions: {
      external: ['@tailwindcss/oxide', '@tailwindcss/oxide-win32-x64-msvc']
    }
  },

  optimizeDeps: {
    exclude: ['@tailwindcss/oxide', '@tailwindcss/oxide-win32-x64-msvc']
  },

   resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
