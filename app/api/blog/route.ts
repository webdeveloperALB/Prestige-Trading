// app/api/blog/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      summary: true,
      coverImage: true,
      publishedAt: true,
    },
  });

  const formatted = posts.map((post) => ({
    ...post,
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString()
      : null,
  }));

  return NextResponse.json(formatted);
}
