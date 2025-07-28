"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import { translations, type Locale } from "@/lib/translations";

type NewsArticle = {
  title: string;
  url: string;
  source: { name: string };
  publishedAt: string;
  description?: string;
  urlToImage?: string | null;
};

const API_URL = "/api/news-mix";

interface LatestNewsProps {
  locale: Locale;
}

export function LatestNews({ locale }: LatestNewsProps) {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add fallback handling for translations
  const t = translations[locale] ||
    translations["en"] || {
      latestNews: {
        title: "Latest",
        titleHighlight: "Market",
        subtitle: "News",
        loading: "Loading news...",
        error: "Failed to load news",
        source: "Source:",
        publishedAt: "Published:",
        readMore: "Read more",
      },
    };

  // Add debug logging to help identify the issue
  if (typeof window !== "undefined") {
    console.log("LatestNews - Current locale:", locale);
    console.log("LatestNews - Translation for locale:", translations[locale]);
    console.log("LatestNews - t.latestNews exists:", !!t.latestNews);
  }

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(t.latestNews.error);
        const data = await res.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message || t.latestNews.error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, [t.latestNews.error]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(
      locale === "en" ? "en-US" : locale === "it" ? "it-IT" : "de-DE"
    );
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#000a12] to-[#02141f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          🌐 {t.latestNews.title}{" "}
          <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold">
            {t.latestNews.titleHighlight}
          </span>{" "}
          {t.latestNews.subtitle}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin text-white w-6 h-6 mr-2" />
            <span className="text-white">{t.latestNews.loading}</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article, idx) => (
              <Card
                key={idx}
                onClick={() => router.push(`/${locale}/signup`)}
                className="cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:shadow-xl transition transform hover:scale-[1.02] group"
              >
                {article.urlToImage && (
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        article.urlToImage ||
                        "/placeholder.svg?height=160&width=400&query=news"
                      }
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <CardContent
                  className={`p-4 ${!article.urlToImage ? "pt-6" : ""}`}
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="space-y-1 mb-2">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">{t.latestNews.source}</span>{" "}
                      {article.source.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      <span className="font-medium">
                        {t.latestNews.publishedAt}
                      </span>{" "}
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                  {article.description && (
                    <p className="mt-2 text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                      {article.description}
                    </p>
                  )}
                  <div className="mt-3 text-xs text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t.latestNews.readMore} →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            <p className="text-lg">{t.latestNews.error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
