"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";
import { usePathname } from "next/navigation";

interface ViewData {
  totalViews: number;
  uniqueViews: number;
}

export default function HomepageViewCounter() {
  const [data, setData] = useState<ViewData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHomepage =
      pathname === "/" || pathname === "/pt" || pathname === "/en";
    const method = isHomepage ? "POST" : "GET";

    fetch("/api/homepage-views", { method })
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, [pathname]);

  if (!data) return null;

  return (
    <div className="flex items-center gap-4 text-sm text-muted">
      <span className="inline-flex items-center gap-1">
        <Eye className="size-4" />
        {data.totalViews} {data.totalViews === 1 ? "visita" : "visitas"}
      </span>
      <span className="inline-flex items-center gap-1">
        <Users className="size-4" />
        {data.uniqueViews} {data.uniqueViews === 1 ? "única" : "únicas"}
      </span>
    </div>
  );
}
