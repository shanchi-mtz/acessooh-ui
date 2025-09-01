// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/acessooh-ui/', // 👈 garante que o GitHub Pages funcione sem mexer no index.html
})
