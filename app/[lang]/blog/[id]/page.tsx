import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: { id: string };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  const all = await prisma.blogPost.findMany({ select: { id: true } });
  return all.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    select: { title: true, summary: true },
  });

  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.summary ?? "",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!post) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: { id: { not: params.id } },
    select: { id: true, title: true, summary: true },
    take: 3,
  });

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
