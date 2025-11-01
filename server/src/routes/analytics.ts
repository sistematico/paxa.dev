import { Hono } from 'hono';
import { db } from '../db';
import { siteVisits, postViews } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

const app = new Hono();

/**
 * POST /api/analytics/pageview
 * Rastreia uma pageview vinda do cliente
 */
app.post('/pageview', async (c) => {
  try {
    const visitorId = c.req.header('visitorid');
    const { path } = await c.req.json();

    if (!visitorId || !path) {
      return c.json({ error: 'Invalid request' }, 400);
    }

    console.log(`📊 Pageview tracked: ${path} - Visitor: ${visitorId.slice(0, 8)}...`);

    // Verifica se o visitante já existe
    const existing = await db.select()
      .from(siteVisits)
      .where(eq(siteVisits.visitorId, visitorId))
      .limit(1);

    if (existing.length > 0) {
      // Atualiza visitante existente
      await db.update(siteVisits)
        .set({
          totalHits: sql`${siteVisits.totalHits} + 1`,
          lastVisit: new Date(),
        })
        .where(eq(siteVisits.visitorId, visitorId));
    } else {
      // Cria novo visitante
      await db.insert(siteVisits).values({
        visitorId,
        totalHits: 1,
        firstVisit: new Date(),
        lastVisit: new Date(),
      });
    }

    // Se for um post, registra a visualização
    const postMatch = path.match(/^\/post\/(.+)$/);
    if (postMatch) {
      const slug = postMatch[1];
      
      // Verifica se já visualizou este post
      const existingView = await db.select()
        .from(postViews)
        .where(
          sql`${postViews.postSlug} = ${slug} AND ${postViews.visitorId} = ${visitorId}`
        )
        .limit(1);

      if (existingView.length === 0) {
        // Registra nova visualização
        await db.insert(postViews).values({
          postSlug: slug,
          visitorId,
          viewedAt: new Date(),
        });
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking pageview:', error);
    return c.json({ error: 'Failed to track pageview' }, 500);
  }
});

/**
 * POST /api/analytics/event
 * Rastreia um evento customizado
 */
app.post('/event', async (c) => {
  try {
    const visitorId = c.req.header('visitorid');
    const { event, data, path } = await c.req.json();

    if (!visitorId || !event) {
      return c.json({ error: 'Invalid request' }, 400);
    }

    console.log(`📊 Event tracked: ${event}`, { path, data });

    // Aqui você pode salvar eventos customizados em uma tabela separada
    // Por enquanto, apenas loga

    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return c.json({ error: 'Failed to track event' }, 500);
  }
});

export { app as analyticsRoutes };