"use client";

import React, { useState, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

// Authentication constants
const ADMIN_USERNAME = "WhiteeRockk24";
const ADMIN_PASSWORD = "Cobra.192837465";

// Type definitions
interface BlogPost {
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
}

// UI Component imports
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Icons
import {
  Trash2,
  Star,
  Bold,
  Italic,
  Underline,
  ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

// Tiptap imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";

// Enhanced Rich Text Editor Component
interface EnhancedRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [mounted, setMounted] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [devicePreview, setDevicePreview] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      const imageUrl = json.url as string;

      editor?.chain().focus().setImage({ src: imageUrl }).run();
    } catch (err: any) {
      console.error("Image upload error:", err);
      toast.error(err.message || "Image upload failed");
    } finally {
      e.target.value = "";
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: value,
    immediatelyRender: false, // Fix SSR hydration issue
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      const text = editor.state.doc.textContent.trim();
      const words = text ? text.split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(text.length);
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  const previewContainerClass = () => {
    if (devicePreview === "mobile") return "mx-auto w-[375px]";
    if (devicePreview === "tablet") return "mx-auto w-[768px]";
    return "w-full";
  };

  if (!mounted || !editor) {
    return <div className="h-96 bg-gray-700 animate-pulse rounded-md" />;
  }

  return (
    <div className="border border-gray-600 rounded-lg bg-gray-800 overflow-hidden">
      <div className="border-b border-gray-600 bg-gray-750">
        <div className="p-2 flex gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal md:flex-wrap">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>

          <div className="w-px h-8 bg-gray-600 mx-1"></div>

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${
              editor.isActive("bold") ? "bg-purple-600" : ""
            }`}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${
              editor.isActive("italic") ? "bg-purple-600" : ""
            }`}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${
              editor.isActive("underline") ? "bg-purple-600" : ""
            }`}
            title="Underline"
          >
            <Underline className="w-4 h-4" />
          </button>

          <button
            onClick={onImageButtonClick}
            className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            title="Upload & Insert Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 gap-2 sm:gap-0">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Words: {wordCount}</span>
            <span className="text-sm text-gray-400">
              Characters: {charCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                previewMode
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {previewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-800">
        {!previewMode ? (
          <div className="bg-gray-800 text-white">
            <EditorContent
              editor={editor}
              className="prose prose-invert max-w-full min-h-[300px]"
            />
          </div>
        ) : (
          <div
            className={`bg-white p-4 overflow-auto ${previewContainerClass()}`}
          >
            <div
              className="prose prose-lg max-w-none font-serif leading-[1.7] text-gray-800"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        aria-label="Upload image"
        className="hidden"
      />
    </div>
  );
};

// Main AdminDashboard component
export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({
    status: "draft",
    featured: false,
    tags: [],
    category: "University News",
    metaTitle: "",
    metaDescription: "",
  });
  const [isNew, setIsNew] = useState(true);

  // Handle login
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", loginForm); // Debug log

    if (
      loginForm.username === ADMIN_USERNAME &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      setAuthenticated(true);
      setError(null);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials");
      setError("Invalid username or password");
    }
  };

  // Fetch posts after authentication
  useEffect(() => {
    if (!authenticated) return;

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/blog/posts");
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || `HTTP ${res.status}`);
        }
        const data: BlogPost[] = await res.json();
        setPosts(data);
        setError(null);
      } catch (e: any) {
        console.error("Error fetching posts:", e);
        setError(e.message || "Failed to load posts");
        // Set empty array as fallback
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [authenticated]);

  // Handle image upload for cover image
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setForm((prev) => ({ ...prev, coverImage: json.url }));
      toast.success("Image uploaded successfully!");
    } catch (e: any) {
      console.error("Error uploading image:", e);
      toast.error(e.message || "Image upload failed");
    }
  };

  // Save or update post
  const savePost = async () => {
    setError(null);
    if (!form.title || !form.summary || !form.content) {
      toast.error("Title, summary, and content are required.");
      return;
    }
    if (isNew && !form.coverImage) {
      toast.error("Please upload a cover image before saving.");
      return;
    }

    const payload: Partial<BlogPost> = {
      title: form.title,
      summary: form.summary,
      content: form.content,
      author: form.author || "Admin",
      coverImage: form.coverImage!,
      tags: form.tags || [],
      category: form.category || "University News",
      featured: form.featured || false,
      status: form.status || "draft",
      metaTitle: form.metaTitle || form.title || "",
      metaDescription: form.metaDescription || form.summary || "",
    };

    try {
      const url = isNew ? "/api/blog/posts" : `/api/blog/posts/${form.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const saved: BlogPost = await res.json();

      setPosts((prev) => {
        if (isNew) {
          return [saved, ...prev];
        } else {
          return prev.map((p) => (p.id === saved.id ? saved : p));
        }
      });

      setForm({
        status: "draft",
        featured: false,
        tags: [],
        category: "University News",
        metaTitle: "",
        metaDescription: "",
      });
      setIsNew(true);
      toast.success(isNew ? "Article published!" : "Article updated!");
    } catch (e: any) {
      console.error("Error saving post:", e);
      toast.error(e.message || "Failed to save post.");
    }
  };

  // Delete a post
  const deletePost = async (id: string) => {
    setDeleteLoading(id);
    const backup = [...posts];
    setPosts((p) => p.filter((x) => x.id !== id));

    try {
      const res = await fetch(`/api/blog/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Article deleted.");
    } catch (e: any) {
      console.error("Error deleting post:", e);
      toast.error(e.message || "Failed to delete post.");
      setPosts(backup);
    } finally {
      setDeleteLoading(null);
    }
  };

  // If not authenticated, show login form
  if (!authenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <form
            onSubmit={handleLogin}
            className="bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl w-full max-w-md space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Admin Login
              </h2>
              <p className="text-gray-400">
                Enter your credentials to access the dashboard
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-800/80 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Username
              </label>
              <Input
                id="login-username"
                placeholder="Enter your username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, username: e.target.value }))
                }
                className="py-2 text-base bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((f) => ({ ...f, password: e.target.value }))
                }
                className="py-2 text-base bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 text-base"
            >
              Log In
            </Button>
          </form>
        </div>
      </>
    );
  }

  // Show loading spinner while fetching posts
  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-white text-xl mt-4">Loading articles...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen pt-32 sm:pt-32 px-4 py-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                University Content Hub
              </h1>
              <p className="text-gray-400">
                Professional blog content management
              </p>
            </div>
            <Button
              onClick={() => {
                router.push("/university");
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              View Live Site
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-800/80 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {/* Create / Update Form */}
          <Card className="bg-gray-800 border-purple-500/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {isNew ? "Create New Article" : `Edit Article: ${form.title}`}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Use the enhanced editor to create professional blog content
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="flex overflow-x-auto hide-scrollbar whitespace-nowrap bg-gray-750 border border-gray-600 mb-6">
                  <TabsTrigger
                    className="flex-shrink-0 px-4 py-2"
                    value="content"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger className="flex-shrink-0 px-4 py-2" value="seo">
                    SEO Settings
                  </TabsTrigger>
                  <TabsTrigger
                    className="flex-shrink-0 px-4 py-2"
                    value="publishing"
                  >
                    Publishing
                  </TabsTrigger>
                </TabsList>

                {/* Content Tab */}
                <TabsContent value="content">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Article Title *
                        </label>
                        <Input
                          id="title"
                          placeholder="Enter your article title..."
                          value={form.title || ""}
                          onChange={(e) =>
                            setForm((f: Partial<BlogPost>) => ({
                              ...f,
                              title: e.target.value,
                            }))
                          }
                          className="text-lg bg-gray-700 border-gray-600 text-white font-medium py-2"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="summary"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Article Summary *
                        </label>
                        <Textarea
                          id="summary"
                          placeholder="Write a compelling summary..."
                          value={form.summary || ""}
                          onChange={(e) =>
                            setForm((f: Partial<BlogPost>) => ({
                              ...f,
                              summary: e.target.value,
                            }))
                          }
                          className="min-h-20 py-2 bg-gray-700 border-gray-600 text-white"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Recommended: 150-160 characters for optimal SEO
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Article Content *
                        </label>
                        <EnhancedRichTextEditor
                          value={form.content || ""}
                          onChange={(html: string) =>
                            setForm((f: Partial<BlogPost>) => ({
                              ...f,
                              content: html,
                            }))
                          }
                          placeholder="Start writing your article here..."
                        />
                      </div>
                    </div>

                    {/* Publishing options */}
                    <div className="space-y-6">
                      <Card className="bg-gray-750 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-lg">
                            Publishing
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label
                              htmlFor="author"
                              className="block text-sm text-gray-300 mb-1"
                            >
                              Author
                            </label>
                            <Input
                              id="author"
                              placeholder="Author name"
                              value={form.author || ""}
                              onChange={(e) =>
                                setForm((f: Partial<BlogPost>) => ({
                                  ...f,
                                  author: e.target.value,
                                }))
                              }
                              className="py-2 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="cover-upload"
                              className="block text-sm text-gray-300 mb-1"
                            >
                              Cover Image *
                            </label>
                            <input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              aria-label="Upload cover image"
                              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Recommended: 1200x630px (16:9 ratio)
                            </p>
                          </div>

                          {form.coverImage && (
                            <div className="relative">
                              <Image
                                src={form.coverImage || "/placeholder.svg"}
                                alt="Cover preview"
                                width={300}
                                height={169}
                                className="rounded-md object-cover w-full"
                              />
                              <button
                                onClick={() =>
                                  setForm((f: Partial<BlogPost>) => ({
                                    ...f,
                                    coverImage: "",
                                  }))
                                }
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                title="Remove image"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <div>
                              <label
                                htmlFor="featured"
                                className="text-sm text-gray-300"
                              >
                                Featured Article
                              </label>
                              <p className="text-xs text-gray-500">
                                Pin this article to the top
                              </p>
                            </div>
                            <Switch
                              id="featured"
                              checked={form.featured || false}
                              onCheckedChange={(checked: boolean) =>
                                setForm((f: Partial<BlogPost>) => ({
                                  ...f,
                                  featured: checked,
                                }))
                              }
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-750 border-gray-600">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-white text-lg">
                            Categories & Tags
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label
                              htmlFor="category"
                              className="block text-sm text-gray-300 mb-1"
                            >
                              Category
                            </label>
                            <Select
                              value={form.category}
                              onValueChange={(value: string) =>
                                setForm((f: Partial<BlogPost>) => ({
                                  ...f,
                                  category: value,
                                }))
                              }
                            >
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="University News">
                                  University News
                                </SelectItem>
                                <SelectItem value="Research">
                                  Research
                                </SelectItem>
                                <SelectItem value="Academics">
                                  Academics
                                </SelectItem>
                                <SelectItem value="Campus Life">
                                  Campus Life
                                </SelectItem>
                                <SelectItem value="Alumni">Alumni</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label
                              htmlFor="tags"
                              className="block text-sm text-gray-300 mb-1"
                            >
                              Tags (comma separated)
                            </label>
                            <Input
                              id="tags"
                              placeholder="trading, finance, education"
                              value={form.tags?.join(", ") || ""}
                              onChange={(e) =>
                                setForm((f: Partial<BlogPost>) => ({
                                  ...f,
                                  tags: e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter(Boolean),
                                }))
                              }
                              className="py-2 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="metaTitle"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Meta Title
                      </label>
                      <Input
                        id="metaTitle"
                        placeholder="Title for search engines..."
                        value={form.metaTitle || ""}
                        onChange={(e) =>
                          setForm((f: Partial<BlogPost>) => ({
                            ...f,
                            metaTitle: e.target.value,
                          }))
                        }
                        className="py-2 bg-gray-700 border-gray-600 text-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 50-60 characters
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="metaDescription"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Meta Description
                      </label>
                      <Textarea
                        id="metaDescription"
                        placeholder="Description for search engines..."
                        value={form.metaDescription || ""}
                        onChange={(e) =>
                          setForm((f: Partial<BlogPost>) => ({
                            ...f,
                            metaDescription: e.target.value,
                          }))
                        }
                        className="min-h-24 py-2 bg-gray-700 border-gray-600 text-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: 150-160 characters
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Publishing Tab */}
                <TabsContent value="publishing">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Status
                      </label>
                      <Select
                        value={form.status}
                        onValueChange={(value: string) =>
                          setForm((f: Partial<BlogPost>) => ({
                            ...f,
                            status: value as
                              | "draft"
                              | "published"
                              | "scheduled",
                          }))
                        }
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 col-span-full">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setForm({
                            status: "draft",
                            featured: false,
                            tags: [],
                            category: "University News",
                            metaTitle: "",
                            metaDescription: "",
                          });
                          setIsNew(true);
                        }}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Discard
                      </Button>
                      <Button
                        onClick={savePost}
                        className="bg-purple-600 text-white hover:bg-purple-700 font-medium"
                      >
                        {form.status === "draft"
                          ? "Save Draft"
                          : isNew
                          ? "Publish Article"
                          : "Update Article"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Existing Posts */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
              <h2 className="text-2xl font-semibold text-white">
                Published Articles ({posts.length})
              </h2>
              <div className="text-sm text-gray-400">Sorted by most recent</div>
            </div>

            {posts.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Trash2 className="w-12 h-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-center text-lg mb-2">
                    No articles published yet
                  </p>
                  <p className="text-gray-500 text-center">
                    Create your first article using the enhanced editor above
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {posts.map((post: BlogPost) => (
                  <Card
                    key={post.id}
                    className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {post.coverImage && (
                          <div className="lg:w-48 w-full flex-shrink-0">
                            <Image
                              src={post.coverImage || "/placeholder.svg"}
                              alt={post.title}
                              width={192}
                              height={108}
                              className="rounded-lg object-cover w-full h-24"
                            />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    post.status === "published"
                                      ? "bg-green-100 text-green-800"
                                      : post.status === "scheduled"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {post.status}
                                </span>
                                {post.featured && (
                                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs flex items-center gap-1">
                                    <Star className="w-3 h-3" /> Featured
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                                {post.title}
                              </h3>
                              <p className="text-gray-300 mb-2 line-clamp-2">
                                {post.summary}
                              </p>
                              <div className="flex flex-wrap items-center gap-1 text-sm text-gray-400">
                                <span>By {post.author}</span>
                                <span>•</span>
                                <span>
                                  {new Date(
                                    post.publishedAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                                <span>•</span>
                                <span>{post.category}</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-purple-400 border-purple-500/30 hover:bg-purple-500/10 bg-transparent"
                                onClick={() => {
                                  setForm(post);
                                  setIsNew(false);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deletePost(post.id)}
                                disabled={deleteLoading === post.id}
                              >
                                {deleteLoading === post.id ? (
                                  "Deleting..."
                                ) : (
                                  <>
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Delete
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
