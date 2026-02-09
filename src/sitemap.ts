import { getPosts } from "@/actions/posts";

export const baseUrl = "https://paxa.dev";

export default async function sitemap() {
  const blogs = getPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.metadata.publishedAt
  }));

  const routes = ["", "/posts"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0]
  }));

  return [...routes, ...blogs];
}
