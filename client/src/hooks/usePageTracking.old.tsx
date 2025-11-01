import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

const apiUrl = import.meta.env.VITE_API_URL!;

/**
 * Hook para rastrear pageviews automaticamente
 * Usa React Router para detectar mudanças de rota
 */
export function usePageTracking() {
  const location = useLocation();
  const previousPath = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname;

    // Evita rastrear duplicado (se o path não mudou)
    if (previousPath.current === currentPath) {
      return;
    }

    // Atualiza o path anterior
    previousPath.current = currentPath;

    // Rastreia a pageview
    trackPageView(currentPath);
  }, [location.pathname]);
}

/**
 * Rastreia uma pageview
 */
async function trackPageView(path: string) {
  try {
    console.log(`📊 Tracking pageview: ${path}`);

    await fetch(`${apiUrl}/analytics/pageview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Envia cookies
      body: JSON.stringify({ path }),
    });
  } catch (error) {
    console.error('Error tracking pageview:', error);
  }
}

/**
 * Rastreia um evento customizado
 */
export async function trackEvent(eventName: string, data?: Record<string, any>) {
  try {
    console.log(`📊 Tracking event: ${eventName}`, data);

    await fetch(`${apiUrl}/analytics/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ 
        event: eventName,
        data,
        path: window.location.pathname,
      }),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

export default usePageTracking;