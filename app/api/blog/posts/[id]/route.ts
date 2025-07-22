import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
        title: body.title,
        summary: body.summary,
        content: body.content,
        cover_image: body.coverImage,
        author: body.author,
        tags: body.tags,
        category: body.category,
        featured: body.featured,
        status: body.status,
        meta_title: body.metaTitle,
        meta_description: body.metaDescription,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
