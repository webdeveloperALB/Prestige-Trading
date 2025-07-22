"use client"

import { useEffect, useState } from "react"
import { translations, type Locale } from "@/lib/translations"

interface StatsProps {
  locale: Locale
}

export function Stats({ locale }: StatsProps) {
  const [counts, setCounts] = useState({
    users: 0,
    trades: 0,
    success: 0,
    countries: 0,
  })

  const t = translations[locale]

  useEffect(() => {
    const targets = {
      users: 95,
      trades: 10000,
      success: 3,
      countries: 120,
    }
    const duration = 2000
    const steps = 60

    const intervals = Object.keys(targets).map((key) => {
      const target = targets[key as keyof typeof targets]
      const increment = target / steps
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(intervals[Object.keys(targets).indexOf(key)])
        }
        setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, duration / steps)
    })

    return () => intervals.forEach(clearInterval)
  }, [])

  const stats = [
    {
      label: t.stats.metrics.winRate,
      value: counts.users.toLocaleString(),
      suffix: "%",
    },
    {
      label: t.stats.metrics.activeMembers,
      value: counts.trades.toLocaleString(),
      suffix: "+",
    },
    {
      label: t.stats.metrics.signalsPerWeek,
      value: counts.success,
      suffix: "+",
    },
    {
      label: t.stats.metrics.countries,
      value: counts.countries,
      suffix: "+",
    },
  ]

  return (
    <section className="py-4 bg-gradient-to-r from-[#000a12] to-[#02141f]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
            {t.stats.title}{" "}
            <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold animate-text">
              {t.stats.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">{t.stats.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold text-white drop-shadow-md mb-2">
                <span className="text-blue-300">{stat.value}</span>
                {stat.suffix}
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
