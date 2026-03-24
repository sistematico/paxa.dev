import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  items,
  homeLabel = "Início",
  homeHref = "/",
}: {
  items: BreadcrumbItem[];
  homeLabel?: string;
  homeHref?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex items-center gap-1.5 text-muted">
        <li>
          <Link href={homeHref} className="hover:text-accent transition-colors">
            {homeLabel}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
