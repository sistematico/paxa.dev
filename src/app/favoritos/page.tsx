import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Favoritos - paxa.dev',
  description: 'Coleção de links úteis e recursos favoritos para desenvolvimento',
};

interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

interface BookmarkCategory {
  category: string;
  icon: string;
  items: Bookmark[];
}

const bookmarks: BookmarkCategory[] = [
  {
    category: 'Documentação',
    icon: '📚',
    items: [
      {
        id: 'doc-1',
        title: 'React Documentation',
        description: 'Documentação oficial do React',
        url: 'https://react.dev',
        tags: ['react', 'javascript'],
      },
      {
        id: 'doc-2',
        title: 'Next.js Docs',
        description: 'Documentação completa do Next.js',
        url: 'https://nextjs.org/docs',
        tags: ['nextjs', 'react'],
      },
      {
        id: 'doc-3',
        title: 'TypeScript Handbook',
        description: 'Guia completo de TypeScript',
        url: 'https://www.typescriptlang.org/docs',
        tags: ['typescript'],
      },
      {
        id: 'doc-4',
        title: 'MDN Web Docs',
        description: 'Recursos para desenvolvedores web',
        url: 'https://developer.mozilla.org',
        tags: ['javascript', 'css', 'html'],
      },
    ],
  },
  {
    category: 'Ferramentas',
    icon: '🛠️',
    items: [
      {
        id: 'tool-1',
        title: 'Can I Use',
        description: 'Tabelas de compatibilidade de navegadores',
        url: 'https://caniuse.com',
        tags: ['css', 'javascript'],
      },
      {
        id: 'tool-2',
        title: 'Regex101',
        description: 'Testar e debugar expressões regulares',
        url: 'https://regex101.com',
        tags: ['regex', 'tools'],
      },
      {
        id: 'tool-3',
        title: 'Vercel',
        description: 'Plataforma de deploy para aplicações web',
        url: 'https://vercel.com',
        tags: ['deploy', 'hosting'],
      },
      {
        id: 'tool-4',
        title: 'GitHub',
        description: 'Plataforma de versionamento e colaboração',
        url: 'https://github.com',
        tags: ['git', 'versionamento'],
      },
    ],
  },
  {
    category: 'Design & UI',
    icon: '🎨',
    items: [
      {
        id: 'design-1',
        title: 'Tailwind CSS',
        description: 'Framework CSS utility-first',
        url: 'https://tailwindcss.com',
        tags: ['css', 'tailwind'],
      },
      {
        id: 'design-2',
        title: 'Lucide Icons',
        description: 'Biblioteca de ícones SVG',
        url: 'https://lucide.dev',
        tags: ['icons', 'svg'],
      },
      {
        id: 'design-3',
        title: 'Coolors',
        description: 'Gerador de paletas de cores',
        url: 'https://coolors.co',
        tags: ['colors', 'design'],
      },
      {
        id: 'design-4',
        title: 'Dribbble',
        description: 'Inspiração e portfólios de design',
        url: 'https://dribbble.com',
        tags: ['design', 'inspiration'],
      },
    ],
  },
  {
    category: 'Aprendizado',
    icon: '📖',
    items: [
      {
        id: 'learn-1',
        title: 'Frontend Masters',
        description: 'Cursos avançados de desenvolvimento frontend',
        url: 'https://frontendmasters.com',
        tags: ['courses', 'learning'],
      },
      {
        id: 'learn-2',
        title: 'JavaScript.info',
        description: 'Tutorial moderno de JavaScript',
        url: 'https://javascript.info',
        tags: ['javascript', 'tutorial'],
      },
      {
        id: 'learn-3',
        title: 'Web.dev',
        description: 'Guias e recursos do Google para web',
        url: 'https://web.dev',
        tags: ['performance', 'best-practices'],
      },
      {
        id: 'learn-4',
        title: 'freeCodeCamp',
        description: 'Aprenda a programar gratuitamente',
        url: 'https://www.freecodecamp.org',
        tags: ['learning', 'free'],
      },
    ],
  },
  {
    category: 'Blogs & Artigos',
    icon: '✍️',
    items: [
      {
        id: 'posts-1',
        title: 'CSS-Tricks',
        description: 'Artigos e tutoriais sobre CSS',
        url: 'https://css-tricks.com',
        tags: ['css', 'articles'],
      },
      {
        id: 'posts-2',
        title: 'Smashing Magazine',
        description: 'Revista online para web designers',
        url: 'https://www.smashingmagazine.com',
        tags: ['design', 'development'],
      },
      {
        id: 'posts-3',
        title: 'Dev.to',
        description: 'Comunidade de desenvolvedores',
        url: 'https://dev.to',
        tags: ['community', 'articles'],
      },
      {
        id: 'posts-4',
        title: 'Josh W Comeau',
        description: 'Blog sobre React e desenvolvimento web',
        url: 'https://www.joshwcomeau.com',
        tags: ['react', 'css', 'posts'],
      },
    ],
  },
];

export default function BookmarksPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Bookmarks</h1>
          <p className="text-lg text-[--muted]">
            Recursos e ferramentas úteis para desenvolvimento web
          </p>
        </header>

        <div className="space-y-12">
          {bookmarks.map((category) => (
            <section key={category.category} id={category.category.toLowerCase().replace(/\s/g, '-')}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-[--border] flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                {category.category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((bookmark) => (
                  <a
                    key={bookmark.id}
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border bg-[--surface] border-[--border] hover:border-[--link]"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-[--link]">
                        {bookmark.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-[--muted] group-hover:text-[--link] flex-shrink-0" />
                    </div>

                    <p className="text-[--muted] text-sm mb-3">
                      {bookmark.description}
                    </p>

                    {bookmark.tags && (
                      <div className="flex flex-wrap gap-2">
                        {bookmark.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded bg-[--chip-bg] text-[--chip-fg]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-[--muted] mt-3 truncate">
                      {bookmark.url}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <nav className="mt-12 p-6 rounded-lg bg-[--surface] border border-[--border]">
          <h3 className="text-lg font-semibold mb-4">Índice de Categorias</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {bookmarks.map((category) => (
              <li key={category.category}>
                <a
                  href={`#${category.category.toLowerCase().replace(/\s/g, '-')}`}
                  className="flex items-center gap-2 text-[--link] hover:underline"
                >
                  <span>{category.icon}</span>
                  <span>{category.category}</span>
                  <span className="text-[--muted] text-sm">({category.items.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
