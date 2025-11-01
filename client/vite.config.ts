import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'


const dev = process.env.NODE_ENV !== 'production'
const port = process.env.NODE_ENV === 'production' ? 8080 : 3000

export default defineConfig({
	plugins: [react(), tailwindcss(), mdx()],
	server: {
		host: dev ? '0.0.0.0' : 'localhost',
		proxy: {
			'/api': {
				target: `http://localhost:${port}`,
				changeOrigin: true
			}
		}
	}
});
