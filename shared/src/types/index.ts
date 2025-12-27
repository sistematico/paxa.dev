export type ApiResponse = {
  message: string
  success: true
}

export type PostMetadata = {
  title: string
  slug: string
  date: string
  excerpt?: string
  tags?: string[]
  author?: string
  draft?: boolean
}

export type Post = PostMetadata & {
  content?: string
}

export type PostsByYear = {
  [year: string]: PostMetadata[]
}

export type PostsIndexResponse = {
  posts: PostMetadata[]
  postsByYear: PostsByYear
  total: number
}

// Tipos para Snippets
export type SnippetMetadata = {
  title: string
  slug: string
  category: string
  language: string
  description?: string
  tags?: string[]
  date?: string
  draft?: boolean
}

export type Snippet = SnippetMetadata & {
  content?: string
}

export type SnippetsByCategory = {
  [category: string]: SnippetMetadata[]
}

export type SnippetsIndexResponse = {
  snippets: SnippetMetadata[]
  snippetsByCategory: SnippetsByCategory
  categories: string[]
  total: number
}

// Tipos para Favoritos
export type Favorite = {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags?: string[]
  favicon?: string
  addedAt: string
}

export type FavoritesByCategory = {
  [category: string]: Favorite[]
}

export type FavoritesResponse = {
  favorites: Favorite[]
  favoritesByCategory: FavoritesByCategory
  categories: string[]
  total: number
}
