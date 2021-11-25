import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import analyzer from "rollup-plugin-analyzer";

import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
      "@": resolve(__dirname, "src/theme"),
    },
  },
  plugins: [
    vue(),
    analyzer({ summaryOnly: true }),
    legacy(),
  ],
});
