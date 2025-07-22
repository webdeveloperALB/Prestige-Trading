"use client";

import { Clock, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import RelatedPosts from "@/components/RelatedPosts";
import Ad from "@/components/Ad";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string | null;
  publishedAt: Date | null; // ✅ Fixed type
  author: string;
}

interface RelatedPost {
  id: string;
  title: string;
  summary: string;
}

interface Props {
  post: BlogPost | null;
  relatedPosts: RelatedPost[];
}

// Function to estimate reading time
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-center text-red-500 text-xl">Post not found.</p>
      </div>
    );
  }

  const readingTime = getReadingTime(post.content);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={post.author}
              />
              <AvatarFallback>
                {post.author?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-500">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unpublished"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readingTime} min read</span>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <img
            src={post.coverImage}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Article Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8 italic text-lg">
        {post.summary}
      </div>

      {/* Ad Banner */}
      <div className="my-8">
        <Ad slot="banner-top" />
      </div>

      {/* Article Content - First Part */}
      <div className="article-content mb-6">
        <div
          className="prose lg:prose-xl max-w-none"
          dangerouslySetInnerHTML={{
            __html: post.content.split("<!-- READ_MORE -->")[0],
          }}
        />
      </div>

      {/* Read More Section */}
      <div className="read-more-section">
        {post.content.includes("<!-- READ_MORE -->") && (
          <div className="my-8 text-center">
            <Button
              className="read-more-button px-8 py-6 text-lg"
              onClick={() => {
                const hiddenContent = document.querySelector(".hidden-content");
                if (hiddenContent) {
                  hiddenContent.classList.remove("hidden");
                }
                const parentElement =
                  document.querySelector(".read-more-button")?.parentElement;
                if (parentElement) {
                  parentElement.remove();
                }
              }}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Continue Reading
            </Button>
          </div>
        )}

        <div className="hidden-content hidden">
          <div
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content.split("<!-- READ_MORE -->")[1] || "",
            }}
          />
        </div>
      </div>

      {/* Mid-Article Ad */}
      <div className="my-12">
        <Ad slot="mid-article" />
      </div>

      {/* Author Bio */}
      <Card className="p-6 my-12 bg-gray-50">
        <div className="flex items-start">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt={post.author}
            />
            <AvatarFallback>
              {post.author?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
            <p className="text-gray-700">
              Author bio goes here. This is where you can write a short
              description about the author, their expertise, and any other
              relevant information.
            </p>
          </div>
        </div>
      </Card>

      {/* Related Posts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  );
}
