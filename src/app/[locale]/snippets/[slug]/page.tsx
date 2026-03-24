import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import { formatDate } from "@/actions/posts";
import { getSnippets } from "@/actions/snippets";
import { baseUrl } from "@/sitemap";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const snippets = getSnippets(locale);
    for (const snippet of snippets) {
      params.push({ locale, slug: snippet.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const snippet = getSnippets(locale).find((s) => s.slug === slug);
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
      url: `${baseUrl}/${locale}/snippets/${snippet.slug}`,
      images: [{ url: ogImage }],
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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const snippet = getSnippets(locale).find((s) => s.slug === slug);
  if (!snippet) notFound();

  const dict = await getDictionary(locale);

  return (
    <section className="px-4 py-6">
      <Breadcrumb
        items={[
          { label: dict.snippets.title, href: `/${locale}/snippets` },
          { label: snippet.metadata.title },
        ]}
        homeLabel={dict.breadcrumb.home}
        homeHref={`/${locale}`}
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
            url: `${baseUrl}/${locale}/snippets/${snippet.slug}`,
            author: { "@type": "Person", name: "Paxá" },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {snippet.metadata.title}
      </h1>
      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <time dateTime={snippet.metadata.publishedAt} className="text-muted">
          {formatDate(snippet.metadata.publishedAt, false, locale)}
        </time>
        {snippet.metadata.category && (
          <>
            <span className="text-border">•</span>
            <Link
              href={`/${locale}/snippets?category=${encodeURIComponent(snippet.metadata.category)}`}
              className="px-2 py-0.5 bg-surface text-foreground text-xs rounded hover:bg-surface-alt transition-colors"
            >
              {snippet.metadata.category}
            </Link>
          </>
        )}
      </div>
      {snippet.metadata.tags && snippet.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {snippet.metadata.tags.map((tag) => (
            <Link
              key={tag}
              href={`/${locale}/snippets?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      <article className="prose">
        <CustomMDX source={snippet.content} />
      </article>
      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href={`/${locale}/snippets`}
          className="text-sm text-muted hover:text-accent transition-colors"
        >
          {dict.snippets.backToSnippets}
        </Link>
      </div>
    </section>
  );
}
