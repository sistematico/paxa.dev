import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import BackLink from "@/components/BackLink";
import TableOfContents from "@/components/TableOfContents";
import { formatDate } from "@/actions/posts";
import { getCheatSheets } from "@/actions/cheatsheets";
import { extractHeadings } from "@/actions/headings";
import { baseUrl } from "@/sitemap";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { locales, getBaseUrl } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const cheatsheets = getCheatSheets(locale);
    for (const cheatsheet of cheatsheets) {
      params.push({ locale, slug: cheatsheet.slug });
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
  const cheatsheet = getCheatSheets(locale).find((s) => s.slug === slug);
  if (!cheatsheet) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = cheatsheet.metadata;
  const ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${getBaseUrl(locale)}/cheatsheets/${cheatsheet.slug}`,
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

export default async function CheatSheetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const cheatsheet = getCheatSheets(locale).find((s) => s.slug === slug);
  if (!cheatsheet) notFound();

  const dict = await getDictionary(locale);
  const headings = extractHeadings(cheatsheet.content);

  return (
    <section className="px-4 py-6">
      <Breadcrumb
        items={[
          { label: dict.cheatsheets.title, href: "/cheatsheets" },
          { label: cheatsheet.metadata.title },
        ]}
        homeLabel={dict.breadcrumb.home}
        homeHref="/"
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: cheatsheet.metadata.title,
            datePublished: cheatsheet.metadata.publishedAt,
            dateModified: cheatsheet.metadata.publishedAt,
            description: cheatsheet.metadata.summary,
            url: `${getBaseUrl(locale)}/cheatsheets/${cheatsheet.slug}`,
            author: { "@type": "Person", name: "Paxá" },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {cheatsheet.metadata.title}
      </h1>
      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <time dateTime={cheatsheet.metadata.publishedAt} className="text-muted">
          {formatDate(cheatsheet.metadata.publishedAt, false, locale)}
        </time>
        {cheatsheet.metadata.category && (
          <>
            <span className="text-border">•</span>
            <Link
              href={`/cheatsheets?category=${encodeURIComponent(cheatsheet.metadata.category)}`}
              className="px-2 py-0.5 bg-surface text-foreground text-xs rounded hover:bg-surface-alt transition-colors"
            >
              {cheatsheet.metadata.category}
            </Link>
          </>
        )}
      </div>
      {cheatsheet.metadata.tags && cheatsheet.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {cheatsheet.metadata.tags.map((tag) => (
            <Link
              key={tag}
              href={`/cheatsheets?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-muted hover:text-accent transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 lg:items-start">
        {headings.length > 0 && (
          <div className="lg:col-start-2 lg:row-start-1 lg:self-stretch lg:-mt-28">
            <TableOfContents headings={headings} title={dict.toc.title} />
          </div>
        )}
        <article className="prose min-w-0 lg:col-start-1 lg:row-start-1">
          <CustomMDX source={cheatsheet.content} />
        </article>
      </div>
      <div className="mt-12 pt-8 border-t border-border">
        <BackLink
          href="/cheatsheets"
          label={dict.cheatsheets.backToCheatSheets}
        />
      </div>
    </section>
  );
}
