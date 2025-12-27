import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@mdx-js/rollup"

const dev = process.env.NODE_ENV !== "production"
const port = dev ? 8082 : 3000

export default defineConfig({
  plugins: [react(), tailwindcss(), mdx()],
  build: {
    // Reduz o uso de memória durante o build
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: undefined // Desabilita chunking automático para economizar memória
      }
    },
    // Reduz o paralelismo para economizar memória
    commonjsOptions: {
      transformMixedEsModules: true
    },
    // Reduce sourcemap overhead
    sourcemap: false,
    // Reduce chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  server: {
    host: dev ? "0.0.0.0" : "localhost",
    proxy: {
      "/api": {
        target: `http://localhost:${port}`,
        changeOrigin: true
      }
    }
  }
})
