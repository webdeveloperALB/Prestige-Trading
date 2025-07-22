"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Calendar, User, Tag, Star, BookOpen, TrendingUp, Users, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { translations, type Locale } from "@/lib/translations"

interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  coverImage: string
  publishedAt: string
  author: string
  tags: string[]
  category: string
  featured: boolean
  status: string
  metaTitle: string
  metaDescription: string
}

interface UniversityClientProps {
  posts: BlogPost[]
  lang: string
}

export default function UniversityClient({ posts, lang }: UniversityClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  // Get translations for current language
  const t = translations[lang as Locale] || translations.en

  // Initialize selectedCategory with translated "All Categories" text
  useEffect(() => {
    setSelectedCategory(t.university.categories.all)
  }, [t.university.categories.all])

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [t.university.categories.all, ...new Set(posts.map((post) => post.category))]
    return cats
  }, [posts, t.university.categories.all])

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === t.university.categories.all || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchTerm, selectedCategory, t.university.categories.all])

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const stats = [
    {
      icon: BookOpen,
      label: t.university.stats.articlesPublished,
      value: posts.length.toString(),
    },
    {
      icon: Users,
      label: t.university.stats.expertAuthors,
      value: new Set(posts.map((p) => p.author)).size.toString(),
    },
    {
      icon: Tag,
      label: t.university.stats.topicsCovered,
      value: categories.length.toString(),
    },
    {
      icon: Award,
      label: t.university.stats.featuredContent,
      value: featuredPosts.length.toString(),
    },
  ]

  return (
    <div className="min-h-screen bg-[#031930] backdrop-blur-xl pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.university.hero.title} {t.university.hero.titleHighlight}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.university.hero.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <BookOpen className="mr-2 h-5 w-5" />
                {t.university.cta.startLearning}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {t.university.cta.viewCourses}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={t.university.search.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                {t.university.featuredSection.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <div className="relative">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg transform-none transition-none"
                        />

                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                          <Star className="w-3 h-3 mr-1" />
                          {t.university.featured}
                        </Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <Link href={`/${lang}/university/${post.id}`}>
                            <Button variant="outline" size="sm">
                              {t.university.readMore}
                            </Button>
                          </Link>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              {t.university.recentSection.title}
            </h2>
            {regularPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  {t.university.noArticlesFound.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-500">{t.university.noArticlesFound.description}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <div className="relative">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <Link href={`/${lang}/university/${post.id}`}>
                            <Button variant="outline" size="sm">
                              {t.university.readMore}
                            </Button>
                          </Link>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[#031930] backdrop-blur-xl text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.university.finalCta.title}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{t.university.finalCta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <BookOpen className="mr-2 h-5 w-5" />
                {t.university.finalCta.browseAllCourses}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Users className="mr-2 h-5 w-5" />
                {t.university.finalCta.joinCommunity}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
