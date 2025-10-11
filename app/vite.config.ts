import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    outDir: path.resolve("../amd/build"),
    sourcemap: true,
    lib: {
      entry: path.resolve("./src/main.ts"),
      name: "cohort-manager-app",
      fileName: "app.min"
    },
    rollupOptions: {
      external: [
        "core/config",
        "core/ajax",
        "core/str",
        "core/notification",
        "core/toast",
      ],
      output: {
        format: 'amd',
        amd: {
          id: 'tool_cohortmanager/app'
        },
      }
    }
  }
})
