import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { cors } from 'hono/cors';
import path from 'node:path';
import type {
	ApiResponse,
	PostsIndexResponse,
	SnippetsIndexResponse,
	FavoritesResponse
} from 'shared/dist';
import { indexPosts, getPostBySlug, getFullPost } from './lib/post';
import {
	indexSnippets,
	getSnippetBySlug,
	getFullSnippet
} from './lib/snippets';
import { indexFavorites, getFavoriteById } from './lib/bookmark';
import nodemailer from 'nodemailer';

const port = Number(process.env.PORT);

const app = new Hono();

app.use(cors());

app.get('/api', (c) => c.text('Paxá API'));

// app.get('/hello', async (c) => {
// 	const data: ApiResponse = {
// 		message: 'Hello BHVR!',
// 		success: true
// 	};
// 	return c.json(data, { status: 200 });
// });

app.post('/api/email', async (c) => {
	try {
		const { name, email, message } = await c.req.json();

		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: 'smtp.your-email-provider.com', // Replace with your SMTP host
			port: 587, // Or 465 for secure SSL
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'your-email@example.com', // Your email address
				pass: 'your-email-password' // Your email password or app-specific password
			}
		});

		// Define email options
		const mailOptions = {
			from: '"Your Name" <your-email@example.com>', // Sender address
			to: 'recipient@example.com', // Recipient email address
			subject: `New Message from ${name}`,
			html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
		};

		// Send the email
		await transporter.sendMail(mailOptions);

		return c.text('Email sent successfully!');
	} catch (error) {
		console.error('Error sending email:', error);
		return c.text('Failed to send email.', 500);
	}
});

// ==================== POSTS ====================

// Lista todos os posts com índice por ano
app.get('/api/posts', async (c) => {
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const { posts, postsByYear } = await indexPosts(postsDirectory);

		const response: PostsIndexResponse = {
			posts,
			postsByYear,
			total: posts.length
		};

		return c.json(response);
	} catch (err) {
		console.error('Error fetching posts:', err);
		return c.json({ message: 'Error fetching posts' }, 500);
	}
});

// Busca posts por ano específico
app.get('/api/posts/year/:year', async (c) => {
	const year = c.req.param('year');
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const { postsByYear } = await indexPosts(postsDirectory);
		const yearPosts = postsByYear[year] || [];

		return c.json({
			year,
			posts: yearPosts,
			total: yearPosts.length
		});
	} catch (err) {
		console.error('Error fetching posts by year:', err);
		return c.json({ message: 'Error fetching posts' }, 500);
	}
});

// Busca um post específico pelo slug (apenas metadata)
app.get('/api/posts/:slug', async (c) => {
	const slug = c.req.param('slug');
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const post = await getPostBySlug(postsDirectory, slug);

		if (!post) {
			return c.json({ message: 'Post not found' }, 404);
		}

		return c.json({ post });
	} catch (err) {
		console.error('Error fetching post:', err);
		return c.json({ message: 'Error fetching post' }, 500);
	}
});

// Busca o conteúdo completo de um post
app.get('/api/posts/:slug/content', async (c) => {
	const slug = c.req.param('slug');
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const result = await getFullPost(postsDirectory, slug);

		if (!result) {
			return c.json({ message: 'Post not found' }, 404);
		}

		return c.json({
			post: result.post,
			content: result.content
		});
	} catch (err) {
		console.error('Error fetching post content:', err);
		return c.json({ message: 'Error fetching post' }, 500);
	}
});

app.get('/api/posts/tag/:tag', async (c) => {
	const tag = c.req.param('tag');
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const { posts } = await indexPosts(postsDirectory);
		const tagPosts = posts.filter((post) =>
			post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
		);

		return c.json({
			tag,
			posts: tagPosts,
			total: tagPosts.length
		});
	} catch (err) {
		console.error('Error fetching posts by tag:', err);
		return c.json({ message: 'Error fetching posts' }, 500);
	}
});

// Lista todas as tags disponíveis
app.get('/api/posts/tags/all', async (c) => {
	const postsDirectory = path.join(process.cwd(), '..', 'posts');

	try {
		const { posts } = await indexPosts(postsDirectory);
		const tagsSet = new Set<string>();
		const tagCounts: Record<string, number> = {};

		posts.forEach((post) => {
			post.tags?.forEach((tag) => {
				tagsSet.add(tag);
				tagCounts[tag] = (tagCounts[tag] || 0) + 1;
			});
		});

		const tags = Array.from(tagsSet).sort();

		return c.json({
			tags,
			tagCounts,
			total: tags.length
		});
	} catch (err) {
		console.error('Error fetching tags:', err);
		return c.json({ message: 'Error fetching tags' }, 500);
	}
});

// ==================== SNIPPETS ====================

// Lista todos os snippets com índice por categoria
app.get('/api/snippets', async (c) => {
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const { snippets, snippetsByCategory, categories } =
			await indexSnippets(snippetsDirectory);

		const response: SnippetsIndexResponse = {
			snippets,
			snippetsByCategory,
			categories,
			total: snippets.length
		};

		return c.json(response);
	} catch (err) {
		console.error('Error fetching snippets:', err);
		return c.json({ message: 'Error fetching snippets' }, 500);
	}
});

