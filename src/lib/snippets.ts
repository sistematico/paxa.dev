import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehypePrism from 'rehype-prism-plus';

const snippetsDirectory = path.join(process.cwd(), 'snippets');

export interface SnippetMetadata {
  title: string;
  description: string;
  language: string;
  category: string;
}

export interface Snippet {
  id: string;
  metadata: SnippetMetadata;
  code: string;
  highlightedCode: string;
}

export interface SnippetCategory {
  category: string;
  items: Snippet[];
}

export async function getAllSnippets(): Promise<SnippetCategory[]> {
  const categories = fs.readdirSync(snippetsDirectory);
  const snippetsByCategory: { [key: string]: Snippet[] } = {};

  for (const category of categories) {
    const categoryPath = path.join(snippetsDirectory, category);

    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Extrair código do conteúdo MDX
      const codeMatch = content.match(/```[\w]*\n([\s\S]*?)```/);
      const code = codeMatch ? codeMatch[1].trim() : '';

      // Processar com Prism
      const processedContent = await remark()
        .use(html)
        .use(rehypePrism, {
          showLineNumbers: true,
        })
        .process(content);

      const highlightedCode = processedContent.toString();

      const snippet: Snippet = {
        id: `${category}-${file.replace('.mdx', '')}`,
        metadata: data as SnippetMetadata,
        code,
        highlightedCode,
      };

      const categoryName = data.category || category;

      if (!snippetsByCategory[categoryName]) {
        snippetsByCategory[categoryName] = [];
      }

      snippetsByCategory[categoryName].push(snippet);
    }
  }

  // Converter para array de categorias
  return Object.entries(snippetsByCategory).map(([category, items]) => ({
    category,
    items,
  }));
}
