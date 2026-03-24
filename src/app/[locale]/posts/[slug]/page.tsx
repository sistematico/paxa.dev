import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import PostViewCounter from "@/components/PostViewCounter";
import { formatDate, getPosts } from "@/actions/posts";
import { baseUrl } from "@/sitemap";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { locales, getBaseUrl } from "@/i18n/config";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = getPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
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
  const post = getPosts(locale).find((p) => p.slug === slug);
  if (!post) return;

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${getBaseUrl(locale)}/posts/${post.slug}`,
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

export default async function Post({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const post = getPosts(locale).find((p) => p.slug === slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);

  return (
    <section className="px-4 py-6">
      <Breadcrumb
        items={[
          { label: dict.posts.title, href: "/posts" },
          { label: post.metadata.title },
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
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${getBaseUrl(locale)}/posts/${post.slug}`,
            author: { "@type": "Person", name: "Paxá" },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-muted">
          {formatDate(post.metadata.publishedAt, false, locale)}
        </p>
        <PostViewCounter slug={post.slug} />
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
