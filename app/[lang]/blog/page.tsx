// app/blog/page.tsx
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
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

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <p>{post.publishedAt?.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
