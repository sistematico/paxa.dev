import { useState, useEffect, useRef } from "react"
import type { Favorite, FavoritesByCategory } from "shared/dist"
import { Bookmark, ExternalLink, Tag } from "lucide-react"

const apiUrl = import.meta.env.VITE_API_URL!

export function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [favoritesByCategory, setFavoritesByCategory] =
    useState<FavoritesByCategory>({})
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`${apiUrl}/bookmarks`)

        if (!response.ok) {
          throw new Error("Failed to fetch favorites")
        }

        const data = await response.json()
        setFavorites(data.favorites)
        setFavoritesByCategory(data.favoritesByCategory)
        setCategories(data.categories)

        if (data.categories.length > 0) {
          setActiveCategory(data.categories[0])
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching favorites:", err)
        setError("Não foi possível carregar os favoritos")
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Se estiver no final da página, seleciona a última categoria
      if (windowHeight + window.scrollY >= documentHeight - 100) {
        const lastCategory = categories[categories.length - 1]
        if (lastCategory) {
          setActiveCategory(lastCategory)
        }
        return
      }

      for (const category of categories) {
        const element = categoryRefs.current[category]
        if (element) {
          const { offsetTop, offsetHeight } = element

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(category)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [categories])

  // Scrollspy effect
  // useEffect(() => {
  // 	const handleScroll = () => {
  // 		const scrollPosition = window.scrollY + 150;

  // 		for (const category of categories) {
  // 			const element = categoryRefs.current[category];
  // 			if (element) {
  // 				const { offsetTop, offsetHeight } = element;

  // 				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
  // 					setActiveCategory(category);
  // 					break;
  // 				}
  // 			}
  // 		}
  // 	};

  // 	window.addEventListener('scroll', handleScroll);
  // 	handleScroll();

  // 	return () => window.removeEventListener('scroll', handleScroll);
  // }, [categories]);

  const scrollToCategory = (category: string) => {
    const element = categoryRefs.current[category]
    if (element) {
      const offset = 100
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
  }

  const getFaviconUrl = (url: string, favicon?: string) => {
    if (favicon) return favicon

    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando favoritos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Nenhum favorito disponível.</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex gap-8">
        {/* Sidebar com navegação de categorias */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bookmark size={20} />
              Categorias
            </h2>
            <nav className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => scrollToCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    activeCategory === category
                      ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-60">
                    ({favoritesByCategory[category]?.length || 0})
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Favoritos</h1>
            <p className="text-gray-400">
              Coleção de {favorites.length} links e recursos úteis
            </p>
          </div>

          {/* Navegação mobile */}
          <div className="lg:hidden mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => scrollToCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? "bg-gray-800 text-white font-semibold"
                      : "bg-gray-800/30 text-gray-400 hover:bg-gray-800/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de favoritos por categoria */}
          {categories.map((category) => (
            <section
              key={category}
              ref={(el) => {
                categoryRefs.current[category] = el
              }}
              className="mb-16 scroll-mt-24"
              id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-gray-700 pb-2">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoritesByCategory[category]?.map((favorite) => {
                  const faviconUrl = getFaviconUrl(
                    favorite.url,
                    favorite.favicon
                  )

                  return (
                    <a
                      key={favorite.id}
                      href={favorite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-gray-900/50 group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {faviconUrl && (
                          <img
                            src={faviconUrl}
                            alt=""
                            className="w-6 h-6 mt-0.5 shrink-0"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                            <span className="truncate">{favorite.title}</span>
                            <ExternalLink
                              size={14}
                              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {new URL(favorite.url).hostname}
                          </p>
                        </div>
                      </div>

                      {favorite.description && (
                        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                          {favorite.description}
                        </p>
                      )}

                      {favorite.tags && favorite.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {favorite.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                          {favorite.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{favorite.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}

export default Favorites
