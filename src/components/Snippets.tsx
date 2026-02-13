// src/components/Snippets.tsx
import Link from "next/link";
import { formatDate } from "@/actions/posts";

interface SnippetsProps {
  snippets: Array<{
    slug: string;
    metadata: {
      title: string;
      publishedAt: string;
      summary: string;
      category?: string;
      tags?: string[];
    };
  }>;
  category?: string;
  tag?: string;
}

export default function Snippets({ snippets, category, tag }: SnippetsProps) {
  // Filtrar por categoria e tag se especificados
  let filteredSnippets = snippets;

  if (category) {
    filteredSnippets = filteredSnippets.filter(
      (snippet) => snippet.metadata.category === category,
    );
  }

  if (tag) {
    filteredSnippets = filteredSnippets.filter((snippet) =>
      snippet.metadata.tags?.includes(tag),
    );
  }

  return (
    <div className="space-y-6">
      {filteredSnippets.map((snippet) => (
        <article
          key={snippet.slug}
          className="group border-b border-neutral-200 dark:border-neutral-800 last:border-0 pb-6"
        >
          {/* Cabeçalho com data e categoria */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
            <time
              dateTime={snippet.metadata.publishedAt}
              className="text-neutral-600 dark:text-neutral-400 tabular-nums"
            >
              {formatDate(snippet.metadata.publishedAt, false)}
            </time>

            {snippet.metadata.category && (
              <>
                <span className="text-neutral-400 dark:text-neutral-600">
                  •
                </span>
                <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded">
                  {snippet.metadata.category}
                </span>
              </>
            )}
          </div>

          {/* Título */}
          <Link href={`/snippets/${snippet.slug}`}>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors mb-2">
              {snippet.metadata.title}
            </h2>
          </Link>

          {/* Resumo */}
          {snippet.metadata.summary && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
              {snippet.metadata.summary}
            </p>
          )}

          {/* Tags */}
          {snippet.metadata.tags && snippet.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {snippet.metadata.tags.map((tagName) => (
                <Link
                  key={tagName}
                  href={`/snippets?tag=${encodeURIComponent(tagName)}`}
                  className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  #{tagName}
                </Link>
              ))}
            </div>
          )}
        </article>
      ))}

      {filteredSnippets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            Nenhum snippet encontrado
            {(category || tag) && (
              <>
                {" "}
                para {category && <strong>{category}</strong>}
                {tag && <strong>#{tag}</strong>}
              </>
            )}
          </p>
          {(category || tag) && (
            <Link
              href="/snippets"
              className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline mt-2 inline-block"
            >
              Ver todos os snippets →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
