import { Hono } from "hono"
import {
  getSiteStats,
  getPostStats,
  hasUserLikedPost,
  trackPostView,
  togglePostLike,
  getPopularPosts
} from "../lib/analytics"

const app = new Hono()

// ==================== ANALYTICS ====================

// Estatísticas globais do site
app.get("/stats", async (c) => {
  try {
    const stats = await getSiteStats()
    return c.json(stats)
  } catch (err) {
    console.error("Error fetching site stats:", err)
    return c.json({ message: "Error fetching stats" }, 500)
  }
})

// Estatísticas de um post específico
app.get("/posts/:slug/stats", async (c) => {
  const slug = c.req.param("slug")
  const visitorId = c.req.header("visitorid")

  try {
    const stats = await getPostStats(slug)
    const hasLiked = visitorId ? await hasUserLikedPost(slug, visitorId) : false

    return c.json({
      ...stats,
      hasLiked
    })
  } catch (err) {
    console.error("Error fetching post stats:", err)
    return c.json({ message: "Error fetching post stats" }, 500)
  }
})

// Registrar visualização de post
app.post("/posts/:slug/view", async (c) => {
  const slug = c.req.param("slug")
  const visitorId = c.req.header("visitorid")

  try {
    if (!visitorId) {
      return c.json({ message: "Missing visitorId" }, 400)
    }
    await trackPostView(slug, visitorId)
    const stats = await getPostStats(slug)
    return c.json({ success: true, stats })
  } catch (err) {
    console.error("Error tracking post view:", err)
    return c.json({ message: "Error tracking view" }, 500)
  }
})

// Curtir/descurtir post
app.post("/posts/:slug/like", async (c) => {
  const slug = c.req.param("slug")
  const visitorId = c.req.header("visitorid")

  if (!visitorId) {
    return c.json({ message: "Missing visitorId" }, 400)
  }

  try {
    const result = await togglePostLike(slug, visitorId)
    return c.json(result)
  } catch (err) {
    console.error("Error toggling post like:", err)
    return c.json({ message: "Error toggling like" }, 500)
  }
})

// Posts mais populares
app.get("/posts/popular", async (c) => {
  const limit = Number(c.req.query("limit")) || 10

  try {
    const posts = await getPopularPosts(limit)
    return c.json({ posts })
  } catch (err) {
    console.error("Error fetching popular posts:", err)
    return c.json({ message: "Error fetching popular posts" }, 500)
  }
})

export { app as analyticsRoutes }
