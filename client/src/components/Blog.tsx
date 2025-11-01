import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import type { PostMetadata, PostsByYear } from 'shared/dist';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export function PostList() {
	const [posts, setPosts] = useState<PostMetadata[]>([]);
	const [postsByYear, setPostsByYear] = useState<PostsByYear>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(`${SERVER_URL}/api/posts`);
				
				if (!response.ok) {
					throw new Error('Failed to fetch posts');
				}
				
				const data = await response.json();
				setPosts(data.posts);
				setPostsByYear(data.postsByYear);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching posts:', err);
				setError('Não foi possível carregar os posts');
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

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
				<div className="text-center">Nenhum post disponível.</div>
			</div>
		);
	}

	// Ordena os anos em ordem decrescente
	const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<h1 className="text-4xl font-bold mb-8">Blog</h1>
			
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
								
								<div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
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
											<span 
												key={tag}
												className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
											>
												#{tag}
											</span>
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