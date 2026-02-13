// src/components/Posts.tsx
import Link from "next/link";
import { formatDate, getPosts } from "@/actions/posts";

interface PostsProps {
  category?: string;
  tag?: string;
  limit?: number;
}

export default function Posts({ category, tag, limit }: PostsProps) {
  let allBlogs = getPosts();

  // Aplicar filtros
  if (category) {
    allBlogs = allBlogs.filter((post) => post.metadata.category === category);
  }

  if (tag) {
    allBlogs = allBlogs.filter((post) => post.metadata.tags?.includes(tag));
  }

  // Aplicar limite se especificado
  if (limit) {
    allBlogs = allBlogs.slice(0, limit);
  }

  // Agrupar posts por ano
  const postsByYear = allBlogs.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allBlogs>,
  );

  // Ordenar anos em ordem decrescente
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  if (allBlogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 dark:text-neutral-400">
          Nenhum post encontrado
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
            href="/posts"
            className="text-sm text-neutral-900 dark:text-neutral-100 hover:underline mt-2 inline-block"
          >
            Ver todos os posts →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {years.map((year) => (
        <div key={year} className="space-y-6">
          {/* Ano */}
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {year}
          </h2>

          {/* Posts do ano */}
          <div className="space-y-6 border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 ml-2">
            {postsByYear[year].map((post) => (
              <article key={post.slug} className="group relative">
                {/* Ponto na linha do tempo */}
                <div className="absolute -left-[29px] top-2 w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors" />

                <Link href={`/posts/${post.slug}`} className="block">
                  {/* Data e categoria */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                    <time
                      dateTime={post.metadata.publishedAt}
                      className="text-neutral-600 dark:text-neutral-400 tabular-nums font-medium"
                    >
                      {formatDate(post.metadata.publishedAt, false)}
                    </time>

                    {post.metadata.category && (
                      <>
                        <span className="text-neutral-400 dark:text-neutral-600">
                          •
                        </span>
                        <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded">
                          {post.metadata.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors mb-2">
                    {post.metadata.title}
                  </h3>

                  {/* Resumo */}
                  {post.metadata.summary && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                      {post.metadata.summary}
                    </p>
                  )}
                </Link>

                {/* Tags */}
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.metadata.tags.map((tagName) => (
                      <Link
                        key={tagName}
                        href={`/posts?tag=${encodeURIComponent(tagName)}`}
                        className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      >
                        #{tagName}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
