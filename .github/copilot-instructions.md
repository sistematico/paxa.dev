# Paxa.dev — Copilot Instructions

## Projeto

Site pessoal / blog / portfólio de um desenvolvedor fullstack. URL: <https://paxa.dev>

## Stack Técnica

| Camada        | Tecnologia                             |
| ------------- | -------------------------------------- |
| Framework     | Next.js 16 (App Router)                |
| Runtime       | React 19, TypeScript 5                 |
| Estilo        | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Conteúdo      | MDX (`next-mdx-remote`, `@next/mdx`)  |
| Banco de dados | Drizzle ORM + better-sqlite3 (SQLite) |
| Validação     | Zod                                    |
| E-mail        | Nodemailer                             |
| Ícones        | lucide-react                           |
| Code highlight | sugar-high                            |
| Lint/Format   | Biome 2                                |
| Gerenciador   | pnpm                                   |

## Convenções

### Linguagem

- Interface do usuário (UI) em **português brasileiro (pt-BR)**.
- Código, nomes de variáveis e commits em **inglês**.

### Estilo de código

- Indentação: 2 espaços (configurado no Biome).
- Sem ponto e vírgula automático — seguir estilo existente.
- Imports com alias `@/*` → `./src/*`.
- Usar `import type` quando importar apenas tipos.
- Preferir Server Components; usar `"use client"` apenas quando necessário.
- Formulários: `useActionState` + Server Actions.

### Design System

O site usa um **tema dark permanente** (sem light mode). Não usar classes `dark:`.

Paleta definida em `src/app/globals.css` via `@theme`:

| Token               | Cor       | Uso                              |
| -------------------- | --------- | -------------------------------- |
| `--color-foreground` | `#c0c5ce` | Texto principal                  |
| `--color-background` | `#343d46` | Fundo da página                  |
| `--color-surface`    | `#2b3039` | Cards, sidebars, blocos          |
| `--color-surface-alt`| `#3d4652` | Hover em surfaces                |
| `--color-border`     | `#4f5b66` | Bordas                           |
| `--color-muted`      | `#65737e` | Texto secundário                 |
| `--color-accent`     | `#8fa1b3` | Links, destaques, interativos    |
| `--color-accent-hover`| `#a7bbd0`| Hover em accent                  |

Usar tokens do Tailwind (`text-foreground`, `bg-surface`, `border-border`, etc.) em vez de cores Tailwind genéricas (`neutral-*`, `slate-*`, `amber-*`).

### Estrutura de Páginas

- Páginas de listagem (posts, projetos, snippets, favoritos) usam layout `grid lg:grid-cols-4 gap-8` com sidebar à esquerda.
- Sidebar: cards com `bg-surface rounded-lg p-4` e heading `font-semibold mb-3`.
- Breadcrumbs: componente `<Breadcrumb>` presente em todas as páginas de seção.
- Margens: `container mx-auto` no layout root, `px-4 py-6` no main content.

### Banco de dados

- Schema Drizzle em `src/db/schema.ts`.
- Conexão em `src/db/index.ts` (singleton via `better-sqlite3`).
- SQLite armazenado em `data/paxa.db` (gitignored).
- Config em `drizzle.config.ts`.

### Conteúdo

- Posts em `src/posts/*.mdx` com frontmatter: `title`, `publishedAt`, `summary`, `category`, `tags`.
- Snippets em `src/snippets/*.mdx` com mesma estrutura.
- Projetos em `src/data/projects.json`.
- Bookmarks em `src/data/bookmarks.json`.

## Estrutura de pastas

```
src/
  actions/       # Server actions e data fetching
  app/           # App Router pages e API routes
  components/    # React components
  contexts/      # React contexts (AudioPlayer)
  data/          # JSON data files
  db/            # Drizzle ORM (schema, connection)
  posts/         # MDX blog posts
  snippets/      # MDX code snippets
```

## Scripts

```bash
pnpm dev        # Dev server
pnpm build      # Produção
pnpm start      # Serve build (porta 3001)
pnpm lint       # Biome check
pnpm format     # Biome format
pnpm db:generate # Drizzle Kit generate
pnpm db:migrate  # Drizzle Kit migrate
```
