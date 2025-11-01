import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { PostMetadata, PostsByYear } from 'shared/dist';

/**
 * Extrai o frontmatter de um arquivo MDX
 */
function parseFrontmatter(content: string): Record<string, string | string[]> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterText = match[1];
  const metadata: Record<string, string | string[]> = {};

  if (!frontmatterText) return metadata;
  
  frontmatterText.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value: string | string[] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      
      // Parse arrays no formato YAML
      if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
        try {
          const parsed = JSON.parse(value.replace(/'/g, '"'));
          if (Array.isArray(parsed)) {
            value = parsed;
          }
        } catch {
          // Se falhar, tenta split por vírgula
          const arrayValue = value.slice(1, -1).split(',').map((item: string) => 
            item.trim().replace(/^["']|["']$/g, '')
          ).filter(Boolean);
          value = arrayValue;
        }
      }
      
      metadata[key.trim()] = value;
    }
  });
  
  return metadata;
}

/**
 * Extrai um excerpt do conteúdo do post (primeiros parágrafos)
 */
function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove o frontmatter
  const contentWithoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  
  // Remove títulos markdown
  const withoutHeadings = contentWithoutFrontmatter.replace(/^#{1,6}\s+.*$/gm, '');
  
  // Pega os primeiros parágrafos não vazios
  const paragraphs = withoutHeadings
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  const excerpt = paragraphs[0] || '';
  
  if (excerpt.length <= maxLength) {
    return excerpt;
  }
  
  return excerpt.substring(0, maxLength).trim() + '...';
}

/**
 * Converte valor do frontmatter para string
 */
function getStringValue(value: string | string[] | undefined, defaultValue: string = ''): string {
  if (value === undefined) return defaultValue;
  if (typeof value === 'string') return value;
  return value.join(', ');
}

/**
 * Converte valor do frontmatter para string opcional
 */
function getOptionalStringValue(value: string | string[] | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'string') return value;
  return value.join(', ');
}

/**
 * Converte valor do frontmatter para array de strings
 */
function getArrayValue(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(t => t.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Lê e indexa todos os posts MDX do diretório
 */
export async function indexPosts(postsDirectory: string): Promise<{
  posts: PostMetadata[];
  postsByYear: PostsByYear;
}> {
  try {
    const files = await readdir(postsDirectory);
    
    const mdxFiles = files.filter(
      file => file.endsWith('.mdx') || file.endsWith('.md')
    );
    
    const posts: PostMetadata[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const content = await readFile(filePath, 'utf-8');
        const metadata = parseFrontmatter(content);
        
        // Usa o slug do frontmatter ou gera a partir do nome do arquivo
        const slug = getStringValue(metadata.slug, path.parse(file).name);
        
        // Gera excerpt se não existir no frontmatter
        const excerpt = getStringValue(metadata.excerpt, extractExcerpt(content));
        
        // Data padrão se não fornecida
        const date = getStringValue(metadata.date, new Date().toISOString().split('T')[0]);
        
        return {
          title: getStringValue(metadata.title, slug.replace(/-/g, ' ')),
          slug,
          date,
          excerpt,
          tags: getArrayValue(metadata.tags),
          author: getOptionalStringValue(metadata.author),
        };
      })
    );
    
    // Ordena posts por data (mais recentes primeiro)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Agrupa posts por ano
    const postsByYear: PostsByYear = {};
    
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      
      if (!postsByYear[year]) {
        postsByYear[year] = [];
      }
      
      postsByYear[year].push(post);
    });
    
    return { posts, postsByYear };
  } catch (error) {
    console.error('Error indexing posts:', error);
    return { posts: [], postsByYear: {} };
  }
}

/**
 * Busca um post específico pelo slug
 */
export async function getPostBySlug(postsDirectory: string, slug: string): Promise<PostMetadata | null> {
  try {
    const { posts } = await indexPosts(postsDirectory);
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error getting post by slug:', error);
    return null;
  }
}

/**
 * Lê o conteúdo completo de um post
 */
export async function getPostContent(postsDirectory: string, slug: string): Promise<string | null> {
  try {
    console.log(`[getPostContent] Searching for slug: ${slug}`);
    console.log(`[getPostContent] Directory: ${postsDirectory}`);
    
    const files = await readdir(postsDirectory);
    console.log(`[getPostContent] Files found: ${files.join(', ')}`);
    
    // Filtra apenas arquivos .md e .mdx
    const mdxFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
    console.log(`[getPostContent] MDX files: ${mdxFiles.join(', ')}`);
    
    // Procura o arquivo correspondente
    for (const file of mdxFiles) {
      const filePath = path.join(postsDirectory, file);
      const content = await readFile(filePath, 'utf-8');
      const metadata = parseFrontmatter(content);
      
      // Verifica se o slug do frontmatter corresponde
      const fileSlug = getStringValue(metadata.slug, path.parse(file).name);
      console.log(`[getPostContent] File: ${file}, Slug: ${fileSlug}`);
      
      if (fileSlug === slug) {
        console.log(`[getPostContent] Match found! File: ${file}`);
        return content;
      }
    }
    
    console.log(`[getPostContent] No match found for slug: ${slug}`);
    return null;
  } catch (error) {
    console.error('[getPostContent] Error reading post content:', error);
    return null;
  }
}

/**
 * Busca post completo com conteúdo pelo slug
 */
export async function getFullPost(postsDirectory: string, slug: string): Promise<{ post: PostMetadata; content: string } | null> {
  try {
    const content = await getPostContent(postsDirectory, slug);
    
    if (!content) return null;
    
    const metadata = parseFrontmatter(content);
    const excerpt = getStringValue(metadata.excerpt, extractExcerpt(content));
    const date = getStringValue(metadata.date, new Date().toISOString().split('T')[0]);
    
    const post: PostMetadata = {
      title: getStringValue(metadata.title, slug.replace(/-/g, ' ')),
      slug: getStringValue(metadata.slug, slug),
      date,
      excerpt,
      tags: getArrayValue(metadata.tags),
      author: getOptionalStringValue(metadata.author),
    };
    
    return { post, content };
  } catch (error) {
    console.error('Error getting full post:', error);
    return null;
  }
}