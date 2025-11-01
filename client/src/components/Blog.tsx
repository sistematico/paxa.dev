import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { PostMetadata, PostsByYear } from 'shared/dist';
import { Tag as TagIcon } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL!;

export function PostList() {
	const [posts, setPosts] = useState<PostMetadata[]>([]);
	const [postsByYear, setPostsByYear] = useState<PostsByYear>({});
	const [allTags, setAllTags] = useState<string[]>([]);
	const [tagCounts, setTagCounts] = useState<Record<string, number>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedTag = searchParams.get('tag');

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Buscar tags
				const tagsResponse = await fetch(`${apiUrl}/posts/tags/all`);
				if (tagsResponse.ok) {
					const tagsData = await tagsResponse.json();
					setAllTags(tagsData.tags);
					setTagCounts(tagsData.tagCounts);
				}

				// Buscar posts (filtrados por tag se selecionada)
				const postsUrl = selectedTag 
					? `${apiUrl}/posts/tag/${selectedTag}`
					: `${apiUrl}/posts`;
				
				const response = await fetch(postsUrl);
				
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				
				const data = await response.json();
				
				if (selectedTag) {
					// Quando filtrando por tag, reorganizar por ano
					const filteredPosts = data.posts;
					const byYear: PostsByYear = {};
					
					filteredPosts.forEach((post: PostMetadata) => {
						const year = new Date(post.date).getFullYear().toString();
						if (!byYear[year]) {
							byYear[year] = [];
						}
						byYear[year].push(post);
					});
					
					setPosts(filteredPosts);
					setPostsByYear(byYear);
				} else {
					setPosts(data.posts);
					setPostsByYear(data.postsByYear);
				}
				
				setLoading(false);
			} catch (err) {
				console.error('Error fetching posts:', err);
				setError('Não foi possível carregar os posts');
				setLoading(false);
			}
		};

		fetchData();
	}, [selectedTag]);

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
				<div className="text-center">Carregando posts...</div>
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

	if (!posts || posts.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">
					{selectedTag ? (
						<>
							<p className="mb-4">Nenhum post encontrado com a tag "{selectedTag}".</p>
							<button
								type="button"
								onClick={() => setSearchParams({})}
								className="text-blue-400 hover:underline"
							>
								Ver todos os posts
							</button>
						</>
					) : (
						'Nenhum post disponível.'
					)}
				</div>
			</div>
		);
	}

	const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-4">Blog</h1>
				
				{/* Filtro de Tags */}
				{allTags.length > 0 && (
					<div className="mb-6">
						<div className="flex items-center gap-2 mb-3">
							<TagIcon size={18} className="text-gray-400" />
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
								Todas ({posts.length})
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
							Mostrando <span className="font-semibold">{posts.length}</span> post(s) com a tag{' '}
							<span className="font-semibold text-blue-400">#{selectedTag}</span>
						</p>
					</div>
				)}
			</div>
			
			{years.map((year) => (
				<div key={year} className="mb-12">
					<h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-700 pb-2">
						{year}
					</h2>
					
					<div className="space-y-6">
						{postsByYear[year].map((post) => (
							<article key={post.slug} className="border-l-4 border-gray-700 pl-4 py-2">
								<Link 
									to={`/post/${post.slug}`}
									className="group"
								>
									<h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
										{post.title}
									</h3>
								</Link>
								
								<div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
									<time dateTime={post.date}>
										{new Date(post.date).toLocaleDateString('pt-BR', {
											day: '2-digit',
											month: 'long',
											year: 'numeric'
										})}
									</time>
									
									{post.author && (
										<span>por {post.author}</span>
									)}
								</div>
								
								{post.excerpt && (
									<p className="text-gray-300 mb-3">
										{post.excerpt}
									</p>
								)}
								
								{post.tags && post.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<button
												key={tag}
												type="button"
												onClick={(e) => {
													e.preventDefault();
													handleTagClick(tag);
												}}
												className={`text-xs px-2 py-1 rounded transition-colors ${
													selectedTag === tag
														? 'bg-blue-600 text-white'
														: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
												}`}
											>
												#{tag}
											</button>
										))}
									</div>
								)}
							</article>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default PostList;