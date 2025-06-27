import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const like = await prisma.like.findUnique({ where: { slug: params.slug } });
  return NextResponse.json({ count: like?.count || 0 });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const like = await prisma.like.upsert({
    where: { slug: params.slug },
    update: { count: { increment: 1 } },
    create: { slug: params.slug, count: 1 },
  });
  return NextResponse.json({ count: like.count });
}
