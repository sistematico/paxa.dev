import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const dev = process.env.NODE_ENV !== 'production'
const port = dev ? 3000 : 8080

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:${port}`,
				changeOrigin: true
			}
		}
	}
});
