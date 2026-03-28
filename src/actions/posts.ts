// src/actions/posts.ts
import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  category?: string;
  tags?: string[];
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");

    const trimmedKey = key.trim() as keyof Metadata;

    // Handle arrays (tags)
    if (trimmedKey === "tags" && value.startsWith("[")) {
      metadata.tags = JSON.parse(value.replace(/'/g, '"'));
    } else {
      (metadata as Record<string, string>)[trimmedKey] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

const DEFAULT_CATEGORY: Record<string, string> = {
  pt: "Sem categoria",
  en: "Uncategorized",
};

function getMDXData(dir: string, locale = "pt") {
  if (!fs.existsSync(dir)) return [];
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: {
        ...metadata,
        category:
          metadata.category || DEFAULT_CATEGORY[locale] || "Uncategorized",
        tags: metadata.tags || [],
      },
      slug,
      content,
    };
  });
}

export function getPosts(locale = "pt") {
  const dir = path.join(process.cwd(), "src", "posts", locale);
  const posts = getMDXData(dir, locale);
  return posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export function getPostsByCategory(category: string, locale = "pt") {
  return getPosts(locale).filter((post) => post.metadata.category === category);
}

export function getPostsByTag(tag: string, locale = "pt") {
  return getPosts(locale).filter((post) => post.metadata.tags?.includes(tag));
}

export function getAllCategories(locale = "pt") {
  const posts = getPosts(locale);
  const categories = [...new Set(posts.map((post) => post.metadata.category))];
  return categories.filter(Boolean) as string[];
}

export function getAllTags(locale = "pt") {
  const posts = getPosts(locale);
  const allTags = posts.flatMap((post) => post.metadata.tags || []);
  return [...new Set(allTags)];
}

export function formatDate(
  date: string,
  includeRelative = false,
  locale = "pt",
) {
  if (!date) return "";
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  const intlLocale = locale === "en" ? "en-US" : "pt-BR";

  let formattedDate = "";

  if (locale === "en") {
    if (yearsAgo > 0) formattedDate = `${yearsAgo}y ago`;
    else if (monthsAgo > 0) formattedDate = `${monthsAgo}mo ago`;
    else if (daysAgo > 0) formattedDate = `${daysAgo}d ago`;
    else formattedDate = "Today";
  } else {
    if (yearsAgo > 0)
      formattedDate = `há ${yearsAgo} ano${yearsAgo > 1 ? "s" : ""}`;
    else if (monthsAgo > 0)
      formattedDate = `há ${monthsAgo} mês${monthsAgo > 1 ? "es" : ""}`;
    else if (daysAgo > 0)
      formattedDate = `há ${daysAgo} dia${daysAgo > 1 ? "s" : ""}`;
    else formattedDate = "Hoje";
  }

  const fullDate = targetDate.toLocaleString(intlLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
