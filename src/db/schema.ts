import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const postViews = sqliteTable("post_views", {
  slug: text("slug").primaryKey(),
  views: integer("views").notNull().default(0),
});

export const homepageViews = sqliteTable("homepage_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  totalViews: integer("total_views").notNull().default(0),
  uniqueViews: integer("unique_views").notNull().default(0),
});

export const homepageVisitors = sqliteTable("homepage_visitors", {
  hash: text("hash").primaryKey(),
  createdAt: text("created_at").notNull(),
});
