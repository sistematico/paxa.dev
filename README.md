# paxa.dev

Site pessoal, blog e portfólio — [paxa.dev](https://paxa.dev)

## Stack

- **Framework**: vinext (Vite + App Router) + React 19
- **Linguagem**: TypeScript 5
- **Estilo**: Tailwind CSS v4
- **Bundler**: Vite 8
- **Conteúdo**: MDX (next-mdx-remote, @next/mdx)
- **Banco de dados**: Drizzle ORM + better-sqlite3 (SQLite)
- **Validação**: Zod
- **E-mail**: Nodemailer
- **Ícones**: lucide-react
- **Lint/Format**: Biome 2
- **Gerenciador**: pnpm

## Setup

```bash
pnpm install
pnpm db:migrate   # cria/atualiza o banco SQLite
pnpm dev           # inicia o servidor de desenvolvimento
```

## Scripts

| Comando            | Descrição                        |
| ------------------ | -------------------------------- |
| `pnpm dev`         | Dev server                       |
| `pnpm build`       | Build de produção                |
| `pnpm start`       | Serve build (porta 3001)         |
| `pnpm lint`        | Biome check                      |
| `pnpm format`      | Biome format                     |
| `pnpm db:generate` | Drizzle Kit generate migrations  |
| `pnpm db:migrate`  | Drizzle Kit migrate              |

## Estrutura

```
src/
  actions/       # Server actions e data fetching
  app/           # App Router pages e API routes
  components/    # React components
  contexts/      # React contexts
  data/          # JSON data files (projetos, bookmarks)
  db/            # Drizzle ORM (schema, conexão)
  posts/         # MDX blog posts
  snippets/      # MDX code snippets
```

## Deploy

O deploy é feito via GitHub Actions: o workflow faz SCP dos arquivos para o VPS e executa `scripts/deploy.sh`.

### Banco de dados persistente

O SQLite fica em `data/paxa.db` por padrão, mas esse caminho é **apagado a cada deploy** (o SCP sobrescreve o diretório com os arquivos do repo, que não incluem o banco). Para persistir os dados, defina `DATABASE_PATH` no `.env` do servidor apontando para fora do diretório do projeto:

```bash
# No servidor — executar uma vez
mkdir -p /var/data
cp /var/www/paxa.dev/data/paxa.db /var/data/paxa.db
chown nginx:nginx /var/data/paxa.db
```

```ini
# /var/www/paxa.dev/.env
DATABASE_PATH=/var/data/paxa.db
```

O `.env` é preservado pelo `git clean -e .env` no script de deploy, então o banco em `/var/data/` nunca é tocado por deploys subsequentes.

## Convenções

- UI em **português brasileiro**; código e commits em **inglês**
- Tema dark permanente — sem light mode
- Paleta de cores via tokens em `src/app/globals.css`
- Preferir Server Components; `"use client"` só quando necessário
- Formulários: `useActionState` + Server Actions
