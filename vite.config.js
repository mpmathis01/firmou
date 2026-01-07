import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      manifest: {
        name: 'Firmou',
        short_name: 'Firmou',
        description: 'SaaS Firmou',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
