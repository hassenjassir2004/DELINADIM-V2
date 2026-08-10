// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // 🔑 SOLUCIÓN AÑADIDA: Establece la ruta base como la raíz del dominio
  base: '/', 
})