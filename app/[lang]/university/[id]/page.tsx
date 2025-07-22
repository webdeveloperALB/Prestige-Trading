import { Suspense } from "react";
import { notFound } from "next/navigation";
import UniversityPostClient from "./client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPost(id: string) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .eq("status", "published")
      .single();

    if (error || !data) {
      return null;
    }

    // Transform data to match frontend expectations
    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: data.content,
      coverImage: data.cover_image,
      publishedAt: data.published_at,
      author: data.author,
      tags: data.tags,
      category: data.category,
      featured: data.featured,
      status: data.status,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getRelatedPosts(currentId: string, category: string) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .neq("id", currentId)
      .limit(3)
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    // Transform data to match frontend expectations
    return (
      data?.map((post) => ({
        id: post.id,
        title: post.title,
        summary: post.summary,
        content: post.content,
        coverImage: post.cover_image,
        publishedAt: post.published_at,
        author: post.author,
        tags: post.tags,
        category: post.category,
        featured: post.featured,
        status: post.status,
        metaTitle: post.meta_title,
        metaDescription: post.meta_description,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function UniversityPostPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(params.id, post.category);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UniversityPostClient
        post={post}
        relatedPosts={relatedPosts}
        lang={params.lang}
      />
    </Suspense>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.summary,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.summary,
      images: [post.coverImage],
    },
  };
}
