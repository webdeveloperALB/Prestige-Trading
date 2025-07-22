import type { Locale } from "../../lib/translations";
import { translations } from "../../lib/translations";
import { Hero } from "../../components/hero";
import { Stats } from "../../components/stats";
import { Features } from "../../components/features";
import { PartnersScroll } from "../../components/partners";
import { CryptoForexTable } from "../../components/crypto-forex-table";
import { LatestNews } from "../../components/latest-news";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang];

  return (
    <div>
      <Hero locale={lang} />
      <Stats locale={lang} />
      <Features locale={lang} />
      <PartnersScroll locale={lang} />
      <CryptoForexTable locale={lang} />
      <LatestNews locale={lang} />
    </div>
  );
}
