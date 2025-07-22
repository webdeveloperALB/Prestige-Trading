import { Suspense } from "react";
import UniversityClient from "./client";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
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
    console.error("Error in getPosts:", error);
    return [];
  }
}

export default async function UniversityPage({
  params,
}: {
  params: { lang: string };
}) {
  const posts = await getPosts();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UniversityClient posts={posts} lang={params.lang} />
    </Suspense>
  );
}
