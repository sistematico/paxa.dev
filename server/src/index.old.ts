import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import type { ApiResponse } from 'shared/dist'

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

// Define an API endpoint to list posts
app.get('/api/posts', async (c) => {
  const postsDirectory = path.join(process.cwd(), '..', 'posts'); // Assuming posts are in a 'posts' directory in the project root
  try {
    const files = await readdir(postsDirectory);

    console.log('Read files from posts directory:', files);
    
    // Process file names into a list of post objects (e.g., extracting slug/title)
    const postList = files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx')) // Filter for relevant files
      .map(file => {
        const slug = path.parse(file).name;
        return {
          slug: slug,
          title: slug.replace(/-/g, ' '), // Simple title generation
          // Add other metadata if you parse the file content here
        };
      });

    return c.json({ posts: postList });
  } catch (err) {
    console.error('Error reading posts directory:', err);
    return c.json({ message: 'Error fetching posts' }, 500);
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
