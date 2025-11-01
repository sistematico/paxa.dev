import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { SnippetMetadata, SnippetsByCategory } from 'shared/dist';

/**
 * Extrai o frontmatter de um arquivo MDX
 */
function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterText = match[1];
  const metadata: Record<string, any> = {};

  if (!frontmatterText) return metadata;
  
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      metadata[key.trim()] = value;
    }
  });
  
  return metadata;
}

/**
 * Extrai descrição do conteúdo do snippet
 */
function extractDescription(content: string, maxLength: number = 160): string {
  const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const withoutCodeBlocks = contentWithoutFrontmatter.replace(/```[\s\S]*?```/g, '');
  const withoutHeadings = withoutCodeBlocks.replace(/^#{1,6}\s+.*$/gm, '');
  
  const paragraphs = withoutHeadings
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  const description = paragraphs[0] || '';
  
  if (description.length <= maxLength) {
    return description;
  }
  
  return description.substring(0, maxLength).trim() + '...';
}

/**
 * Lê e indexa todos os snippets MDX do diretório
 */
export async function indexSnippets(snippetsDirectory: string): Promise<{
  snippets: SnippetMetadata[];
  snippetsByCategory: SnippetsByCategory;
  categories: string[];
}> {
  try {
    const files = await readdir(snippetsDirectory);
    
    const mdxFiles = files.filter(
      file => file.endsWith('.mdx') || file.endsWith('.md')
    );
    
    const snippets: SnippetMetadata[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(snippetsDirectory, file);
        const content = await readFile(filePath, 'utf-8');
        const metadata = parseFrontmatter(content);
        
        const slug = metadata.slug || path.parse(file).name;
        const description = metadata.description || extractDescription(content);
        
        return {
          title: metadata.title || slug.replace(/-/g, ' '),
          slug,
          category: metadata.category || 'Outros',
          language: metadata.language || 'text',
          description,
          tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : metadata.tags.split(',').map((t: string) => t.trim())) : [],
          date: metadata.date || new Date().toISOString().split('T')[0],
        };
      })
    );
    
    // Ordena snippets por título
    snippets.sort((a, b) => a.title.localeCompare(b.title));
    
    // Agrupa snippets por categoria
    const snippetsByCategory: SnippetsByCategory = {};
    const categoriesSet = new Set<string>();
    
    snippets.forEach(snippet => {
      const category = snippet.category;
      categoriesSet.add(category);
      
      if (!snippetsByCategory[category]) {
        snippetsByCategory[category] = [];
      }
      
      snippetsByCategory[category].push(snippet);
    });
    
    const categories = Array.from(categoriesSet).sort();
    
    return { snippets, snippetsByCategory, categories };
  } catch (error) {
    console.error('Error indexing snippets:', error);
    return { snippets: [], snippetsByCategory: {}, categories: [] };
  }
}

/**
 * Busca um snippet específico pelo slug
 */
export async function getSnippetBySlug(snippetsDirectory: string, slug: string): Promise<SnippetMetadata | null> {
  try {
    const { snippets } = await indexSnippets(snippetsDirectory);
    return snippets.find(snippet => snippet.slug === slug) || null;
  } catch (error) {
    console.error('Error getting snippet by slug:', error);
    return null;
  }
}

/**
 * Lê o conteúdo completo de um snippet
 */
export async function getSnippetContent(snippetsDirectory: string, slug: string): Promise<string | null> {
  try {
    const files = await readdir(snippetsDirectory);
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    
    for (const file of mdxFiles) {
      const filePath = path.join(snippetsDirectory, file);
      const content = await readFile(filePath, 'utf-8');
      const metadata = parseFrontmatter(content);
      
      const fileSlug = metadata.slug || path.parse(file).name;
      
      if (fileSlug === slug) {
        return content;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error reading snippet content:', error);
    return null;
  }
}

/**
 * Busca snippet completo com conteúdo pelo slug
 */
export async function getFullSnippet(snippetsDirectory: string, slug: string): Promise<{ snippet: SnippetMetadata; content: string } | null> {
  try {
    const content = await getSnippetContent(snippetsDirectory, slug);
    
    if (!content) return null;
    
    const metadata = parseFrontmatter(content);
    const description = metadata.description || extractDescription(content);
    
    const snippet: SnippetMetadata = {
      title: metadata.title || slug.replace(/-/g, ' '),
      slug: metadata.slug || slug,
      category: metadata.category || 'Outros',
      language: metadata.language || 'text',
      description,
      tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : metadata.tags.split(',').map((t: string) => t.trim())) : [],
      date: metadata.date,
    };
    
    return { snippet, content };
  } catch (error) {
    console.error('Error getting full snippet:', error);
    return null;
  }
}