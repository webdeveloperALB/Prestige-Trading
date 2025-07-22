import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          title: body.title,
          summary: body.summary,
          content: body.content,
          cover_image: body.coverImage,
          author: body.author || "Admin",
          tags: body.tags || [],
          category: body.category || "University News",
          featured: body.featured || false,
          status: body.status || "draft",
          meta_title: body.metaTitle || body.title,
          meta_description: body.metaDescription || body.summary,
          published_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the response to match frontend expectations
    const transformedData = {
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

    return NextResponse.json(transformedData);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
