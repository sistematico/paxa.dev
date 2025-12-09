import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

const apiUrl = import.meta.env.VITE_API_URL!

/**
 * Hook simplificado de analytics
 */
export function usePageTracking() {
  const location = useLocation()
  const tracked = useRef(new Set<string>())

  useEffect(() => {
    const path = location.pathname

    // Apenas rastreia a página inicial
    if (path !== "/") {
      return
    }

    // Previne tracking duplicado
    if (tracked.current.has(path)) {
      return
    }

    tracked.current.add(path)

    // Tracking
    async function trackPage() {
      try {
        await fetch(`${apiUrl}/analytics/pageview`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ path })
        })
      } catch {
        // Ignora erros silenciosamente
      }
    }

    trackPage()
  }, [location.pathname])
}

export default usePageTracking
