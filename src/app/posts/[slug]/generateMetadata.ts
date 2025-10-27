import { getPostData } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}
