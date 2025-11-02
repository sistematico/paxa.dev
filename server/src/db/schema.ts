import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

// ==================== TABELA: site_visits ====================
export const siteVisits = sqliteTable(
    'site_visits',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        visitorId: text('visitor_id').notNull().unique(),
        totalHits: integer('total_hits').default(0).notNull(),
        firstVisit: integer('first_visit', { mode: 'timestamp' })
            .notNull()
            .$defaultFn(() => new Date()),
        lastVisit: integer('last_visit', { mode: 'timestamp' })
            .notNull()
            .$defaultFn(() => new Date())
    },
    (table) => [index('idx_visitor_id').on(table.visitorId)]
);

// ==================== TABELA: post_views ====================
export const postViews = sqliteTable(
    'post_views',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        postSlug: text('post_slug').notNull(),
        visitorId: text('visitor_id').notNull(),
        viewedAt: integer('viewed_at', { mode: 'timestamp' })
            .notNull()
            .$defaultFn(() => new Date())
    },
    (table) => [
        index('idx_post_views_slug').on(table.postSlug),
        index('idx_post_views_visitor').on(table.visitorId),
        index('idx_post_views_composite').on(table.postSlug, table.visitorId)
    ]
);

// ==================== TABELA: post_likes ====================
export const postLikes = sqliteTable(
    'post_likes',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        postSlug: text('post_slug').notNull(),
        visitorId: text('visitor_id').notNull(),
        likedAt: integer('liked_at', { mode: 'timestamp' })
            .notNull()
            .$defaultFn(() => new Date())
    },
    (table) => [
        index('idx_post_likes_slug').on(table.postSlug),
        index('idx_post_likes_visitor').on(table.visitorId),
        index('idx_post_likes_unique').on(table.postSlug, table.visitorId)
    ]
);

// ==================== TABELA: post_stats ====================
export const postStats = sqliteTable(
    'post_stats',
    {
        postSlug: text('post_slug').primaryKey(),
        totalViews: integer('total_views').default(0).notNull(),
        uniqueViews: integer('unique_views').default(0).notNull(),
        totalLikes: integer('total_likes').default(0).notNull(),
        wordCount: integer('word_count').default(0),
        readingTime: integer('reading_time').default(0),
        lastUpdated: integer('last_updated', { mode: 'timestamp' })
            .notNull()
            .$defaultFn(() => new Date())
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