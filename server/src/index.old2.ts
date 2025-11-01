import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import path from 'node:path'
import type { ApiResponse, PostsIndexResponse } from 'shared/dist'
import { indexPosts, getPostBySlug, getFullPost } from './lib/post'

const port = Number(process.env.PORT)

const app = new Hono()

app.use(cors())

app.get('/', (c) => c.text('Paxá API'))

app.get('/hello', async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }
  return c.json(data, { status: 200 })
})

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
  
  console.log(`[API] Fetching content for slug: ${slug}`);
  console.log(`[API] Posts directory: ${postsDirectory}`);
  
  try {
    const result = await getFullPost(postsDirectory, slug);
    
    if (!result) {
      console.log(`[API] Post not found: ${slug}`);
      return c.json({ message: 'Post not found' }, 404);
    }
    
    console.log(`[API] Post found: ${result.post.title}`);
    
    return c.json({ 
      post: result.post,
      content: result.content
    });
  } catch (err) {
    console.error('[API] Error fetching post content:', err);
    return c.json({ message: 'Error fetching post' }, 500);
  }
});

app.use("*", serveStatic({ root: "./static" }));
 
app.get("*", async (c, next) => {
  return serveStatic({ root: "./static", path: "index.html" })(c, next);
});
 
export default {
  port,
  fetch: app.fetch,
};
 
console.log(`🦫 bhvr server running on port ${port}`);