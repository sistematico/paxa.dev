import { db } from "@/db";
import { postViews } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const row = await db
    .select({ views: postViews.views })
    .from(postViews)
    .where(eq(postViews.slug, slug))
    .get();

  return NextResponse.json({ views: row?.views ?? 0 });
}

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  await db
    .insert(postViews)
    .values({ slug, views: 1 })
    .onConflictDoUpdate({
      target: postViews.slug,
      set: { views: sql`${postViews.views} + 1` },
    });

  const row = await db
    .select({ views: postViews.views })
    .from(postViews)
    .where(eq(postViews.slug, slug))
    .get();

  return NextResponse.json({ views: row?.views ?? 0 });
}
