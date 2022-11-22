import path from 'node:path'

import { defineConfig } from "vite"
import vuePlugin from "@vitejs/plugin-vue"
import analyzer from "rollup-plugin-analyzer";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src/theme"),
    },
  },
  plugins: [
    vuePlugin(),
    analyzer({ summaryOnly: true }),
  ],
})
