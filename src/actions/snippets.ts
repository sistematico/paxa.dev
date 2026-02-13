// src/actions/snippets.ts
import fs from "node:fs";
import path from "node:path";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  category?: string;
  tags?: string[];
};

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) {
    throw new Error("No frontmatter found");
  }
  const frontMatterBlock = match[1];
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
    } else if (trimmedKey === "tags") {
      // Keep as is for non-array tags
      return;
    } else {
      // Type-safe assignment for string properties
      metadata[trimmedKey] = value as never;
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

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: {
        ...metadata,
        category: metadata.category || "Sem categoria",
        tags: metadata.tags || [],
      },
      slug,
      content,
    };
  });
}

export function getSnippets() {
  const snippets = getMDXData(path.join(process.cwd(), "src", "snippets"));
  return snippets.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export function getSnippetsByCategory(category: string) {
  return getSnippets().filter(
    (snippet) => snippet.metadata.category === category,
  );
}

export function getSnippetsByTag(tag: string) {
  return getSnippets().filter((snippet) =>
    snippet.metadata.tags?.includes(tag),
  );
}

export function getAllCategories() {
  const snippets = getSnippets();
  const categories = [
    ...new Set(snippets.map((snippet) => snippet.metadata.category)),
  ];
  return categories.filter(Boolean) as string[];
}

export function getAllTags() {
  const snippets = getSnippets();
  const allTags = snippets.flatMap((snippet) => snippet.metadata.tags || []);
  return [...new Set(allTags)];
}
