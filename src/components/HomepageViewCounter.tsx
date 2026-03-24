"use client";

import { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";

interface ViewData {
  totalViews: number;
  uniqueViews: number;
}

export default function HomepageViewCounter() {
  const [data, setData] = useState<ViewData | null>(null);

  useEffect(() => {
    fetch("/api/homepage-views", { method: "POST" })
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

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
