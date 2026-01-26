import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '#components': path.resolve(__dirname, './src/components'),
      '#screens': path.resolve(__dirname, './src/screens'),
      '#store': path.resolve(__dirname, './src/store'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#constants': path.resolve(__dirname, './src/constants'),
      '#shared': path.resolve(__dirname, '../desktop/src/constants'), // Shared with desktop
      '#assets': path.resolve(__dirname, './public'),
    },
  },
})
