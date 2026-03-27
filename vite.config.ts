import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [vinext()],
  ssr: {
    external: ["better-sqlite3"],
  },
});
