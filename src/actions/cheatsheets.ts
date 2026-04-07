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

    if (trimmedKey === "tags" && value.startsWith("[")) {
      metadata.tags = JSON.parse(value.replace(/'/g, '"'));
    } else if (trimmedKey === "tags") {
      return;
    } else {
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

export function getCheatSheets(locale = "pt") {
  const cheatsheets = getMDXData(
    path.join(process.cwd(), "src", "cheatsheets", locale),
    locale,
  );

  return cheatsheets.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export function getCheatSheetsByCategory(category: string, locale = "pt") {
  return getCheatSheets(locale).filter(
    (cheatsheet) => cheatsheet.metadata.category === category,
  );
}

export function getCheatSheetsByTag(tag: string, locale = "pt") {
  return getCheatSheets(locale).filter((cheatsheet) =>
    cheatsheet.metadata.tags?.includes(tag),
  );
}

export function getAllCategories(locale = "pt") {
  const cheatsheets = getCheatSheets(locale);
  const categories = [
    ...new Set(cheatsheets.map((cheatsheet) => cheatsheet.metadata.category)),
  ];
  return categories.filter(Boolean) as string[];
}

export function getAllTags(locale = "pt") {
  const cheatsheets = getCheatSheets(locale);
  const allTags = cheatsheets.flatMap(
    (cheatsheet) => cheatsheet.metadata.tags || [],
  );
  return [...new Set(allTags)];
}
