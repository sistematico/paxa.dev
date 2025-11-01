import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import type { SnippetMetadata, SnippetsByCategory } from 'shared/dist';
import { Code2, Tag } from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export function Snippets() {
	const [snippets, setSnippets] = useState<SnippetMetadata[]>([]);
	const [snippetsByCategory, setSnippetsByCategory] = useState<SnippetsByCategory>({});
	const [categories, setCategories] = useState<string[]>([]);
	const [activeCategory, setActiveCategory] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

	useEffect(() => {
		const fetchSnippets = async () => {
			try {
				const response = await fetch(`${SERVER_URL}/api/snippets`);
				
				if (!response.ok) {
					throw new Error('Failed to fetch snippets');
				}
				
				const data = await response.json();
				setSnippets(data.snippets);
				setSnippetsByCategory(data.snippetsByCategory);
				setCategories(data.categories);
				
				if (data.categories.length > 0) {
					setActiveCategory(data.categories[0]);
				}
				
				setLoading(false);
			} catch (err) {
				console.error('Error fetching snippets:', err);
				setError('Não foi possível carregar os snippets');
				setLoading(false);
			}
		};

		fetchSnippets();
	}, []);

	// Scrollspy effect
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150; // offset para o header

			for (const category of categories) {
				const element = categoryRefs.current[category];
				if (element) {
					const { offsetTop, offsetHeight } = element;
					
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveCategory(category);
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Check initial position

		return () => window.removeEventListener('scroll', handleScroll);
	}, [categories]);

	const scrollToCategory = (category: string) => {
		const element = categoryRefs.current[category];
		if (element) {
			const offset = 100; // offset para o header fixo
			const elementPosition = element.offsetTop - offset;
			window.scrollTo({
				top: elementPosition,
				behavior: 'smooth'
			});
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Carregando snippets...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center text-red-500">{error}</div>
			</div>
		);
	}

	if (!snippets || snippets.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Nenhum snippet disponível.</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex gap-8">
				{/* Sidebar com navegação de categorias */}
				<aside className="hidden lg:block w-64 shrink-0">
					<div className="sticky top-24">
						<h2 className="text-xl font-bold mb-4 flex items-center gap-2">
							<Code2 size={20} />
							Categorias
						</h2>
						<nav className="space-y-1">
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => scrollToCategory(category)}
									className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
										activeCategory === category
											? 'bg-gray-800 text-white font-semibold border-l-4 border-blue-500'
											: 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
									}`}
								>
									{category}
									<span className="ml-2 text-xs opacity-60">
										({snippetsByCategory[category]?.length || 0})
									</span>
								</button>
							))}
						</nav>
					</div>
				</aside>

				{/* Conteúdo principal */}
				<main className="flex-1 min-w-0">
					<div className="mb-8">
						<h1 className="text-4xl font-bold mb-2">Snippets</h1>
						<p className="text-gray-400">
							Coleção de {snippets.length} snippets de código úteis
						</p>
					</div>

					{/* Navegação mobile */}
					<div className="lg:hidden mb-6 overflow-x-auto">
						<div className="flex gap-2 pb-2">
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => scrollToCategory(category)}
									className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
										activeCategory === category
											? 'bg-gray-800 text-white font-semibold'
											: 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Lista de snippets por categoria */}
					{categories.map((category) => (
						<section
							key={category}
							ref={(el) => { categoryRefs.current[category] = el; }}
							className="mb-16 scroll-mt-24"
							id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
						>
							<h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-700 pb-2">
								{category}
							</h2>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{snippetsByCategory[category]?.map((snippet) => (
									<article 
										key={snippet.slug}
										className="border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-gray-900/50"
									>
										<div className="flex items-start justify-between gap-3 mb-3">
											<h3 className="text-lg font-semibold flex-1">
												{snippet.title}
											</h3>
											<span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded shrink-0">
												{snippet.language}
											</span>
										</div>
										
										{snippet.description && (
											<p className="text-sm text-gray-400 mb-4 line-clamp-2">
												{snippet.description}
											</p>
										)}
										
										{snippet.tags && snippet.tags.length > 0 && (
											<div className="flex flex-wrap gap-2 mb-4">
												{snippet.tags.map((tag) => (
													<span 
														key={tag}
														className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded flex items-center gap-1"
													>
														<Tag size={10} />
														{tag}
													</span>
												))}
											</div>
										)}
										
										<button
											type="button"
											className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors"
										>
											Ver código
											<svg 
												xmlns="http://www.w3.org/2000/svg" 
												className="h-4 w-4" 
												fill="none" 
												viewBox="0 0 24 24" 
												stroke="currentColor"
											>
												<title>Seta</title>
												<path 
													strokeLinecap="round" 
													strokeLinejoin="round" 
													strokeWidth={2} 
													d="M9 5l7 7-7 7" 
												/>
											</svg>
										</button>
									</article>
								))}
							</div>
						</section>
					))}
				</main>
			</div>
		</div>
	);
}

export default Snippets;