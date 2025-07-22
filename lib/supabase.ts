import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side usage
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: "draft" | "published" | "scheduled";
  metaTitle: string;
  metaDescription: string;
  readingTime?: number;
  createdAt: string;
  updatedAt: string;
}

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("publishedAt", { ascending: false });

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}

export async function getRelatedPosts(
  currentPostId: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .neq("id", currentPostId)
    .order("publishedAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }

  return data || [];
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
