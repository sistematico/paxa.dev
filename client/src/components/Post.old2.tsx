import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PostMetadata } from 'shared/dist';

const SERVER_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Post() {
	const { slug } = useParams();
	const [post, setPost] = useState<PostMetadata | null>(null);
	const [content, setContent] = useState<string>('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			if (!slug) return;

			try {
				const response = await fetch(`${SERVER_URL}/api/posts/${slug}/content`);
				
				if (!response.ok) {
					throw new Error('Post not found');
				}
				
				const data = await response.json();
				setPost(data.post);
				setContent(data.content);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching post:', err);
				setError('Post não encontrado');
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug]);

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Carregando...</div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center text-red-500 mb-4">{error}</div>
				<div className="text-center">
					<Link to="/posts" className="text-blue-400 hover:underline">
						← Voltar para o blog
					</Link>
				</div>
			</div>
		);
	}

	// Remove o frontmatter do conteúdo para exibição
	const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<Link 
				to="/posts" 
				className="inline-flex items-center gap-2 text-blue-400 hover:underline mb-8"
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					className="h-4 w-4" 
					fill="none" 
					viewBox="0 0 24 24" 
					stroke="currentColor"
				>
					<title>Voltar</title>
					<path 
						strokeLinecap="round" 
						strokeLinejoin="round" 
						strokeWidth={2} 
						d="M15 19l-7-7 7-7" 
					/>
				</svg>
				Voltar para o blog
			</Link>

			<article>
				<header className="mb-8">
					<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
					
					<div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
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
					
					{post.tags && post.tags.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-6">
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
					
					{post.excerpt && (
						<p className="text-lg text-gray-300 italic border-l-4 border-gray-700 pl-4">
							{post.excerpt}
						</p>
					)}
				</header>

				<div className="prose prose-invert prose-lg max-w-none">
					<ReactMarkdown 
						remarkPlugins={[remarkGfm]}
						components={{
							h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
							h2: (props) => <h2 className="text-2xl font-bold mb-3 mt-6" {...props} />,
							h3: (props) => <h3 className="text-xl font-bold mb-2 mt-4" {...props} />,
							p: (props) => <p className="mb-4" {...props} />,
							code: (props) => {
								const { className } = props;
								const isInline = !className;
								
								return isInline ? (
									<code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
								) : (
									<code className="block bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
								);
							},
							pre: (props) => <pre className="mb-4 overflow-x-auto" {...props} />,
							ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
							ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
							li: (props) => <li className="ml-4" {...props} />,
							blockquote: (props) => (
								<blockquote className="border-l-4 border-gray-700 pl-4 italic my-4" {...props} />
							),
							a: (props) => (
								<a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
							),
						}}
					>
						{contentWithoutFrontmatter}
					</ReactMarkdown>
				</div>
			</article>
		</div>
	);
}

export default Post;