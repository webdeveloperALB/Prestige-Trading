// components/RelatedPosts.tsx

interface RelatedPost {
  id: string
  title: string
  summary: string
}

export default function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.summary}</p>
        </div>
      ))}
    </div>
  )
}
