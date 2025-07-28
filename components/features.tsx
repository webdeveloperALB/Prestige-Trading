"use client";
import { TrendingUp, Bitcoin, Cpu } from "lucide-react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { translations, type Locale } from "@/lib/translations";
import animationData from "./animacion1.json";

interface FeaturesProps {
  locale: Locale;
}

export function Features({ locale }: FeaturesProps) {
  const router = useRouter();

  // Add fallback handling for translations
  const t = translations[locale] ||
    translations["en"] || {
      features: {
        title: "Our",
        titleHighlight: "Services",
        subtitle:
          "Discover our comprehensive trading solutions designed for success",
        services: {
          aiTradingBot: {
            title: "AI Trading Bot",
            description:
              "Advanced artificial intelligence algorithms that analyze market patterns and execute trades automatically with precision and speed.",
          },
          forexGoldSignals: {
            title: "Forex & Gold Signals",
            description:
              "Professional trading signals for forex and gold markets with detailed analysis and entry/exit points.",
          },
          cryptoSignals: {
            title: "Crypto Signals",
            description:
              "Cryptocurrency trading signals covering major digital assets with technical analysis and market insights.",
          },
        },
      },
    };

  // Add debug logging to help identify the issue
  if (typeof window !== "undefined") {
    console.log("Features - Current locale:", locale);
    console.log("Features - Translation for locale:", translations[locale]);
    console.log("Features - t.features exists:", !!t.features);
  }

  const features = [
    {
      icon: Cpu,
      title: t.features.services.aiTradingBot.title,
      description: t.features.services.aiTradingBot.description,
      clickable: true,
      href: `/${locale}/ai-trading-bot`,
    },
    {
      icon: TrendingUp,
      title: t.features.services.forexGoldSignals.title,
      description: t.features.services.forexGoldSignals.description,
    },
    {
      icon: Bitcoin,
      title: t.features.services.cryptoSignals.title,
      description: t.features.services.cryptoSignals.description,
    },
  ];

  const handleFeatureClick = (feature: any) => {
    if (feature.clickable && feature.href) {
      router.push(feature.href);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-[#000a12] to-[#02141f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold mb-4">
            {t.features.title}{" "}
            <span className="text-white font-bold">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-blue-500/30 transition-all duration-300 group ${
                  feature.clickable
                    ? "cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                    : ""
                }`}
                onClick={() => handleFeatureClick(feature)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                      {feature.clickable && (
                        <span className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Column - Lottie Globe */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-lg h-[500px] bg-transparent rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Lottie
                animationData={animationData}
                loop
                className="w-[250px] h-[250px] scale-[2] bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
