import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { PostMetadata, PostsByYear } from 'shared';

/**
 * Extrai o frontmatter de um arquivo MDX
 */
function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterText = match[1];
  const metadata: Record<string, any> = {};

  if (!frontmatterText) return {};
  
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
        const slug = metadata.slug || path.parse(file).name;
        
        // Gera excerpt se não existir no frontmatter
        const excerpt = metadata.excerpt || extractExcerpt(content);
        
        return {
          title: metadata.title || slug.replace(/-/g, ' '),
          slug,
          date: metadata.date || new Date().toISOString().split('T')[0],
          excerpt,
          tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : metadata.tags.split(',').map((t: string) => t.trim())) : [],
          author: metadata.author,
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
    const files = await readdir(postsDirectory);
    const mdxFile = files.find(file => {
      const fileSlug = path.parse(file).name;
      return fileSlug === slug && (file.endsWith('.mdx') || file.endsWith('.md'));
    });
    
    if (!mdxFile) return null;
    
    const filePath = path.join(postsDirectory, mdxFile);
    const content = await readFile(filePath, 'utf-8');
    
    return content;
  } catch (error) {
    console.error('Error reading post content:', error);
    return null;
  }
}