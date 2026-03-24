// src/components/Posts.tsx
import Link from "next/link";
import { formatDate, getPosts } from "@/actions/posts";
import type { Dictionary } from "@/i18n";

interface PostsProps {
  category?: string;
  tag?: string;
  limit?: number;
  locale?: string;
  dict?: Dictionary["posts"];
}

export default function Posts({
  category,
  tag,
  limit,
  locale = "pt",
  dict,
}: PostsProps) {
  let allBlogs = getPosts(locale);

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
        <p className="text-muted">
          {dict?.noPostsFound ?? "Nenhum post encontrado"}
          {(category || tag) && (
            <>
              {" "}
              {dict?.noPostsFor ?? "para"}{" "}
              {category && <strong>{category}</strong>}
              {tag && <strong>#{tag}</strong>}
            </>
          )}
        </p>
        {(category || tag) && (
          <Link
            href="/posts"
            className="text-sm text-accent hover:text-accent-hover mt-2 inline-block"
          >
            {dict?.seeAllPosts ?? "Ver todos os posts →"}
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
          <h2 className="text-4xl font-bold text-foreground tracking-tight">
            {year}
          </h2>

          {/* Posts do ano */}
          <div className="space-y-6 border-l-2 border-border pl-6 ml-2">
            {postsByYear[year].map((post) => (
              <article key={post.slug} className="group relative">
                {/* Ponto na linha do tempo */}
                <div className="absolute -left-7.25 top-2 w-3 h-3 rounded-full bg-muted group-hover:bg-accent transition-colors" />

                <Link href={`/posts/${post.slug}`} className="block">
                  {/* Data e categoria */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                    <time
                      dateTime={post.metadata.publishedAt}
                      className="text-muted tabular-nums font-medium"
                    >
                      {formatDate(post.metadata.publishedAt, false, locale)}
                    </time>

                    {post.metadata.category && (
                      <>
                        <span className="text-border">•</span>
                        <span className="px-2 py-0.5 bg-surface text-foreground text-xs rounded">
                          {post.metadata.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
                    {post.metadata.title}
                  </h3>

                  {/* Resumo */}
                  {post.metadata.summary && (
                    <p className="text-sm text-muted mb-3">
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
                        className="text-xs text-muted hover:text-accent transition-colors"
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
