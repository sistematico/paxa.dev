import type { Context, Next } from 'hono';
import { getVisitorId, trackSiteVisit } from '../lib/analytics';

const VISITOR_COOKIE_NAME = 'visitor_id';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 ano

/**
 * Middleware para rastrear visitas ao site
 */
export async function analyticsMiddleware(c: Context, next: Next) {
  try {
    // Obtém ou cria ID do visitante
    const existingVisitorId = c.req.header('cookie')
      ?.split(';')
      .find(cookie => cookie.trim().startsWith(`${VISITOR_COOKIE_NAME}=`))
      ?.split('=')[1];

    const visitorId = getVisitorId(existingVisitorId);

    // console.log(visitorId)

    // Define o cookie se não existir
    if (!existingVisitorId) {
      c.header('Set-Cookie', `${VISITOR_COOKIE_NAME}=${visitorId}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax`);
    }

    // Armazena o visitorId no contexto para uso posterior
    c.set('visitorId', visitorId);

    // Registra a visita (apenas para rotas HTML, não para API ou assets)
    const path = c.req.path;

    console.log(path)

    // if (!path.startsWith('/api') && !path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)) {
    if (!path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)) {
      await trackSiteVisit(visitorId);
    }

    await next();
  } catch (error) {
    console.error('Error in analytics middleware:', error);
    await next();
  }
}