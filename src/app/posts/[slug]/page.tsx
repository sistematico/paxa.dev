import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx-components";
import Breadcrumb from "@/components/Breadcrumb";
import PostViewCounter from "@/components/PostViewCounter";
import { formatDate, getPosts } from "@/actions/posts";
import { baseUrl } from "@/sitemap";
import GiscusComments from "@/components/GiscusComments";

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);
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
      url: `${baseUrl}/posts/${post.slug}`,
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

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);
  if (!post) notFound();

  return (
    <section className="p-2 md:p-4">
      <Breadcrumb
        items={[
          { label: "Blog", href: "/posts" },
          { label: post.metadata.title },
        ]}
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
            url: `${baseUrl}/posts/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Paxá",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-lg md:text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm border-4 border-red-500">
        <div className="text-sm text-muted">
          aaaaa

          {formatDate(post.metadata.publishedAt)}
        </div>
        <PostViewCounter slug={post.slug} />
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
      <GiscusComments />
    </section>
  );
}
