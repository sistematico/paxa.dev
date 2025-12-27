import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlock from "./CodeBlock"
import type { SnippetMetadata } from "shared/dist"
import { ArrowLeft } from "lucide-react"

const apiUrl = import.meta.env.VITE_API_URL!

function Snippet() {
  const { slug } = useParams()
  const [snippet, setSnippet] = useState<SnippetMetadata | null>(null)
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!slug) return

      try {
        const response = await fetch(`${apiUrl}/snippets/${slug}/content`)

        if (!response.ok) {
          throw new Error("Snippet not found")
        }

        const data = await response.json()
        setSnippet(data.snippet)
        setContent(data.content)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching snippet:", err)
        setError("Snippet não encontrado")
        setLoading(false)
      }
    }

    fetchSnippet()
  }, [slug])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (error || !snippet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 mb-4">{error}</div>
        <div className="text-center">
          <Link to="/snippets" className="text-blue-400 hover:underline">
            ← Voltar para snippets
          </Link>
        </div>
      </div>
    )
  }

  const contentWithoutFrontmatter = content.replace(
    /^---\s*\n[\s\S]*?\n---\s*\n/,
    ""
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/snippets"
        className="border-2 border-black/50 py-2 ps-1.5 pe-4 rounded-lg inline-flex items-center gap-2 hover:bg-black/20 transition-colors duration-800 mb-8 uppercase"
      >
        <ArrowLeft /> Voltar
      </Link>
      {/* <Link 
        to="/snippets" 
        className="inline-flex items-center gap-2 text-blue-400 hover:underline mb-8"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <title>Voltar</title>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
        Voltar para snippets
      </Link> */}

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">{snippet.title}</h1>
            <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded">
              {snippet.language}
            </span>
          </div>

          {snippet.description && (
            <p className="text-lg text-gray-300 mb-4">{snippet.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="bg-gray-800 px-2 py-1 rounded">
              {snippet.category}
            </span>

            {snippet.date && (
              <time dateTime={snippet.date}>
                {new Date(snippet.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                })}
              </time>
            )}
          </div>

          {snippet.tags && snippet.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-900 text-gray-400 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => (
                <h1 className="text-3xl font-bold mb-4 mt-8" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-2xl font-bold mb-3 mt-6" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-xl font-bold mb-2 mt-4" {...props} />
              ),
              p: (props) => <p className="mb-4 leading-relaxed" {...props} />,
              code: ({ children, className }) => {
                const match = /language-(\w+)/.exec(className || "")
                const language = match ? match[1] : snippet.language

                return match ? (
                  <CodeBlock language={language}>
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                ) : (
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                )
              },
              pre: (props) => <pre className="my-4" {...props} />,
              ul: (props) => (
                <ul
                  className="list-disc list-inside mb-4 space-y-2 ml-4"
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  className="list-decimal list-inside mb-4 space-y-2 ml-4"
                  {...props}
                />
              )
            }}
          >
            {contentWithoutFrontmatter}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}

export default Snippet
