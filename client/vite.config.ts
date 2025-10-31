import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const port = Number(process.env.VITE_APP_PORT!)

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
