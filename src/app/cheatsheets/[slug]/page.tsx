import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import BackLink from "@/components/BackLink";
import { formatDate } from "@/actions/posts";
import { getCheatSheets } from "@/actions/cheatsheets";
import { baseUrl } from "@/sitemap";

export async function generateStaticParams() {
  const cheatsheets = getCheatSheets();
  return cheatsheets.map((cheatsheet) => ({ slug: cheatsheet.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cheatsheet = getCheatSheets().find((item) => item.slug === slug);
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
      url: `${baseUrl}/cheatsheets/${cheatsheet.slug}`,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cheatsheet = getCheatSheets().find((item) => item.slug === slug);

  if (!cheatsheet) {
    notFound();
  }

  return (
    <section className="px-4 py-6">
      <Breadcrumb
        items={[
          { label: "CheatSheets", href: "/cheatsheets" },
          { label: cheatsheet.metadata.title },
        ]}
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
            url: `${baseUrl}/cheatsheets/${cheatsheet.slug}`,
            author: {
              "@type": "Person",
              name: "Paxá",
            },
          }),
        }}
      />

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {cheatsheet.metadata.title}
      </h1>

      <div className="flex items-center gap-3 mt-2 mb-8 text-sm">
        <time dateTime={cheatsheet.metadata.publishedAt} className="text-muted">
          {formatDate(cheatsheet.metadata.publishedAt, false)}
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

      <article className="prose">
        <CustomMDX source={cheatsheet.content} />
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <BackLink href="/cheatsheets" label="Voltar para cheatsheets" />
      </div>
    </section>
  );
}
