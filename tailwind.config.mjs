/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'paxa-fg': '#F3EEEA',
        'paxa-bg': '#776B5D'
      },
		},
	},
	plugins: [],
}