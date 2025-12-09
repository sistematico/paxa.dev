import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === 'light') {
			root.setAttribute('data-theme', 'light');
		} else {
			root.removeAttribute('data-theme');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prev => prev === 'dark' ? 'light' : 'dark');
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg border-2 border-transparent hover:border-foreground transition-colors duration-500 cursor-pointer"
			aria-label="Alternar tema"
			title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
		>
			{theme === 'dark' ? (
				<Sun size={20} className="text-yellow-400" />
			) : (
				<Moon size={20} className="text-gray-700" />
			)}
		</button>
	);
}

export default ThemeToggle;
