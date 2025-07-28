"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Lock,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { translations, type Locale } from "@/lib/translations";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const t = translations[locale];

  // Memoize trust metrics to prevent recreation on every render
  const trustMetrics = useCallback(
    () => [
      {
        value: t.hero.metrics.successRate.value,
        label: t.hero.metrics.successRate.label,
        sublabel: t.hero.metrics.successRate.sublabel,
        icon: Target,
      },
      {
        value: t.hero.metrics.assetsManaged.value,
        label: t.hero.metrics.assetsManaged.label,
        sublabel: t.hero.metrics.assetsManaged.sublabel,
        icon: TrendingUp,
      },
      {
        value: t.hero.metrics.eliteTraders.value,
        label: t.hero.metrics.eliteTraders.label,
        sublabel: t.hero.metrics.eliteTraders.sublabel,
        icon: Users,
      },
      {
        value: t.hero.metrics.marketLeader.value,
        label: t.hero.metrics.marketLeader.label,
        sublabel: t.hero.metrics.marketLeader.sublabel,
        icon: Award,
      },
    ],
    [t.hero.metrics]
  );

  // Memoize premium features to prevent recreation
  const premiumFeatures = useCallback(
    () => [
      {
        icon: BarChart3,
        title: t.hero.features.aiPowered.title,
        description: t.hero.features.aiPowered.description,
        highlight: t.hero.features.aiPowered.highlight,
        gradient: "from-blue-500/20 to-cyan-500/20",
      },
      {
        icon: Lock,
        title: t.hero.features.security.title,
        description: t.hero.features.security.description,
        highlight: t.hero.features.security.highlight,
        gradient: "from-green-500/20 to-emerald-500/20",
      },
      {
        icon: Zap,
        title: t.hero.features.execution.title,
        description: t.hero.features.execution.description,
        highlight: t.hero.features.execution.highlight,
        gradient: "from-red-500/20 to-red-500/20",
      },
    ],
    [t.hero.features]
  );

  // Optimized cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Optimized animation setup
  useEffect(() => {
    isMountedRef.current = true;
    // Immediate load state for better UX
    const loadTimer = setTimeout(() => {
      if (isMountedRef.current) {
        setIsLoaded(true);
      }
    }, 100);

    // Stable metric cycling with proper cleanup
    const startCycling = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (isMountedRef.current) {
          setActiveMetric((prev) => (prev + 1) % 4);
        }
      }, 3000);
    };

    // Start cycling after component is loaded
    const cycleTimer = setTimeout(startCycling, 500);
    timeoutRef.current = loadTimer;

    return () => {
      isMountedRef.current = false;
      clearTimeout(loadTimer);
      clearTimeout(cycleTimer);
      cleanup();
    };
  }, [cleanup]);

  // Prevent state updates after unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const metrics = trustMetrics();
  const features = premiumFeatures();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-[#000a12] to-[#02141f] overflow-hidden pt-24">
      {/* --- Sophisticated Background --- */}
      <div className="min-h-screen text-white">
        {/* Primary ambient lighting */}
        <div
          className="absolute top-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-blue rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-600/12 to-pink-600/12 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        {/* Subtle moving particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + i * 5}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>
        {/* Professional grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>
      <div
        className={`relative z-10 max-w-7xl mx-auto pt-10 transition-all duration-1200 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* --- Enhanced Trust Indicators --- */}
        <div className="mb-0">
          <div className="w-full sm:max-w-xl ml-0 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 flex flex-col sm:flex-row items-center justify-start px-6 sm:px-8 pt-8 bg-white/8 backdrop-blur-md hover:bg-white/12 transition-all duration-500">
            <div className="flex items-center space-x-3 text-white scale-110">
              <Image
                src="/trustpilot.svg"
                alt="Trustpilot"
                width={260}
                height={260}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="text-center space-y-12">
          {/* --- Premium Headline --- */}
          <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0 lg:space-x-24">
              {/* --- Left Side: Text & Buttons --- */}
              <div className="w-full lg:w-[45%] space-y-6 text-left">
                <h1 className="font-bold leading-tight">
                  <span className="text-white text-6xl sm:text-6xl md:text-6xl lg:text-6xl block pb-4">
                    {t.hero.title}
                  </span>
                  <span
                    className="block pb-3 sm:pb-4 bg-white bg-clip-text text-transparent text-3xl sm:text-3xl md:text-3xl"
                    style={{ animationDuration: "3s" }}
                  >
                    {t.hero.subtitle}
                  </span>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    "{t.hero.description}"
                  </p>
                </h1>
                {/* --- CTA Buttons --- */}
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-start">
                    <button className="relative overflow-hidden bg-gradient-to-r from-green-400/40 via-green-500/30 to-green-400/40 hover:from-green-400/60 hover:via-green-500/40 hover:to-green-400/60 text-white text-lg sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl group shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 transform-gpu">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <Link href={`/${locale}/signup`} className="group">
                        <span className="relative flex items-center font-semibold text-white text-m">
                          {t.hero.ctaButton}
                          <ArrowRight className="ml-2 sm:ml-3 w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              {/* --- Right Side: Image --- */}
              <div className="lg:w-[70%] flex justify-end">
                <div className="relative w-full max-w-none rounded-3xl shadow-2xl backdrop-blur-sm overflow-hidden pt-10 pb-4 -mt-16">
                  <Image
                    src="/platform.png"
                    alt="Platform Showcase"
                    width={3000}
                    height={2000}
                    className="w-full h-auto object-contain rounded-[20px] animate-float"
                  />
                </div>
              </div>
            </div>
            {/* --- Decorative Pulse Line Below --- */}
            <div className="flex justify-center mt-10">
              <div
                className="w-24 sm:w-32 h-1 bg-gradient-to-r from-white via-white to-white rounded-full animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>
          </div>
          {/* --- Optimized Performance Metrics --- */}
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl py-10">
            {metrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const isActive = activeMetric === index;
              return (
                <div
                  key={`metric-${index}-${metric.label}`}
                  className={`group relative text-center p-6 sm:p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 transform-gpu ${
                    isActive
                      ? "bg-white/12 border-blue-200 shadow-md shadow-blue-300"
                      : "bg-white/5 border-white/10 hover:bg-white/8"
                  }`}
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform-gpu ${
                        isActive
                          ? "scale-110"
                          : "bg-white/10 group-hover:bg-white/20"
                      }`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {metric.value}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-300 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {metric.sublabel}
                  </div>
                </div>
              );
            })}
          </div>
          {/* --- Professional Trust Footer --- */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-12 pb-6 px-2 sm:px-0">
            {[
              { label: t.hero.trust.sipcInsured, color: "bg-green-500" },
              { label: t.hero.trust.established, color: "bg-blue-500" },
              { label: t.hero.trust.pwcAudited, color: "bg-purple-500" },
              { label: t.hero.trust.iso27001, color: "bg-cyan-500" },
            ].map((item, index) => (
              <div
                key={`trust-${index}-${item.label}`}
                className="flex items-center space-x-2 text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 ${item.color} rounded-full animate-pulse`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
