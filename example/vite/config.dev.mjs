import { defineConfig } from "vite"
import { processAssetsDev } from "pixel-tools"
import { assetsConfig } from "./assets.mjs"
import pkg from "../../package.json" with { type: "json" }

export default defineConfig({
  base: "./",
  define: {
    PHASER_PIXUI_VERSION: JSON.stringify(pkg.version),
  },
  server: {
    port: 8080,
    open: true,
  },
  plugins: [processAssetsDev(assetsConfig)],
})
