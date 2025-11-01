import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router';
import type { SnippetMetadata, SnippetsByCategory } from 'shared/dist';
import { Code2, Tag } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL!;

export function Snippets() {
	const [snippets, setSnippets] = useState<SnippetMetadata[]>([]);
	const [snippetsByCategory, setSnippetsByCategory] = useState<SnippetsByCategory>({});
	const [categories, setCategories] = useState<string[]>([]);
	const [allTags, setAllTags] = useState<string[]>([]);
	const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
	const [activeCategory, setActiveCategory] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedTag = searchParams.get('tag');

	const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Buscar tags
				const tagsResponse = await fetch(`${apiUrl}/snippets/tags/all`);
				if (tagsResponse.ok) {
					const tagsData = await tagsResponse.json();
					setAllTags(tagsData.tags);
					setTagCounts(tagsData.tagCounts);
				}

				// Buscar snippets (filtrados por tag se selecionada)
				const snippetsUrl = selectedTag 
					? `${apiUrl}/snippets/tag/${selectedTag}`
					: `${apiUrl}/snippets`;
				
				const response = await fetch(snippetsUrl);

				if (!response.ok) {
					throw new Error('Failed to fetch snippets');
				}

				const data = await response.json();
				
				if (selectedTag) {
					// Quando filtrando por tag, reorganizar por categoria
					const filteredSnippets = data.snippets;
					const byCategory: SnippetsByCategory = {};
					const cats = new Set<string>();
					
					filteredSnippets.forEach((snippet: SnippetMetadata) => {
						const category = snippet.category;
						cats.add(category);
						if (!byCategory[category]) {
							byCategory[category] = [];
						}
						byCategory[category].push(snippet);
					});
					
					setSnippets(filteredSnippets);
					setSnippetsByCategory(byCategory);
					setCategories(Array.from(cats).sort());
				} else {
					setSnippets(data.snippets);
					setSnippetsByCategory(data.snippetsByCategory);
					setCategories(data.categories);
				}

				if (data.categories && data.categories.length > 0) {
					setActiveCategory(data.categories[0]);
				}

				setLoading(false);
			} catch (err) {
				console.error('Error fetching snippets:', err);
				setError('Não foi possível carregar os snippets');
				setLoading(false);
			}
		};

		fetchData();
	}, [selectedTag]);

	// Scrollspy effect melhorado
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			
			// Se estiver no final da página, seleciona a última categoria
			if (windowHeight + window.scrollY >= documentHeight - 100) {
				const lastCategory = categories[categories.length - 1];
				if (lastCategory) {
					setActiveCategory(lastCategory);
				}
				return;
			}

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
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [categories]);

	const scrollToCategory = (category: string) => {
		const element = categoryRefs.current[category];
		if (element) {
			const offset = 100;
			const elementPosition = element.offsetTop - offset;
			window.scrollTo({
				top: elementPosition,
				behavior: 'smooth'
			});
		}
	};

	const handleTagClick = (tag: string) => {
		if (selectedTag === tag) {
			setSearchParams({});
		} else {
			setSearchParams({ tag });
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
				<div className="text-center">
					{selectedTag ? (
						<>
							<p className="mb-4">Nenhum snippet encontrado com a tag "{selectedTag}".</p>
							<button
								type="button"
								onClick={() => setSearchParams({})}
								className="text-blue-400 hover:underline"
							>
								Ver todos os snippets
							</button>
						</>
					) : (
						'Nenhum snippet disponível.'
					)}
				</div>
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
						<p className="text-gray-400 mb-6">
							Coleção de {snippets.length} snippets de código úteis
						</p>

						{/* Filtro de Tags */}
						{allTags.length > 0 && (
							<div className="mb-6">
								<div className="flex items-center gap-2 mb-3">
									<Tag size={18} className="text-gray-400" />
									<span className="text-sm font-semibold text-gray-400">Filtrar por tag:</span>
								</div>
								<div className="flex flex-wrap gap-2">
									<button
										type="button"
										onClick={() => setSearchParams({})}
										className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
											!selectedTag
												? 'bg-blue-600 text-white font-semibold'
												: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
										}`}
									>
										Todos ({snippets.length})
									</button>
									{allTags.map((tag) => (
										<button
											key={tag}
											type="button"
											onClick={() => handleTagClick(tag)}
											className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
												selectedTag === tag
													? 'bg-blue-600 text-white font-semibold'
													: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
											}`}
										>
											#{tag} ({tagCounts[tag] || 0})
										</button>
									))}
								</div>
							</div>
						)}

						{selectedTag && (
							<div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
								<p className="text-sm">
									Mostrando <span className="font-semibold">{snippets.length}</span> snippet(s) com a tag{' '}
									<span className="font-semibold text-blue-400">#{selectedTag}</span>
								</p>
							</div>
						)}
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
							ref={(el) => {
								categoryRefs.current[category] = el;
							}}
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
													<button
														key={tag}
														type="button"
														onClick={() => handleTagClick(tag)}
														className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
															selectedTag === tag
																? 'bg-blue-600 text-white'
																: 'bg-gray-900 text-gray-400 hover:bg-gray-800'
														}`}
													>
														<Tag size={10} />
														{tag}
													</button>
												))}
											</div>
										)}

										<Link
											to={`/snippet/${snippet.slug}`}
											className="text-sm font-medium flex items-center gap-1"
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
										</Link>
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