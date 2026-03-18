"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function PostViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const url = `/api/views/${encodeURIComponent(slug)}`;

    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted">
      <Eye className="size-4" />
      {views} {views === 1 ? "visualização" : "visualizações"}
    </span>
  );
}
