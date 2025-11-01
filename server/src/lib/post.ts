import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { PostMetadata, PostsByYear } from 'shared/dist';

/**
 * Parse valor para string
 */
function parseString(value: unknown, defaultValue = ''): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.join(', ');
  return defaultValue;
}

/**
 * Parse valor para array
 */
function parseArray(value: unknown): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return value.split(',').map(s => s.trim()).filter(Boolean);
  return [];
}

/**
 * Extrai frontmatter
 */
function parseFrontmatter(content: string): Record<string, unknown> {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match?.[1]) return {};
  
  const metadata: Record<string, unknown> = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
    
    // Parse arrays [item1, item2]
    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      try {
        const parsed = JSON.parse(rawValue.replace(/'/g, '"'));
        metadata[key] = Array.isArray(parsed) ? parsed : rawValue;
      } catch {
        const items = rawValue.slice(1, -1).split(',')
          .map(s => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
        metadata[key] = items.length > 0 ? items : rawValue;
      }
    } else {
      metadata[key] = rawValue;
    }
  }
  
  return metadata;
}

/**
 * Extrai excerpt
 */
function extractExcerpt(content: string, maxLength = 160): string {
  const withoutFrontmatter = content.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
  const withoutHeadings = withoutFrontmatter.replace(/^#{1,6}\s+.*$/gm, '');
  const paragraphs = withoutHeadings.split('\n\n').map(p => p.trim()).filter(Boolean);
  const text = paragraphs[0] || '';
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
}

/**
 * Converte metadata para PostMetadata
 */
function toPostMetadata(metadata: Record<string, unknown>, filename: string, content: string): PostMetadata {
  const slug = parseString(metadata.slug) || path.parse(filename).name;
  const dateRaw = parseString(metadata.date);
  const date: string | undefined = dateRaw !== '' ? dateRaw : new Date().toISOString().split('T')[0];
  const excerpt = parseString(metadata.excerpt) || extractExcerpt(content);
  const title = parseString(metadata.title) || slug.replace(/-/g, ' ');
  const author = parseString(metadata.author) || undefined;
  
  return {
    title,
    slug,
    date: date ?? '',
    excerpt,
    tags: parseArray(metadata.tags),
    author,
  };
}

/**
 * Lê e indexa todos os posts
 */
export async function indexPosts(postsDirectory: string): Promise<{
  posts: PostMetadata[];
  postsByYear: PostsByYear;
}> {
  try {
    const files = await readdir(postsDirectory);
    const mdxFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    
    const posts: PostMetadata[] = await Promise.all(
      mdxFiles.map(async (file) => {
        const content = await readFile(path.join(postsDirectory, file), 'utf-8');
        const metadata = parseFrontmatter(content);
        return toPostMetadata(metadata, file, content);
      })
    );

    const publishedPosts: PostMetadata[] = posts.filter(post => post.published);
    
    // Ordena por data (mais recentes primeiro)
    publishedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Agrupa por ano
    const postsByYear: PostsByYear = {};
    for (const post of publishedPosts) {
      const year = new Date(post.date).getFullYear().toString();
      if (!postsByYear[year]) postsByYear[year] = [];
      postsByYear[year].push(post);
    }
    
    return { posts: publishedPosts, postsByYear };
  } catch (error) {
    console.error('Error indexing posts:', error);
    return { posts: [], postsByYear: {} };
  }
}

/**
 * Busca post por slug
 */
export async function getPostBySlug(postsDirectory: string, slug: string): Promise<PostMetadata | null> {
  const { posts } = await indexPosts(postsDirectory);
  return posts.find(p => p.slug === slug) || null;
}

/**
 * Lê conteúdo do post
 */
export async function getPostContent(postsDirectory: string, slug: string): Promise<string | null> {
  try {
    const files = await readdir(postsDirectory);
    const mdxFiles = files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    
    for (const file of mdxFiles) {
      const content = await readFile(path.join(postsDirectory, file), 'utf-8');
      const metadata = parseFrontmatter(content);
      const fileSlug = parseString(metadata.slug) || path.parse(file).name;
      
      if (fileSlug === slug) return content;
    }
    
    return null;
  } catch (error) {
    console.error('Error reading post content:', error);
    return null;
  }
}

/**
 * Busca post completo com conteúdo
 */
export async function getFullPost(postsDirectory: string, slug: string): Promise<{ post: PostMetadata; content: string } | null> {
  try {
    const content = await getPostContent(postsDirectory, slug);
    if (!content) return null;
    
    const metadata = parseFrontmatter(content);
    const post = toPostMetadata(metadata, slug, content);
    
    return { post, content };
  } catch (error) {
    console.error('Error getting full post:', error);
    return null;
  }
}