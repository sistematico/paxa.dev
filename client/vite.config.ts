import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'

const port = process.env.NODE_ENV === 'production' ? 8080 : 3000

export default defineConfig({
	plugins: [react(), tailwindcss(), mdx()],
	server: {
		proxy: {
			'/api': {
				target: `http://localhost:${port}`,
				changeOrigin: true
			}
		}
	}
});
