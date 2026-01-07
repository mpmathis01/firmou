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
      injectRegister: 'script', // Vamos usar script para controlar o nome do arquivo
      srcDir: 'src',
      filename: 'firmou-worker.js', // Renomeia sw.js para firmou-worker.js
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
      },
      workbox: {
        // Isso tenta agrupar os arquivos auxiliares do workbox para evitar nomes genéricos
        inlineWorkboxRuntime: true,
        swDest: 'firmou-worker.js'
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // Força nomes fixos para qualquer pedaço extra de código
        chunkFileNames: 'assets/firmou-[name].js',
        assetFileNames: 'assets/firmou-[name].[ext]'
      }
    }
  }
})
