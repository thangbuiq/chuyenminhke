import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const comments = await prisma.comment.findMany({
    where: { slug },
    orderBy: { timestamp: "desc" },
  });
  return NextResponse.json(comments);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const body = await req.json();

  const comment = await prisma.comment.create({
    data: {
      slug,
      author: body.author,
      content: body.content,
    },
  });

  return NextResponse.json(comment);
}
