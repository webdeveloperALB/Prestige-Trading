// pages/api/blog/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";

let posts: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const index = posts.findIndex((post) => post.id === id);

  if (req.method === "PUT") {
    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    posts[index] = { ...posts[index], ...req.body };
    return res.status(200).json(posts[index]);
  }

  if (req.method === "DELETE") {
    if (index === -1) {
      return res.status(404).json({ error: "Post not found" });
    }
    posts.splice(index, 1);
    return res.status(200).json({ success: true });
  }

  return res.status(405).end(); // Method Not Allowed
}
