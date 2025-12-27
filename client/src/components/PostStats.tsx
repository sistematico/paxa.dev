import { useState, useEffect } from "react"
import { Eye, Heart, Clock, FileText } from "lucide-react"

const apiUrl = import.meta.env.VITE_API_URL!

interface PostStatsData {
  totalViews: number
  uniqueViews: number
  totalLikes: number
  wordCount: number
  readingTime: number
  hasLiked: boolean
}

interface PostStatsProps {
  slug: string
}

export function PostStats({ slug }: PostStatsProps) {
  const [stats, setStats] = useState<PostStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    // Registra a visualização
    const trackView = async () => {
      try {
        await fetch(`${apiUrl}/analytics/posts/${slug}/view`, {
          method: "POST",
          credentials: "include"
        })
      } catch (err) {
        console.error("Error tracking view:", err)
      }
    }

    // Busca as estatísticas
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/analytics/posts/${slug}/stats`,
          {
            credentials: "include"
          }
        )

        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    trackView()
    fetchStats()
  }, [slug])

  const handleLike = async () => {
    if (liking) return

    setLiking(true)
    try {
      const response = await fetch(`${apiUrl}/analytics/posts/${slug}/like`, {
        method: "POST",
        credentials: "include"
      })

      if (response.ok) {
        const data = await response.json()
        setStats((prev) =>
          prev
            ? {
                ...prev,
                totalLikes: data.totalLikes,
                hasLiked: data.liked
              }
            : null
        )
      }
    } catch (err) {
      console.error("Error toggling like:", err)
    } finally {
      setLiking(false)
    }
  }

  if (loading || !stats) {
    return (
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 space-y-4">
        <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
          <h3 className="text-lg font-bold mb-4">Estatísticas</h3>

          {/* Visualizações */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Eye size={20} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold">{stats.uniqueViews}</div>
              <div className="text-xs text-gray-400">Visualizações</div>
            </div>
          </div>

          {/* Curtidas */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
            <button
              type="button"
              onClick={handleLike}
              disabled={liking}
              className={`p-2 rounded-lg transition-all ${
                stats.hasLiked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-gray-700 text-gray-400 hover:bg-red-500/10 hover:text-red-400"
              } disabled:opacity-50`}
              aria-label={stats.hasLiked ? "Descurtir" : "Curtir"}
            >
              <Heart
                size={20}
                fill={stats.hasLiked ? "currentColor" : "none"}
                className="transition-all"
              />
            </button>
            <div className="flex-1">
              <div className="text-2xl font-bold">{stats.totalLikes}</div>
              <div className="text-xs text-gray-400">Curtidas</div>
            </div>
          </div>

          {/* Tempo de leitura */}
          {stats.readingTime > 0 && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-700">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Clock size={20} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold">{stats.readingTime}</div>
                <div className="text-xs text-gray-400">
                  {stats.readingTime === 1 ? "Minuto" : "Minutos"}
                </div>
              </div>
            </div>
          )}

          {/* Contagem de palavras */}
          {stats.wordCount > 0 && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <FileText size={20} className="text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold">
                  {stats.wordCount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Palavras</div>
              </div>
            </div>
          )}
        </div>

        {/* Botão de curtir mobile */}
        <button
          type="button"
          onClick={handleLike}
          disabled={liking}
          className={`lg:hidden w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
            stats.hasLiked
              ? "bg-red-500/20 text-red-400 border-2 border-red-400"
              : "bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-red-400 hover:text-red-400"
          } disabled:opacity-50`}
        >
          <Heart size={20} fill={stats.hasLiked ? "currentColor" : "none"} />
          <span>{stats.hasLiked ? "Descurtir" : "Curtir"}</span>
          <span className="ml-1">({stats.totalLikes})</span>
        </button>
      </div>
    </aside>
  )
}

export default PostStats
