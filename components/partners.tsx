"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { translations, type Locale } from "@/lib/translations"

const partners = [
  { name: "AWS", logo: "/partners/aws2.svg" },
  { name: "Stripe", logo: "/partners/stripe.svg" },
  { name: "Plaid", logo: "/partners/plaid.svg" },
  { name: "OpenAI", logo: "/partners/openai.svg" },
  { name: "TradingView", logo: "/partners/tradingview.svg" },
  { name: "MetaTrader", logo: "/partners/metatrader.svg" },
  { name: "TrendSpider", logo: "/partners/trendspider.svg" },
  { name: "Bloomberg", logo: "/partners/bloomberg.svg" },
  { name: "Reuters", logo: "/partners/reuters.svg" },
  { name: "Polygon.io", logo: "/partners/polygon.svg" },
  { name: "Glassnode", logo: "/partners/glassnode.jpeg" },
  { name: "Chainalysis", logo: "/partners/chainanalysis.svg" },
  { name: "Sumsub", logo: "/partners/sumsub.jpeg" },
  { name: "Jumio", logo: "/partners/jumio.svg" },
  { name: "Onfido", logo: "/partners/onfido.svg" },
  { name: "Binance", logo: "/partners/binance.svg" },
  { name: "Coinbase", logo: "/partners/coinbase.svg" },
  { name: "Kraken", logo: "/partners/kraken.svg" },
  { name: "Bitfinex", logo: "/partners/bitfinex.png" },
  { name: "Bybit", logo: "/partners/bybit.png" },
  { name: "OANDA", logo: "/partners/oanda.svg" },
  { name: "MoonPay", logo: "/partners/moonpay.jpeg" },
  { name: "Ramp", logo: "/partners/ramp.svg" },
  { name: "Simplex", logo: "/partners/simplex.png" },
]

interface PartnersScrollProps {
  locale: Locale
}

export function PartnersScroll({ locale }: PartnersScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = translations[locale]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrame: number
    const scrollSpeed = 0.5

    const animate = () => {
      scrollContainer.scrollLeft += scrollSpeed

      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
        scrollContainer.scrollLeft = 0
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <section className="bg-gradient-to-r from-[#000a12] to-[#02141f] py-12 border-t border-slate-800">
      <h2 className="text-center text-white text-2xl font-bold mb-8">{t.partners.title}</h2>
      <div ref={scrollRef} className="overflow-hidden whitespace-nowrap relative">
        <div className="inline-flex gap-10 px-6 animate-none">
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="min-w-[120px] h-16 flex items-center justify-center opacity-80 hover:opacity-100 transition"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
