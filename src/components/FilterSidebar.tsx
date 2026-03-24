import Link from "next/link";

/* ── Sidebar card wrapper ── */

function SidebarCard({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        accent
          ? "bg-surface border border-accent/25"
          : "bg-surface border border-transparent"
      }`}
    >
      {children}
    </div>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
      {children}
    </h3>
  );
}

/* ── Active Filters ── */

interface ActiveFilter {
  label: string;
  value: string;
  clearHref: string;
}

function ActiveFilters({
  filters,
  clearAllHref,
  title = "Filtros ativos",
  clearLabel = "Limpar",
}: {
  filters: ActiveFilter[];
  clearAllHref: string;
  title?: string;
  clearLabel?: string;
}) {
  if (filters.length === 0) return null;

  return (
    <SidebarCard accent>
      <div className="flex items-center justify-between mb-3">
        <SidebarHeading>{title}</SidebarHeading>
        <Link
          href={clearAllHref}
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          {clearLabel}
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.clearHref}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full hover:bg-accent/20 transition-colors"
            title={f.label}
          >
            <span>{f.value}</span>
            <span className="opacity-60 text-[10px] leading-none">✕</span>
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
}

/* ── Category List ── */

interface CategoryItem {
  label: string;
  href: string;
  active?: boolean;
}

function CategoryList({
  items,
  title = "Categorias",
  allLabel = "Todas",
  allHref,
  allActive,
}: {
  items: CategoryItem[];
  title?: string;
  allLabel?: string;
  allHref: string;
  allActive: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <SidebarCard>
      <SidebarHeading>{title}</SidebarHeading>
      <ul className="space-y-0.5">
        <li>
          <Link
            href={allHref}
            className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
              allActive
                ? "bg-accent/15 text-accent font-medium"
                : "text-foreground hover:bg-surface-alt"
            }`}
          >
            {allLabel}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                item.active
                  ? "bg-accent/15 text-accent font-medium"
                  : "text-foreground hover:bg-surface-alt"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </SidebarCard>
  );
}

/* ── Pill Cloud (tags / techs) ── */

interface PillItem {
  label: string;
  href: string;
  active?: boolean;
}

function PillCloud({
  items,
  title = "Tags",
}: {
  items: PillItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <SidebarCard>
      <SidebarHeading>{title}</SidebarHeading>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
              item.active
                ? "bg-accent text-background font-medium"
                : "bg-surface-alt text-foreground hover:bg-border"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </SidebarCard>
  );
}

/* ── Stats ── */

interface StatItem {
  label: string;
  value: string | number;
}

function Stats({
  items,
  title = "Estatísticas",
}: {
  items: StatItem[];
  title?: string;
}) {
  return (
    <SidebarCard>
      <SidebarHeading>{title}</SidebarHeading>
      <div className="space-y-2.5 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-muted">{item.label}</span>
            <span className="font-medium tabular-nums text-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

export {
  ActiveFilters,
  CategoryList,
  PillCloud,
  Stats,
  SidebarCard,
  SidebarHeading,
};
export type { ActiveFilter, CategoryItem, PillItem, StatItem };
