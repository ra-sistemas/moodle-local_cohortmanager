import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    emptyOutDir: false,
    outDir: path.resolve("../amd/build/app"),
    sourcemap: true,
    lib: {
      entry: path.resolve("./src/main.ts"),
      name: "app",
      fileName: "app-lazy.min",
    },
    rollupOptions: {
      external: [
        "core/config",
        "core/ajax",
        "core/str",
        "core/localstorage",
        "core/notification",
        "core/toast",
        "tool_lfxp/ajax",
      ],
      output: {
        format: 'amd',
        amd: {
          id: 'local_cohortmanager/app/app-lazy' // ID do módulo AMD
        },
        entryFileNames: 'app-lazy.min.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        globals: {
          "core/config": "core.config",
          "core/ajax": "core.ajax",
          "core/str": "core.str",
          "core/localstorage": "core.localstorage",
          "core/notification": "core.notification",
          "core/toast": "core.toast",
          "tool_lfxp/ajax": "tool_lfxp.ajax"
        }
      }
    },

  },
})
