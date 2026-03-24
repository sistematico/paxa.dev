import { db } from "@/db";
import { homepageViews, homepageVisitors } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

const COUNTER_ID = 1;

function getVisitorHash(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const ua = request.headers.get("user-agent") ?? "";
  return createHash("sha256").update(`${ip}:${ua}`).digest("hex");
}

function ensureCounter() {
  return db
    .insert(homepageViews)
    .values({ id: COUNTER_ID, totalViews: 0, uniqueViews: 0 })
    .onConflictDoNothing();
}

export async function GET() {
  await ensureCounter();

  const row = await db
    .select({
      totalViews: homepageViews.totalViews,
      uniqueViews: homepageViews.uniqueViews,
    })
    .from(homepageViews)
    .where(eq(homepageViews.id, COUNTER_ID))
    .get();

  return NextResponse.json({
    totalViews: row?.totalViews ?? 0,
    uniqueViews: row?.uniqueViews ?? 0,
  });
}

export async function POST(request: NextRequest) {
  await ensureCounter();

  const hash = getVisitorHash(request);

  // Always increment total views
  await db
    .update(homepageViews)
    .set({ totalViews: sql`${homepageViews.totalViews} + 1` })
    .where(eq(homepageViews.id, COUNTER_ID));

  // Check if this is a unique visitor
  const existing = await db
    .select({ hash: homepageVisitors.hash })
    .from(homepageVisitors)
    .where(eq(homepageVisitors.hash, hash))
    .get();

  if (!existing) {
    await db
      .insert(homepageVisitors)
      .values({ hash, createdAt: new Date().toISOString() });

    await db
      .update(homepageViews)
      .set({ uniqueViews: sql`${homepageViews.uniqueViews} + 1` })
      .where(eq(homepageViews.id, COUNTER_ID));
  }

  const row = await db
    .select({
      totalViews: homepageViews.totalViews,
      uniqueViews: homepageViews.uniqueViews,
    })
    .from(homepageViews)
    .where(eq(homepageViews.id, COUNTER_ID))
    .get();

  return NextResponse.json({
    totalViews: row?.totalViews ?? 0,
    uniqueViews: row?.uniqueViews ?? 0,
  });
}
