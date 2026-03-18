import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import { formatDate } from "@/actions/posts";
import { getSnippets } from "@/actions/snippets";
import { baseUrl } from "@/sitemap";
import Link from "next/link";

export async function generateStaticParams() {
  const snippets = getSnippets();
  return snippets.map((snippet) => ({ slug: snippet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = getSnippets().find((snippet) => snippet.slug === slug);
  if (!snippet) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = snippet.metadata;
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/snippets/${snippet.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = getSnippets().find((snippet) => snippet.slug === slug);

  if (!snippet) {
    notFound();
  }

  return (
    <section className="px-4 py-6">
      <Breadcrumb
        items={[
          { label: "Snippets", href: "/snippets" },
          { label: snippet.metadata.title },
        ]}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: snippet.metadata.title,
            datePublished: snippet.metadata.publishedAt,
            dateModified: snippet.metadata.publishedAt,
            description: snippet.metadata.summary,
            url: `${baseUrl}/snippets/${snippet.slug}`,
            author: {
              "@type": "Person",
              name: "Paxá",
            },
          }),
        }}
      />

      {/* Header */}
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {snippet.metadata.title}
      </h1>

      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <time dateTime={snippet.metadata.publishedAt} className="text-muted">
          {formatDate(snippet.metadata.publishedAt, false)}
        </time>

        {snippet.metadata.category && (
          <>
            <span className="text-border">•</span>
            <Link
              href={`/snippets?category=${encodeURIComponent(snippet.metadata.category)}`}
              className="px-2 py-0.5 bg-surface text-foreground text-xs rounded hover:bg-surface-alt transition-colors"
            >
              {snippet.metadata.category}
            </Link>
          </>
        )}
      </div>

      {/* Tags */}
      {snippet.metadata.tags && snippet.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {snippet.metadata.tags.map((tag) => (
            <Link
              key={tag}
              href={`/snippets?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <article className="prose">
        <CustomMDX source={snippet.content} />
      </article>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/snippets"
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          ← Voltar para snippets
        </Link>
      </div>
    </section>
  );
}
