import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const outDir = mode === 'production' ? 'build/prod' : 'build/dev'

  return {
    plugins: [
      react(),
      viteSingleFile(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'script',
        srcDir: 'src',
        filename: 'firmou-worker.js',
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
          inlineWorkboxRuntime: true,
          additionalManifestEntries: [
            { url: 'index.html', revision: `${Date.now()}` }
          ]
        }
      })
    ],
    build: {
      outDir: outDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/firmou-[name].js',
          assetFileNames: 'assets/firmou-[name].[ext]'
        }
      }
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: []
    }
  }
})
