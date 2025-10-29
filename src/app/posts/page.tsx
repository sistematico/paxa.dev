import Link from "next/link";
import { getPostsByYear, getAllTags } from "@/lib/posts";
import { Calendar, Tag } from "lucide-react";

export default function BlogPage() {
  const postsByYear = getPostsByYear();
  const allTags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[--foreground]">
          Blog
        </h1>
        <p className="text-lg text-[--muted]">
          Artigos sobre desenvolvimento web, tecnologia e programação
        </p>
      </header>

      {/* Tags Filter (opcional - pode ser expandido futuramente) */}
      {allTags.length > 0 && (
        <div className="mb-12 p-6 rounded-lg bg-[--surface] border border-[--border]">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-[--muted]" />
            <h2 className="text-sm font-semibold text-[--muted] uppercase tracking-wide">
              Tags
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-[--chip-bg] text-[--chip-fg] border border-[--border]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Posts by Year */}
      <div className="space-y-16">
        {postsByYear.map(({ year, posts }) => (
          <section key={year}>
            {/* Year Divider */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-[--foreground]">{year}</h2>
              <div className="flex-1 h-px bg-[--border]" />
            </div>

            {/* Posts List */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group transition-all duration-200"
                >
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block p-6 rounded-lg border border-[--border] bg-[--surface] hover:border-[--link] transition-colors"
                  >
                    {/* Post Title */}
                    <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[--foreground] group-hover:text-[--link] transition-colors">
                      {post.title}
                    </h3>

                    {/* Post Meta */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-[--muted]">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    {/* Post Excerpt */}
                    <p className="text-[--muted] mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-[--chip-bg] text-[--chip-fg]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Empty State */}
      {postsByYear.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-[--muted]">
            Nenhum post publicado ainda.
          </p>
        </div>
      )}
    </div>
  );
}