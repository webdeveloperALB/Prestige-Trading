"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  TrendingUp,
  Facebook,
  Instagram,
  Shield,
  Award,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { translations, type Locale } from "@/lib/translations";
import { LanguageSwitcher } from "./language-switcher";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  // Add fallback handling for translations
  const t = translations[locale] ||
    translations["en"] || {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        subscriptionTiers: "Subscription Tiers",
        university: "University",
        startTrading: "Start Trading",
      },
      ticker: {
        secRegulated: "SEC Regulated",
        awardWinning: "Award Winning",
        activeTraders: "Active Traders",
        expertSupport: "Expert Support",
        successRate: "Success Rate",
        bankSecurity: "Bank Security",
        zeroCommission: "Zero Commission",
        trustedBy: "Trusted By",
        fastExecution: "Fast Execution",
        aiAlgorithms: "AI Algorithms",
      },
    };

  // Add debug logging to help identify the issue
  if (typeof window !== "undefined") {
    console.log("Current locale:", locale);
    console.log("Available translations:", Object.keys(translations));
    console.log("Translation for locale:", translations[locale]);
  }

  useEffect(() => {
    setCurrentPath(pathname ?? "/");
  }, [pathname]);

  const navigation = [
    { name: t.nav.home, href: `/${locale}` },
    { name: t.nav.about, href: `/${locale}/about` },
    { name: t.nav.services, href: `/${locale}/services` },
    { name: t.nav.subscriptionTiers, href: `/${locale}/subscriptiontiers` },
    { name: t.nav.university, href: `/${locale}/university` },
  ];

  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/people/Prestige-AI-Trading/61578351041253/",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/trading_prestige_academy?igsh=ampmYnF1NG44MWJy",
      label: "Instagram",
    },
  ];

  const tickerItems = [
    { icon: Shield, text: t.ticker.secRegulated },
    { icon: Award, text: t.ticker.awardWinning },
    { icon: Users, text: t.ticker.activeTraders },
    { icon: Clock, text: t.ticker.expertSupport },
    { icon: TrendingUp, text: t.ticker.successRate },
    { icon: Shield, text: t.ticker.bankSecurity },
    { icon: Award, text: t.ticker.zeroCommission },
    { icon: Users, text: t.ticker.trustedBy },
    { icon: Clock, text: t.ticker.fastExecution },
    { icon: TrendingUp, text: t.ticker.aiAlgorithms },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Ticker */}
      <div className="fixed top-0 w-full z-50 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/95 to-slate-900/95 backdrop-blur-lg">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex items-center py-2 animate-[scroll_45s_linear_infinite]">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center mx-8 text-emerald-300"
              >
                <item.icon className="w-4 h-4 mr-2 text-emerald-400" />
                <span className="text-sm font-medium">{item.text}</span>
                <ChevronRight className="w-3 h-3 ml-3 text-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="fixed top-8 w-full z-40 border-b border-purple-500/20 bg-[#031930] backdrop-blur-xl">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 gap-1 sm:gap-2">
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick(`/${locale}`)}
                className="flex items-center space-x-2"
                aria-label="Go to homepage"
              >
                <div className="mb-2 sm:mb-4 w-32 sm:w-48 lg:w-64 h-16 sm:h-24 lg:h-32 relative pt-8">
                  <Image
                    src="/logos/PTArtboard 3.png"
                    alt="WhiteRock24 logo"
                    width={240}
                    height={96}
                    priority={true}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 192px, 240px"
                  />
                </div>
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-2 lg:ml-10 flex items-baseline space-x-1 lg:space-x-4 flex-wrap">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-3 lg:px-6 py-2 rounded-none text-xs lg:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      currentPath === item.href
                        ? "text-emerald-400 border-b-2 border-emerald-400"
                        : "text-gray-300 hover:text-emerald-400 hover:border-b hover:border-emerald-400"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Socials, Language Switcher & CTA */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
              <div className="flex items-center space-x-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-purple-400 transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <LanguageSwitcher currentLocale={locale} />
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleNavClick(`/${locale}/signup`)}
                  className="px-4 lg:px-8 py-2 rounded-md text-xs lg:text-sm font-medium shadow-md text-white bg-gradient-to-r from-emerald-900/95 to-slate-900/95 backdrop-blur-lg transition-all duration-200 whitespace-nowrap"
                >
                  {t.nav.startTrading}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Panel */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-1 pt-2 pb-3 space-y-1 sm:px-3 border-t border-purple-500/20 bg-slate-900/95 backdrop-blur-md">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors break-words ${
                    currentPath === item.href
                      ? "text-white bg-green-900/50"
                      : "text-white hover:text-green-400 hover:bg-purple-900/30"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center space-x-4">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <LanguageSwitcher currentLocale={locale} />
              </div>
              <div className="px-3 py-2 space-y-2">
                <button
                  onClick={() => handleNavClick(`/${locale}/signup`)}
                  className="w-full px-6 py-3 rounded-md text-sm font-medium text-white bg-gradient-to-r from-emerald-900/95 to-slate-900/95 backdrop-blur-lg text-center break-words"
                >
                  {t.nav.startTrading}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
