// app/api/[slug]/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  const like = await prisma.like.findUnique({ where: { slug } });
  return NextResponse.json({ count: like?.count || 0 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;
  const like = await prisma.like.upsert({
    where: { slug },
    update: { count: { increment: 1 } },
    create: { slug, count: 1 },
  });
  return NextResponse.json({ count: like.count });
}
