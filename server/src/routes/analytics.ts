import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { db } from '../db';
import { siteVisits, postViews, postLikes, postStats } from '../db/schema';
import { eq, and, count, sum } from 'drizzle-orm';

// Define os tipos para o contexto do Hono
type Variables = {
	visitorId: string;
};

const app = new Hono<{ Variables: Variables }>();

/**
 * POST /api/analytics/pageview
 */
app.post('/pageview', async (c) => {
	try {
		const cookie = getCookie(c, 'visitor_id');
		if (!cookie) return c.json({ error: 'Missing visitor_id cookie' }, 400);
    
    const visitorId = cookie;

		// Debug: Log do que está recebendo
		console.log('=== DEBUG PAGEVIEW ===');
		console.log('visitorId from context:', visitorId);

		let body: { path: string };
		try {
			body = await c.req.json();
			console.log('body:', body);
		} catch (e) {
			console.error('Failed to parse JSON:', e);
			return c.json({ error: 'Invalid JSON' }, 400);
		}

		const { path } = body;
		console.log('path:', path);

		if (!visitorId) {
			console.error('❌ Missing visitorId');
			return c.json({ error: 'Missing visitorId' }, 400);
		}

		if (!path) {
			console.error('❌ Missing path');
			return c.json({ error: 'Missing path' }, 400);
		}

		console.log(`📊 Pageview: ${path} | Visitor: ${visitorId.slice(0, 8)}...`);

		// Busca visitante existente
		const [existing] = await db
			.select()
			.from(siteVisits)
			.where(eq(siteVisits.visitorId, visitorId))
			.limit(1);

		if (existing) {
			// Atualiza visitante existente
			const newTotalHits = existing.totalHits + 1;
			await db
				.update(siteVisits)
				.set({
					totalHits: newTotalHits,
					lastVisit: new Date()
				})
				.where(eq(siteVisits.visitorId, visitorId));

			console.log(
				`✅ Updated visitor: ${visitorId.slice(0, 8)}... (hits: ${newTotalHits})`
			);
		} else {
			// Cria novo visitante
			await db.insert(siteVisits).values({
				visitorId,
				totalHits: 1,
				firstVisit: new Date(),
				lastVisit: new Date()
			});

			console.log(`✅ New visitor: ${visitorId.slice(0, 8)}...`);
		}

		// Se for um post, registra visualização
		const postMatch = path.match(/^\/post\/([^/?]+)/);
		if (postMatch) {
			const slug = postMatch[1];
      
      if (!slug) {
        console.error('❌ Missing post slug');
        return c.json({ error: 'Missing post slug' }, 400);
      }

			console.log(`📄 Post detected: ${slug}`);

			const existingView = await db
				.select()
				.from(postViews)
				.where(
					and(eq(postViews.postSlug, slug), eq(postViews.visitorId, visitorId))
				)
				.limit(1);

			if (existingView.length === 0) {
				await db.insert(postViews).values({
					postSlug: slug,
					visitorId,
					viewedAt: new Date()
				});

				await updatePostStats(slug);
				console.log(`✅ New post view: ${slug}`);
			} else {
				console.log(`ℹ️  Post already viewed: ${slug}`);
			}
		}

		return c.json({ success: true });
	} catch (error) {
		console.error('❌ Error tracking pageview:', error);
		return c.json(
			{ error: 'Failed to track pageview', details: String(error) },
			500
		);
	}
});

/**
 * GET /api/analytics/stats
 */
app.get('/stats', async (c) => {
	try {
		const uniqueVisitorsResult = await db
			.select({ count: count() })
			.from(siteVisits);

		const totalHitsResult = await db
			.select({ total: sum(siteVisits.totalHits) })
			.from(siteVisits);

		return c.json({
			uniqueVisitors: uniqueVisitorsResult[0]?.count || 0,
			totalHits: totalHitsResult[0]?.total || 0
		});
	} catch (error) {
		console.error('Error getting site stats:', error);
		return c.json({ error: 'Failed to get stats' }, 500);
	}
});

/**
 * GET /api/analytics/posts/:slug/stats
 */
app.get('/posts/:slug/stats', async (c) => {
	try {
		const slug = c.req.param('slug');
		const cookie = getCookie(c, 'visitor_id');
		const visitorId = cookie || undefined;

		let stats = await db
			.select()
			.from(postStats)
			.where(eq(postStats.postSlug, slug))
			.limit(1);

		if (stats.length === 0) {
			await db.insert(postStats).values({
				postSlug: slug,
				totalViews: 0,
				uniqueViews: 0,
				totalLikes: 0,
				lastUpdated: new Date()
			});

			stats = await db
				.select()
				.from(postStats)
				.where(eq(postStats.postSlug, slug))
				.limit(1);
		}

		const hasLiked = visitorId
			? (
					await db
						.select()
						.from(postLikes)
						.where(
							and(
								eq(postLikes.postSlug, slug),
								eq(postLikes.visitorId, visitorId)
							)
						)
						.limit(1)
				).length > 0
			: false;

		return c.json({
			...stats[0],
			hasLiked
		});
	} catch (error) {
		console.error('Error getting post stats:', error);
		return c.json({ error: 'Failed to get post stats' }, 500);
	}
});

