import Link from "next/link";
import { formatDate } from "@/actions/posts";
import type { Dictionary } from "@/i18n";

interface CheatSheetsProps {
  cheatsheets: Array<{
    slug: string;
    metadata: {
      title: string;
      publishedAt: string;
      summary: string;
      category?: string;
      tags?: string[];
    };
  }>;
  category?: string;
  tag?: string;
  locale?: string;
  dict?: Dictionary["cheatsheets"];
}

export default function CheatSheets({
  cheatsheets,
  category,
  tag,
  locale = "pt",
  dict,
}: CheatSheetsProps) {
  let filteredCheatSheets = cheatsheets;

  if (category) {
    filteredCheatSheets = filteredCheatSheets.filter(
      (cheatsheet) => cheatsheet.metadata.category === category,
    );
  }

  if (tag) {
    filteredCheatSheets = filteredCheatSheets.filter((cheatsheet) =>
      cheatsheet.metadata.tags?.includes(tag),
    );
  }

  return (
    <div className="space-y-6">
      {filteredCheatSheets.map((cheatsheet) => (
        <article
          key={cheatsheet.slug}
          className="group border-b border-border last:border-0 pb-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
            <time
              dateTime={cheatsheet.metadata.publishedAt}
              className="text-muted tabular-nums"
            >
              {formatDate(cheatsheet.metadata.publishedAt, false, locale)}
            </time>

            {cheatsheet.metadata.category && (
              <>
                <span className="text-border">•</span>
                <span className="px-2 py-0.5 bg-surface text-foreground text-xs rounded">
                  {cheatsheet.metadata.category}
                </span>
              </>
            )}
          </div>

          <Link href={`/cheatsheets/${cheatsheet.slug}`}>
            <h2 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
              {cheatsheet.metadata.title}
            </h2>
          </Link>

          {cheatsheet.metadata.summary && (
            <p className="text-sm text-muted mb-3 line-clamp-2">
              {cheatsheet.metadata.summary}
            </p>
          )}

          {cheatsheet.metadata.tags && cheatsheet.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cheatsheet.metadata.tags.map((tagName) => (
                <Link
                  key={tagName}
                  href={`/cheatsheets?tag=${encodeURIComponent(tagName)}`}
                  className="text-xs text-muted hover:text-accent transition-colors"
                >
                  #{tagName}
                </Link>
              ))}
            </div>
          )}
        </article>
      ))}

      {filteredCheatSheets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">
            {dict?.noCheatSheetsFound ?? "Nenhum cheatsheet encontrado"}
            {(category || tag) && (
              <>
                {" "}
                para {category && <strong>{category}</strong>}
                {tag && <strong>#{tag}</strong>}
              </>
            )}
          </p>
          {(category || tag) && (
            <Link
              href="/cheatsheets"
              className="text-sm text-accent hover:text-accent-hover mt-2 inline-block"
            >
              {dict?.seeAllCheatSheets ?? "Ver todos os cheatsheets →"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
