// src/components/Bookmarks.tsx
import Link from "next/link";
import type { Bookmark } from "@/actions/bookmarks";

interface BookmarksProps {
  bookmarks: Bookmark[];
  category?: string;
  tag?: string;
}

export default function Bookmarks({
  bookmarks,
  category,
  tag,
}: BookmarksProps) {
  // Filtrar por categoria e tag se especificados
  let filteredBookmarks = bookmarks;

  if (category) {
    filteredBookmarks = filteredBookmarks.filter(
      (bookmark) => bookmark.category === category,
    );
  }

  if (tag) {
    filteredBookmarks = filteredBookmarks.filter((bookmark) =>
      bookmark.tags.includes(tag),
    );
  }

  return (
    <div className="space-y-4">
      {filteredBookmarks.map((bookmark) => (
        <article
          key={bookmark.id}
          className="group border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Cabeçalho */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                >
                  {bookmark.title}
                </a>
                <span className="text-xs text-neutral-400">↗</span>
              </div>

              {/* Descrição */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {bookmark.description}
              </p>

              {/* Categoria e Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/favoritos?category=${encodeURIComponent(bookmark.category)}`}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {bookmark.category}
                </Link>

                {bookmark.tags.map((tagItem) => (
                  <Link
                    key={tagItem}
                    href={`/favoritos?tag=${encodeURIComponent(tagItem)}`}
                    className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                  >
                    #{tagItem}
                  </Link>
                ))}
              </div>
            </div>

            {/* URL */}
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors break-all max-w-32"
            >
              {new URL(bookmark.url).hostname}
            </a>
          </div>
        </article>
      ))}

      {filteredBookmarks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400">
            Nenhum favorito encontrado
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
              href="/favoritos"
              className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline mt-2 inline-block"
            >
              Ver todos os favoritos →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
