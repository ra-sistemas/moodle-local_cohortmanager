// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import path from "node:path";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  mode: "production",
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  define: {
    "process.env": {},
  },

  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        logger: {
          warn: () => {},
        },
      },
    },
  },

  build: {
    emptyOutDir: false,
    outDir: path.resolve("../amd/build/app"),
    sourcemap: true,

    lib: {
      entry: path.resolve("./src/main.js"),
      name: "app",
      formats: ["amd"],
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

      preserveEntrySignatures: "strict",

      output: {
        format: "amd",
        sourcemap: true,
        manualChunks: false,
        inlineDynamicImports: true,
        entryFileNames: "app-lazy.min.js",
        assetFileNames: "[name].[ext]",
        amd: {
          id: "local_offermanager/app/app-lazy",
        },

        globals: {
          "core/config": "Config",
          "core/str": "Str",
          "core/ajax": "Ajax",
          "core/notification": "Notification",
          "core/toast": "Toast",
          "tool_lfxp/ajax": "LfxpAjax",
        },
      },
    },
  },
  server: {
    port: 3000,
  },
});