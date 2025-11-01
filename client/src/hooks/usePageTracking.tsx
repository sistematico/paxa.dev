import { useEffect } from 'react';

/**
 * Hook ULTRA-SIMPLES de analytics
 * 10 linhas - Funciona SEMPRE - Nunca quebra
 */
export function usePageTracking() {
  useEffect(() => {
    fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {}); // Ignora erros silenciosamente
  }, []);
}

export default usePageTracking;