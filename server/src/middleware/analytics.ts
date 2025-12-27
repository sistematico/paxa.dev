import type { Context, Next } from "hono"
import { getCookie, setCookie } from "hono/cookie"
import crypto from "node:crypto"

const VISITOR_COOKIE_NAME = "visitor_id"
//const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 ano

/**
 * Middleware simplificado para analytics client-side
 * NÃO rastreia automaticamente - apenas gerencia o visitor ID
 * O tracking é feito pelo cliente via API
 */
export async function analyticsMiddleware(c: Context, next: Next) {
  try {
    // // Obtém ou cria visitor ID
    // let visitorId = c.req.header('cookie')
    //   ?.split(';')
    //   .find(cookie => cookie.trim().startsWith(`${VISITOR_COOKIE_NAME}=`))
    //   ?.split('=')[1];

    // if (!visitorId) {
    //   visitorId = crypto.randomUUID();
    //   c.header(
    //     'Set-Cookie',
    //     `${VISITOR_COOKIE_NAME}=${visitorId}; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax`
    //   );
    // }

    // // Armazena no contexto para uso nas rotas
    // c.set('visitorId', visitorId);

    const cookie = getCookie(c, VISITOR_COOKIE_NAME)
    if (cookie) {
      c.set("visitor_id", cookie)
    } else {
      const newVisitorId = crypto.randomUUID()
      setCookie(c, "visitor_id", newVisitorId)
      c.set("visitor_id", newVisitorId)
    }

    await next()
  } catch (error) {
    console.error("Error in analytics middleware:", error)
    await next()
  }
}
