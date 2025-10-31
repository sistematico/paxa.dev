import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'

const port = Number(process.env.PORT)

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', async (c) => {

  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true
  }

  return c.json(data, { status: 200 })
})

app.use("*", serveStatic({ root: "./static" }));
 
app.get("*", async (c, next) => {
  return serveStatic({ root: "./static", path: "index.html" })(c, next);
});
 
export default {
  port,
  fetch: app.fetch,
};
 
console.log(`🦫 bhvr server running on port ${port}`);
