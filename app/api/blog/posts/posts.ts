// app/api/blog/posts.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const all = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      // Return every field, including content
      select: {
        id: true,
        title: true,
        summary: true,
        content: true,
        coverImage: true,
        publishedAt: true,
        author: true,
      },
    });
    return NextResponse.json(all);
  } catch (e: any) {
    console.error("GET /api/blog/posts error:", e);
    return NextResponse.json(
      { error: e.message || "Unable to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // body should contain: title, summary, content, coverImage, author
    const created = await prisma.blogPost.create({
      data: {
        title: body.title,
        summary: body.summary,
        content: body.content,
        coverImage: body.coverImage,
        author: body.author,
        // publishedAt will be set to now() automatically
      },
    });
    return NextResponse.json(created);
  } catch (e: any) {
    console.error("POST /api/blog/posts error:", e);
    return NextResponse.json(
      { error: e.message || "Unable to create post" },
      { status: 500 }
    );
  }
}