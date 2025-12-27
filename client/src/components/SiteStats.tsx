import { useState, useEffect } from "react"
import { Eye } from "lucide-react"

const apiUrl = import.meta.env.VITE_API_URL!

interface SiteStatsData {
  uniqueVisitors: number
  totalHits: number
}

export function SiteStats() {
  const [stats, setStats] = useState<SiteStatsData | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${apiUrl}/analytics/stats`)

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (err) {
        console.error("Error fetching site stats:", err)
      }
    }

    fetchStats()
  }, [])

  if (!stats) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <Eye size={14} />
      <span>{stats.totalHits.toLocaleString()} visitas</span>
    </div>
  )
}

export default SiteStats
