import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const FINNHUB_URL = `https://finnhub.io/api/v1/news?category=crypto&token=${process.env.FINNHUB_API_KEY}`;
  const NEWSAPI_URL = `https://newsapi.org/v2/everything?q=crypto OR forex&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWSAPI_KEY}`;
  const NEWSDATA_URL = `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=crypto,forex&language=en&category=business`;

  try {
    const results = await Promise.allSettled([
      fetch(FINNHUB_URL),
      fetch(NEWSAPI_URL),
      fetch(NEWSDATA_URL),
    ]);

    const articles: any[] = [];

    // Finnhub
    if (results[0].status === "fulfilled" && results[0].value.ok) {
      const data = await results[0].value.json();
      articles.push(
        ...(Array.isArray(data) ? data : []).map((item: any) => ({
          title: item.headline,
          url: item.url,
          source: { name: item.source || "Finnhub" },
          publishedAt: new Date(item.datetime * 1000).toISOString(),
          description: item.summary,
          urlToImage: item.image || null,
        }))
      );
    } else {
      console.warn("⚠️ Finnhub fetch failed.");
    }

    // NewsAPI
    if (results[1].status === "fulfilled" && results[1].value.ok) {
      const data = await results[1].value.json();
      articles.push(
        ...(data.articles || []).map((item: any) => ({
          title: item.title,
          url: item.url,
          source: { name: item.source?.name || "NewsAPI" },
          publishedAt: item.publishedAt,
          description: item.description,
          urlToImage: item.urlToImage,
        }))
      );
    } else {
      console.warn("⚠️ NewsAPI fetch failed.");
    }

    // NewsData
    if (results[2].status === "fulfilled" && results[2].value.ok) {
      const data = await results[2].value.json();
      articles.push(
        ...(data.results || []).map((item: any) => ({
          title: item.title,
          url: item.link,
          source: { name: item.source_id || "NewsData.io" },
          publishedAt: item.pubDate,
          description: item.description,
          urlToImage: item.image_url,
        }))
      );
    } else {
      console.warn("⚠️ NewsData fetch failed or rate-limited.");
    }

    const withImages = articles.filter(
      (a) =>
        typeof a.urlToImage === "string" &&
        a.urlToImage.startsWith("http") &&
        !a.urlToImage.includes("placeholder") &&
        !a.urlToImage.endsWith(".svg") &&
        a.urlToImage.length > 10
    );

    const shuffled = withImages.sort(() => 0.5 - Math.random()).slice(0, 9);

    res.status(200).json(shuffled);
  } catch (error: any) {
    console.error("🔥 News mix error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch news.", error: error.message });
  }
}
