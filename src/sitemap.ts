import { getPosts } from "@/actions/posts";
import { locales, getBaseUrl } from "@/i18n/config";

export const baseUrl = "https://paxa.dev";

export default async function sitemap() {
  const entries: { url: string; lastModified: string }[] = [];

  for (const locale of locales) {
    const localeBase = getBaseUrl(locale);
    const posts = getPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${localeBase}/posts/${post.slug}`,
        lastModified: post.metadata.publishedAt,
      });
    }

    const routes = [
      "",
      "/posts",
      "/snippets",
      "/projetos",
      "/favoritos",
      "/contato",
    ];
    for (const route of routes) {
      entries.push({
        url: `${localeBase}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
      });
    }
  }

  return entries;
}