// Busca snippets por categoria específica
app.get('/api/snippets/category/:category', async (c) => {
	const category = c.req.param('category');
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const { snippetsByCategory } = await indexSnippets(snippetsDirectory);
		const categorySnippets = snippetsByCategory[category] || [];

		return c.json({
			category,
			snippets: categorySnippets,
			total: categorySnippets.length
		});
	} catch (err) {
		console.error('Error fetching snippets by category:', err);
		return c.json({ message: 'Error fetching snippets' }, 500);
	}
});

// Busca um snippet específico pelo slug
app.get('/api/snippets/:slug', async (c) => {
	const slug = c.req.param('slug');
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const snippet = await getSnippetBySlug(snippetsDirectory, slug);

		if (!snippet) {
			return c.json({ message: 'Snippet not found' }, 404);
		}

		return c.json({ snippet });
	} catch (err) {
		console.error('Error fetching snippet:', err);
		return c.json({ message: 'Error fetching snippet' }, 500);
	}
});

// Busca o conteúdo completo de um snippet
app.get('/api/snippets/:slug/content', async (c) => {
	const slug = c.req.param('slug');
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const result = await getFullSnippet(snippetsDirectory, slug);

		if (!result) {
			return c.json({ message: 'Snippet not found' }, 404);
		}

		return c.json({
			snippet: result.snippet,
			content: result.content
		});
	} catch (err) {
		console.error('Error fetching snippet content:', err);
		return c.json({ message: 'Error fetching snippet' }, 500);
	}
});

app.get('/api/snippets/tag/:tag', async (c) => {
	const tag = c.req.param('tag');
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const { snippets } = await indexSnippets(snippetsDirectory);
		const tagSnippets = snippets.filter((snippet) =>
			snippet.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
		);

		return c.json({
			tag,
			snippets: tagSnippets,
			total: tagSnippets.length
		});
	} catch (err) {
		console.error('Error fetching snippets by tag:', err);
		return c.json({ message: 'Error fetching snippets' }, 500);
	}
});

// Lista todas as tags disponíveis
app.get('/api/snippets/tags/all', async (c) => {
	const snippetsDirectory = path.join(process.cwd(), '..', 'snippets');

	try {
		const { snippets } = await indexSnippets(snippetsDirectory);
		const tagsSet = new Set<string>();
		const tagCounts: Record<string, number> = {};

		snippets.forEach((snippet) => {
			snippet.tags?.forEach((tag) => {
				tagsSet.add(tag);
				tagCounts[tag] = (tagCounts[tag] || 0) + 1;
			});
		});

		const tags = Array.from(tagsSet).sort();

		return c.json({
			tags,
			tagCounts,
			total: tags.length
		});
	} catch (err) {
		console.error('Error fetching tags:', err);
		return c.json({ message: 'Error fetching tags' }, 500);
	}
});

// ==================== FAVORITES ====================

// Lista todos os favoritos com índice por categoria
app.get('/api/bookmarks', async (c) => {
	const favoritesPath = path.join(
		process.cwd(),
		'src',
		'data',
		'bookmarks.json'
	);

	try {
		const { favorites, favoritesByCategory, categories } =
			await indexFavorites(favoritesPath);

		const response: FavoritesResponse = {
			favorites,
			favoritesByCategory,
			categories,
			total: favorites.length
		};

		return c.json(response);
	} catch (err) {
		console.error('Error fetching favorites:', err);
		return c.json({ message: 'Error fetching favorites' }, 500);
	}
});

// Busca favoritos por categoria específica
app.get('/api/bookmarks/category/:category', async (c) => {
	const category = c.req.param('category');
	const favoritesPath = path.join(
		process.cwd(),
		'src',
		'data',
		'bookmarks.json'
	);

	try {
		const { favoritesByCategory } = await indexFavorites(favoritesPath);
		const categoryFavorites = favoritesByCategory[category] || [];

		return c.json({
			category,
			favorites: categoryFavorites,
			total: categoryFavorites.length
		});
	} catch (err) {
		console.error('Error fetching favorites by category:', err);
		return c.json({ message: 'Error fetching favorites' }, 500);
	}
});

// Busca um favorito específico pelo ID
app.get('/api/bookmarks/:id', async (c) => {
	const id = c.req.param('id');
	const favoritesPath = path.join(
		process.cwd(),
		'src',
		'data',
		'bookmarks.json'
	);

	try {
		const favorite = await getFavoriteById(favoritesPath, id);

		if (!favorite) {
			return c.json({ message: 'Favorite not found' }, 404);
		}

		return c.json({ favorite });
	} catch (err) {
		console.error('Error fetching favorite:', err);
		return c.json({ message: 'Error fetching favorite' }, 500);
	}
});

// ==================== STATIC FILES ====================

app.use('*', serveStatic({ root: './static' }));

app.get('*', async (c, next) => {
	return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default {
	port,
	fetch: app.fetch
};

console.log(`🦫 bhvr server running on port ${port}`);
