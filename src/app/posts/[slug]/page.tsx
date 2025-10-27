import Link from "next/link";
import { getPostData, getAllPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostData(slug);

    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2">
            <Link href="/posts" className="hover:underline">
              <ArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold">{post.title}</h1>
          </div>
          <time className="text-gray-600">{post.date}</time>
        </header>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>
    );
  } catch (error) {
    notFound();
  }
}
