import vue from '@vitejs/plugin-vue'
import viteSSR from 'vite-ssr/plugin.js'

export default {
  plugins: [
    viteSSR(),
    vue(),
  ],
}