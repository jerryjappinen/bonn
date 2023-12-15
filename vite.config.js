import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue()
  ],
  test: {
    environment: 'happy-dom',
    testTimeout: 30 * 1000,

    server: {
      deps: {
        inline: [
          'prism-es6'
        ]
      }
    }
  }
})
