import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx-components";
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
    <section>
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

      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <li>
            <Link
              href="/snippets"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Snippets
            </Link>
          </li>
          <li>/</li>
          <li className="text-neutral-900 dark:text-neutral-100">
            {snippet.metadata.title}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {snippet.metadata.title}
      </h1>

      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <time
          dateTime={snippet.metadata.publishedAt}
          className="text-neutral-600 dark:text-neutral-400"
        >
          {formatDate(snippet.metadata.publishedAt, false)}
        </time>

        {snippet.metadata.category && (
          <>
            <span className="text-neutral-400 dark:text-neutral-600">•</span>
            <Link
              href={`/snippets?category=${encodeURIComponent(snippet.metadata.category)}`}
              className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
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
              className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <article className="prose dark:prose-invert">
        <CustomMDX source={snippet.content} />
      </article>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/snippets"
          className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          ← Voltar para snippets
        </Link>
      </div>
    </section>
  );
}