/**
 * POST /api/analytics/posts/:slug/view
 */
app.post('/posts/:slug/view', async (c) => {
	try {
		const slug = c.req.param('slug');
		const cookie = getCookie(c, 'visitor_id');
		
		if (!cookie) return c.json({ error: 'Missing visitorId' }, 400);
		
		const visitorId = cookie;

		const existing = await db
			.select()
			.from(postViews)
			.where(
				and(eq(postViews.postSlug, slug), eq(postViews.visitorId, visitorId))
			)
			.limit(1);

		if (existing.length === 0) {
			await db.insert(postViews).values({
				postSlug: slug,
				visitorId,
				viewedAt: new Date()
			});

			await updatePostStats(slug);
		}

		const stats = await db
			.select()
			.from(postStats)
			.where(eq(postStats.postSlug, slug))
			.limit(1);

		return c.json({ success: true, stats: stats[0] });
	} catch (error) {
		console.error('Error tracking post view:', error);
		return c.json({ error: 'Failed to track view' }, 500);
	}
});

/**
 * POST /api/analytics/posts/:slug/like
 */
app.post('/posts/:slug/like', async (c) => {
	try {
		const slug = c.req.param('slug');
		const cookie = getCookie(c, 'visitor_id');
		
		if (!cookie) {
			return c.json({ error: 'Missing visitorId' }, 400);
		}
		
		const visitorId = cookie;

		const existing = await db
			.select()
			.from(postLikes)
			.where(
				and(eq(postLikes.postSlug, slug), eq(postLikes.visitorId, visitorId))
			)
			.limit(1);

		let liked = false;

		if (existing.length > 0) {
			await db
				.delete(postLikes)
				.where(
					and(eq(postLikes.postSlug, slug), eq(postLikes.visitorId, visitorId))
				);
			liked = false;
		} else {
			await db.insert(postLikes).values({
				postSlug: slug,
				visitorId,
				likedAt: new Date()
			});
			const liked = true;
		}

		await updatePostStats(slug);

		const stats = await db
			.select()
			.from(postStats)
			.where(eq(postStats.postSlug, slug))
			.limit(1);

		return c.json({
			liked,
			totalLikes: stats[0]?.totalLikes || 0
		});
	} catch (error) {
		console.error('Error toggling like:', error);
		return c.json({ error: 'Failed to toggle like' }, 500);
	}
});

/**
 * POST /api/analytics/event
 */
app.post('/event', async (c) => {
	try {
		const visitorId = c.req.header('visitorid');
		const { event, data, path } = await c.req.json();

		if (!visitorId || !event) {
			return c.json({ error: 'Invalid request' }, 400);
		}

		console.log(`📊 Event: ${event}`, { path, data });
		return c.json({ success: true });
	} catch (error) {
		console.error('Error tracking event:', error);
		return c.json({ error: 'Failed to track event' }, 500);
	}
});

/**
 * Helper: Atualiza estatísticas de um post
 */
async function updatePostStats(slug: string): Promise<void> {
	try {
		// Conta views totais
		const totalViewsResult = await db
			.select({ count: count() })
			.from(postViews)
			.where(eq(postViews.postSlug, slug));
		const totalViews = totalViewsResult[0]?.count || 0;

		// Conta views únicos (conta distintos manualmente)
		const allViews = await db
			.select({ visitorId: postViews.visitorId })
			.from(postViews)
			.where(eq(postViews.postSlug, slug));
		const uniqueVisitors = new Set(allViews.map((v) => v.visitorId));
		const uniqueViews = uniqueVisitors.size;

		// Conta likes
		const likesResult = await db
			.select({ count: count() })
			.from(postLikes)
			.where(eq(postLikes.postSlug, slug));
		const totalLikes = likesResult[0]?.count || 0;

		// Atualiza ou insere
		const existing = await db
			.select()
			.from(postStats)
			.where(eq(postStats.postSlug, slug))
			.limit(1);

		if (existing.length > 0) {
			await db
				.update(postStats)
				.set({
					totalViews,
					uniqueViews,
					totalLikes,
					lastUpdated: new Date()
				})
				.where(eq(postStats.postSlug, slug));
		} else {
			await db.insert(postStats).values({
				postSlug: slug,
				totalViews,
				uniqueViews,
				totalLikes,
				lastUpdated: new Date()
			});
		}
	} catch (error) {
		console.error('Error updating post stats:', error);
	}
}

export { app as analyticsRoutes };
