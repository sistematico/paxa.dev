"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-muted hover:text-accent transition-colors"
    >
      <ArrowLeft size={24} className="inline-block" /> {label}
    </Link>
  );
}
