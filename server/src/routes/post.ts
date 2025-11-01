import { Hono } from 'hono'
import type { PostsIndexResponse } from 'shared/dist'
import { indexPosts, getPostBySlug, getFullPost } from '../lib/post'
import path from 'node:path'

const app = new Hono();

// app.get('/', (c) => c.json('list books'))
// app.post('/', (c) => c.json('create a book', 201))
// app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

// Lista todos os posts com índice por ano
app.get('/', async (c) => {
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
app.get('/year/:year', async (c) => {
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
app.get('/:slug', async (c) => {
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
app.get('/:slug/content', async (c) => {
	const slug = c.req.param('slug');

  if (!slug) {
    return c.json({ message: 'Slug is required' }, 400);
  }

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

app.get('/tag/:tag', async (c) => {
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
app.get('/tags/all', async (c) => {
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

export { app as postRoutes };
