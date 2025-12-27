import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import type { SnippetMetadata, SnippetsByCategory } from "shared/dist"

/**
 * Parse valor para string
 */
function parseString(value: unknown, defaultValue = ""): string {
  if (typeof value === "string") return value
  if (Array.isArray(value)) return value.join(", ")
  return defaultValue
}

/**
 * Parse valor para array
 */
function parseArray(value: unknown): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === "string")
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  return []
}

/**
 * Extrai frontmatter
 */
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match?.[1]) return {}

  const metadata: Record<string, unknown> = {}
  const lines = match[1].split("\n")

  for (const line of lines) {
    const colonIndex = line.indexOf(":")
    if (colonIndex === -1) continue

    const key = line.slice(0, colonIndex).trim()
    const rawValue = line
      .slice(colonIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "")

    // Parse arrays [item1, item2]
    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      try {
        const parsed = JSON.parse(rawValue.replace(/'/g, '"'))
        metadata[key] = Array.isArray(parsed) ? parsed : rawValue
      } catch {
        const items = rawValue
          .slice(1, -1)
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter(Boolean)
        metadata[key] = items.length > 0 ? items : rawValue
      }
    } else {
      metadata[key] = rawValue
    }
  }

  return metadata
}

/**
 * Extrai descrição
 */
function extractDescription(content: string, maxLength = 160): string {
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, "")
  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, "")
  const withoutHeadings = withoutCode.replace(/^#{1,6}\s+.*$/gm, "")
  const paragraphs = withoutHeadings
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)
  const text = paragraphs[0] || ""
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

/**
 * Converte metadata para SnippetMetadata
 */
function toSnippetMetadata(
  metadata: Record<string, unknown>,
  filename: string,
  content: string
): SnippetMetadata {
  const slug = parseString(metadata.slug) || path.parse(filename).name
  const title = parseString(metadata.title) || slug.replace(/-/g, " ")
  const category = parseString(metadata.category) || "Outros"
  const language = parseString(metadata.language) || "text"
  const description =
    parseString(metadata.description) || extractDescription(content)
  const date = parseString(metadata.date) || undefined

  return {
    title,
    slug,
    category,
    language,
    description,
    tags: parseArray(metadata.tags),
    date
  }
}

/**
 * Lê e indexa todos os snippets
 */
export async function indexSnippets(snippetsDirectory: string): Promise<{
  snippets: SnippetMetadata[]
  snippetsByCategory: SnippetsByCategory
  categories: string[]
}> {
  try {
    const files = await readdir(snippetsDirectory)
    const mdxFiles = files.filter(
      (f) => f.endsWith(".mdx") || f.endsWith(".md")
    )

    const snippets: SnippetMetadata[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const content = await readFile(
          path.join(snippetsDirectory, file),
          "utf-8"
        )
        const metadata = parseFrontmatter(content)
        return toSnippetMetadata(metadata, file, content)
      })
    )

    // Ordena por título
    snippets.sort((a, b) => a.title.localeCompare(b.title))

    // Agrupa por categoria
    const snippetsByCategory: SnippetsByCategory = {}
    const categoriesSet = new Set<string>()

    for (const snippet of snippets) {
      categoriesSet.add(snippet.category)
      if (!Array.isArray(snippetsByCategory[snippet.category])) {
        snippetsByCategory[snippet.category] = []
      }
      snippetsByCategory[snippet.category]!.push(snippet)
    }

    const categories = Array.from(categoriesSet).sort()

    return { snippets, snippetsByCategory, categories }
  } catch (error) {
    console.error("Error indexing snippets:", error)
    return { snippets: [], snippetsByCategory: {}, categories: [] }
  }
}

/**
 * Busca snippet por slug
 */
export async function getSnippetBySlug(
  snippetsDirectory: string,
  slug: string
): Promise<SnippetMetadata | null> {
  const { snippets } = await indexSnippets(snippetsDirectory)
  return snippets.find((s) => s.slug === slug) || null
}

/**
 * Lê conteúdo do snippet
 */
export async function getSnippetContent(
  snippetsDirectory: string,
  slug: string
): Promise<string | null> {
  try {
    const files = await readdir(snippetsDirectory)
    const mdxFiles = files.filter(
      (f) => f.endsWith(".mdx") || f.endsWith(".md")
    )

    for (const file of mdxFiles) {
      const content = await readFile(
        path.join(snippetsDirectory, file),
        "utf-8"
      )
      const metadata = parseFrontmatter(content)
      const fileSlug = parseString(metadata.slug) || path.parse(file).name

      if (fileSlug === slug) return content
    }

    return null
  } catch (error) {
    console.error("Error reading snippet content:", error)
    return null
  }
}

/**
 * Busca snippet completo com conteúdo
 */
export async function getFullSnippet(
  snippetsDirectory: string,
  slug: string
): Promise<{ snippet: SnippetMetadata; content: string } | null> {
  try {
    const content = await getSnippetContent(snippetsDirectory, slug)
    if (!content) return null

    const metadata = parseFrontmatter(content)
    const snippet = toSnippetMetadata(metadata, slug, content)

    return { snippet, content }
  } catch (error) {
    console.error("Error getting full snippet:", error)
    return null
  }
}
