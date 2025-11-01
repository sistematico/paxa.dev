import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ==================== TABELA: site_visits ====================
// Rastreia visitantes únicos e total de hits
export const siteVisits = sqliteTable(
	'site_visits',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		visitorId: text('visitor_id').notNull().unique(),
		totalHits: integer('total_hits').default(0).notNull(),
		firstVisit: integer('first_visit', { mode: 'timestamp' })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull(),
		lastVisit: integer('last_visit', { mode: 'timestamp' })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull()
	},
	(table) => [index('idx_visitor_id').on(table.visitorId)]
);

// ==================== TABELA: post_views ====================
// Registra cada visualização de post
export const postViews = sqliteTable(
	'post_views',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		postSlug: text('post_slug').notNull(),
		visitorId: text('visitor_id').notNull(),
		viewedAt: integer('viewed_at', { mode: 'timestamp' })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull()
	},
	(table) => [
		index('idx_post_views_slug').on(table.postSlug),
		index('idx_post_views_visitor').on(table.visitorId),
		index('idx_post_views_composite').on(
			table.postSlug,
			table.visitorId
		)
  ]
);

// ==================== TABELA: post_likes ====================
// Armazena curtidas de posts (constraint: uma por visitante)
export const postLikes = sqliteTable(
	'post_likes',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		postSlug: text('post_slug').notNull(),
		visitorId: text('visitor_id').notNull(),
		likedAt: integer('liked_at', { mode: 'timestamp' })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull()
	},
	(table) => [
		index('idx_post_likes_slug').on(table.postSlug),
		index('idx_post_likes_visitor').on(table.visitorId),
		// Índice único para prevenir curtidas duplicadas
		index('idx_post_likes_unique').on(
			table.postSlug,
			table.visitorId
		)
  ]
);

// ==================== TABELA: post_stats ====================
// Cache de estatísticas agregadas para performance
export const postStats = sqliteTable(
	'post_stats',
	{
		postSlug: text('post_slug').primaryKey(),
		totalViews: integer('total_views').default(0).notNull(),
		uniqueViews: integer('unique_views').default(0).notNull(),
		totalLikes: integer('total_likes').default(0).notNull(),
		wordCount: integer('word_count').default(0),
		readingTime: integer('reading_time').default(0), // em minutos
		lastUpdated: integer('last_updated', { mode: 'timestamp' })
			.default(sql`(strftime('%s', 'now'))`)
			.notNull()
	},
	(table) => [
		index('idx_post_stats_views').on(table.totalViews),
		index('idx_post_stats_likes').on(table.totalLikes)
  ]
);

// ==================== TIPOS TYPESCRIPT ====================

export type SiteVisit = typeof siteVisits.$inferSelect;
export type NewSiteVisit = typeof siteVisits.$inferInsert;

export type PostView = typeof postViews.$inferSelect;
export type NewPostView = typeof postViews.$inferInsert;

export type PostLike = typeof postLikes.$inferSelect;
export type NewPostLike = typeof postLikes.$inferInsert;

export type PostStat = typeof postStats.$inferSelect;
export type NewPostStat = typeof postStats.$inferInsert;

// ==================== QUERIES EXEMPLO ====================

// Exemplos de como usar o schema:

/*
import { db } from './db';
import { siteVisits, postViews, postLikes, postStats } from './schema';
import { eq, and, sql } from 'drizzle-orm';

// 1. Criar nova visita
await db.insert(siteVisits).values({
  visitorId: 'uuid-here',
  totalHits: 1,
  firstVisit: new Date(),
  lastVisit: new Date(),
});

// 2. Atualizar hits
await db.update(siteVisits)
  .set({ 
    totalHits: sql`${siteVisits.totalHits} + 1`,
    lastVisit: new Date()
  })
  .where(eq(siteVisits.visitorId, 'uuid-here'));

// 3. Registrar visualização
await db.insert(postViews).values({
  postSlug: 'meu-post',
  visitorId: 'uuid-here',
  viewedAt: new Date(),
});

// 4. Adicionar curtida
await db.insert(postLikes).values({
  postSlug: 'meu-post',
  visitorId: 'uuid-here',
  likedAt: new Date(),
});

// 5. Remover curtida
await db.delete(postLikes)
  .where(
    and(
      eq(postLikes.postSlug, 'meu-post'),
      eq(postLikes.visitorId, 'uuid-here')
    )
  );

// 6. Buscar estatísticas
const stats = await db.select()
  .from(postStats)
  .where(eq(postStats.postSlug, 'meu-post'))
  .limit(1);

// 7. Contar visualizações únicas
const uniqueViews = await db.select({ 
  count: sql<number>`count(DISTINCT ${postViews.visitorId})` 
})
  .from(postViews)
  .where(eq(postViews.postSlug, 'meu-post'));

// 8. Posts mais populares
const popular = await db.select()
  .from(postStats)
  .orderBy(sql`${postStats.totalViews} DESC`)
  .limit(10);
*/
