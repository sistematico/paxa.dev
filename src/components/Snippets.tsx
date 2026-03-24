// src/components/Snippets.tsx
import Link from "next/link";
import { formatDate } from "@/actions/posts";
import type { Dictionary } from "@/i18n";

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
  locale?: string;
  dict?: Dictionary["snippets"];
}

export default function Snippets({
  snippets,
  category,
  tag,
  locale = "pt",
  dict,
}: SnippetsProps) {
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
          className="group border-b border-border last:border-0 pb-6"
        >
          {/* Cabeçalho com data e categoria */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
            <time
              dateTime={snippet.metadata.publishedAt}
              className="text-muted tabular-nums"
            >
              {formatDate(snippet.metadata.publishedAt, false, locale)}
            </time>

            {snippet.metadata.category && (
              <>
                <span className="text-border">•</span>
                <span className="px-2 py-0.5 bg-surface text-foreground text-xs rounded">
                  {snippet.metadata.category}
                </span>
              </>
            )}
          </div>

          {/* Título */}
          <Link href={`/${locale}/snippets/${snippet.slug}`}>
            <h2 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
              {snippet.metadata.title}
            </h2>
          </Link>

          {/* Resumo */}
          {snippet.metadata.summary && (
            <p className="text-sm text-muted mb-3 line-clamp-2">
              {snippet.metadata.summary}
            </p>
          )}

          {/* Tags */}
          {snippet.metadata.tags && snippet.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {snippet.metadata.tags.map((tagName) => (
                <Link
                  key={tagName}
                  href={`/${locale}/snippets?tag=${encodeURIComponent(tagName)}`}
                  className="text-xs text-muted hover:text-accent transition-colors"
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
          <p className="text-muted">
            {dict?.noSnippetsFound ?? "Nenhum snippet encontrado"}
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
              href={`/${locale}/snippets`}
              className="text-sm text-accent hover:text-accent-hover mt-2 inline-block"
            >
              {dict?.seeAllSnippets ?? "Ver todos os snippets →"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
