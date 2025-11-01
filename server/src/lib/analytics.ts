import { db } from '../db';
import { siteVisits, postViews, postLikes, postStats } from '../db/schema';
import { eq, and, sql } from 'drizzle-orm';
import crypto from 'node:crypto';

/**
 * Gera ou recupera o ID do visitante
 */
export function getVisitorId(cookie?: string): string {
  if (cookie) {
    return cookie;
  }
  return crypto.randomUUID();
}

/**
 * Registra uma visita ao site
 */
export async function trackSiteVisit(visitorId: string): Promise<void> {
  try {
    const existing = await db.select()
      .from(siteVisits)
      .where(eq(siteVisits.visitorId, visitorId))
      .limit(1);

    if (existing.length > 0) {
      // Visitante existente - incrementa hits e atualiza última visita
      await db.update(siteVisits)
        .set({
          totalHits: sql`${siteVisits.totalHits} + 1`,
          lastVisit: new Date(),
        })
        .where(eq(siteVisits.visitorId, visitorId));
    } else {
      // Novo visitante
      await db.insert(siteVisits).values({
        visitorId,
        totalHits: 1,
        firstVisit: new Date(),
        lastVisit: new Date(),
      });
    }
  } catch (error) {
    console.error('Error tracking site visit:', error);
  }
}

/**
 * Registra uma visualização de post
 */
export async function trackPostView(postSlug: string, visitorId: string): Promise<void> {
  try {
    // Verifica se o usuário já visualizou este post (apenas uma vez por sessão)
    const existingView = await db.select()
      .from(postViews)
      .where(
        and(
          eq(postViews.postSlug, postSlug),
          eq(postViews.visitorId, visitorId)
        )
      )
      .limit(1);

    if (existingView.length === 0) {
      // Registra nova visualização
      await db.insert(postViews).values({
        postSlug,
        visitorId,
        viewedAt: new Date(),
      });

      // Atualiza estatísticas do post
      await updatePostStats(postSlug);
    }
  } catch (error) {
    console.error('Error tracking post view:', error);
  }
}

/**
 * Curte/descurte um post
 */
export async function togglePostLike(postSlug: string, visitorId: string): Promise<{ liked: boolean; totalLikes: number }> {
  try {
    // Verifica se já curtiu
    const existing = await db.select()
      .from(postLikes)
      .where(
        and(
          eq(postLikes.postSlug, postSlug),
          eq(postLikes.visitorId, visitorId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Remove curtida
      await db.delete(postLikes)
        .where(
          and(
            eq(postLikes.postSlug, postSlug),
            eq(postLikes.visitorId, visitorId)
          )
        );
      
      await updatePostStats(postSlug);
      const stats = await getPostStats(postSlug);
      return { liked: false, totalLikes: stats?.totalLikes || 0 };
    } else {
      // Adiciona curtida
      await db.insert(postLikes).values({
        postSlug,
        visitorId,
        likedAt: new Date(),
      });
      
      await updatePostStats(postSlug);
      const stats = await getPostStats(postSlug);
      return { liked: true, totalLikes: stats?.totalLikes || 0 };
    }
  } catch (error) {
    console.error('Error toggling post like:', error);
    return { liked: false, totalLikes: 0 };
  }
}

/**
 * Verifica se o visitante curtiu um post
 */
export async function hasUserLikedPost(postSlug: string, visitorId: string): Promise<boolean> {
  try {
    const result = await db.select()
      .from(postLikes)
      .where(
        and(
          eq(postLikes.postSlug, postSlug),
          eq(postLikes.visitorId, visitorId)
        )
      )
      .limit(1);
    
    return result.length > 0;
  } catch (error) {
    console.error('Error checking post like:', error);
    return false;
  }
}

/**
 * Atualiza estatísticas de um post
 */
export async function updatePostStats(postSlug: string): Promise<void> {
  try {
    // Conta visualizações totais
    const totalViewsResult = await db.select({ count: sql<number>`count(*)` })
      .from(postViews)
      .where(eq(postViews.postSlug, postSlug));
    const totalViews = totalViewsResult[0]?.count || 0;

    // Conta visualizações únicas
    const uniqueViewsResult = await db.select({ count: sql<number>`count(DISTINCT ${postViews.visitorId})` })
      .from(postViews)
      .where(eq(postViews.postSlug, postSlug));
    const uniqueViews = uniqueViewsResult[0]?.count || 0;

    // Conta curtidas
    const likesResult = await db.select({ count: sql<number>`count(*)` })
      .from(postLikes)
      .where(eq(postLikes.postSlug, postSlug));
    const totalLikes = likesResult[0]?.count || 0;

    // Verifica se já existe registro
    const existing = await db.select()
      .from(postStats)
      .where(eq(postStats.postSlug, postSlug))
      .limit(1);

    if (existing.length > 0) {
      await db.update(postStats)
        .set({
          totalViews,
          uniqueViews,
          totalLikes,
          lastUpdated: new Date(),
        })
        .where(eq(postStats.postSlug, postSlug));
    } else {
      await db.insert(postStats).values({
        postSlug,
        totalViews,
        uniqueViews,
        totalLikes,
        lastUpdated: new Date(),
      });
    }
  } catch (error) {
    console.error('Error updating post stats:', error);
  }
}

/**
 * Calcula e atualiza contagem de palavras e tempo de leitura
 */
export async function updatePostReadingStats(postSlug: string, content: string): Promise<void> {
  try {
    // Remove frontmatter e markdown
    const cleanContent = content
      .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/[#*_~\[\]()]/g, '');

    const words = cleanContent.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto

    const existing = await db.select()
      .from(postStats)
      .where(eq(postStats.postSlug, postSlug))
      .limit(1);

    if (existing.length > 0) {
      await db.update(postStats)
        .set({
          wordCount,
          readingTime,
          lastUpdated: new Date(),
        })
        .where(eq(postStats.postSlug, postSlug));
    } else {
      await db.insert(postStats).values({
        postSlug,
        wordCount,
        readingTime,
        totalViews: 0,
        uniqueViews: 0,
        totalLikes: 0,
        lastUpdated: new Date(),
      });
    }
  } catch (error) {
    console.error('Error updating post reading stats:', error);
  }
}

/**
 * Obtém estatísticas de um post
 */
export async function getPostStats(postSlug: string) {
  try {
    const result = await db.select()
      .from(postStats)
      .where(eq(postStats.postSlug, postSlug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting post stats:', error);
    return null;
  }
}

/**
 * Obtém estatísticas globais do site
 */
export async function getSiteStats() {
  try {
    // Total de visitantes únicos
    const uniqueVisitorsResult = await db.select({ count: sql<number>`count(*)` })
      .from(siteVisits);
    const uniqueVisitors = uniqueVisitorsResult[0]?.count || 0;

    // Total de hits
    const totalHitsResult = await db.select({ total: sql<number>`sum(${siteVisits.totalHits})` })
      .from(siteVisits);
    const totalHits = totalHitsResult[0]?.total || 0;

    return {
      uniqueVisitors,
      totalHits,
    };
  } catch (error) {
    console.error('Error getting site stats:', error);
    return {
      uniqueVisitors: 0,
      totalHits: 0,
    };
  }
}

/**
 * Obtém posts mais populares
 */
export async function getPopularPosts(limit = 10) {
  try {
    return await db.select()
      .from(postStats)
      .orderBy(sql`${postStats.totalViews} DESC`)
      .limit(limit);
  } catch (error) {
    console.error('Error getting popular posts:', error);
    return [];
  }
}