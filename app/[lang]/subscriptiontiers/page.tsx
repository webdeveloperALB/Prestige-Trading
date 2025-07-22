"use client"

import { useState, useEffect, useMemo, useCallback, memo } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Users, BarChart2, ShieldCheck, Trophy, Crown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { translations, type Locale } from "../../../lib/translations"

interface SubscriptionTiersPageProps {
  params: Promise<{ lang: Locale }>
}

// Feature card component
const FeatureCard = memo(({ icon: Icon, title, description }: any) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="w-10 h-10 mb-4 text-blue-400" aria-hidden />
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
))

// Tier card component
const TierCard = memo(({ tier, locale }: any) => {
  return (
    <motion.div
      className="flex flex-col justify-between p-8 rounded-2xl backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all border border-blue-400 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-3xl font-semibold mb-2 text-center">{tier.name}</h3>
        <p className="text-gray-400 mb-4 text-center">{tier.description}</p>
        <p className="text-5xl font-bold mb-6 text-center">{tier.price}</p>
        <ul className="space-y-3 mb-8 text-gray-200">
          {tier.benefits.map((benefit: string, index: number) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <Link href={`/${locale}/signup`} passHref>
        <Button
          aria-label={`Select ${tier.name} plan`}
          className="w-full py-4 text-lg rounded-xl transition-colors duration-300 bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] text-black hover:from-[#8ab8ff] hover:via-[#b3d7ff] hover:to-[#ddf4ff]"
        >
          {tier.getStarted}
        </Button>
      </Link>
    </motion.div>
  )
})

// Testimonial card component
const TestimonialCard = memo(({ testimonial, delay }: any) => (
  <motion.div
    className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    <p className="italic text-gray-200 mb-4">"{testimonial.quote}"</p>
    <h4 className="font-semibold">{testimonial.name}</h4>
    <p className="text-sm text-gray-400">{testimonial.role}</p>
  </motion.div>
))

export default function SubscriptionTiersPage({ params }: SubscriptionTiersPageProps) {
  const [locale, setLocale] = useState<Locale>("en")
  const [countdown, setCountdown] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
  })

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.lang)
    }
    getParams()
  }, [params])

  const t = translations[locale]

  const calculateCountdown = useCallback(() => {
    const now = new Date()
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    const diff = end.getTime() - now.getTime()
    setCountdown({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    })
  }, [])

  useEffect(() => {
    calculateCountdown()
    const id = setInterval(calculateCountdown, 1000)
    return () => clearInterval(id)
  }, [calculateCountdown])

  const featureHighlights = useMemo(
    () => [
      {
        icon: ShieldCheck,
        title: t.subscriptionTiers.features[0].title,
        description: t.subscriptionTiers.features[0].description,
      },
      {
        icon: DollarSign,
        title: t.subscriptionTiers.features[1].title,
        description: t.subscriptionTiers.features[1].description,
      },
      {
        icon: TrendingUp,
        title: t.subscriptionTiers.features[2].title,
        description: t.subscriptionTiers.features[2].description,
      },
      {
        icon: Users,
        title: t.subscriptionTiers.features[3].title,
        description: t.subscriptionTiers.features[3].description,
      },
      {
        icon: Trophy,
        title: t.subscriptionTiers.features[4].title,
        description: t.subscriptionTiers.features[4].description,
      },
      {
        icon: Crown,
        title: t.subscriptionTiers.features[5].title,
        description: t.subscriptionTiers.features[5].description,
      },
      {
        icon: BarChart2,
        title: t.subscriptionTiers.features[6].title,
        description: t.subscriptionTiers.features[6].description,
      },
      {
        icon: LogOut,
        title: t.subscriptionTiers.features[7].title,
        description: t.subscriptionTiers.features[7].description,
      },
    ],
    [t.subscriptionTiers.features],
  )

  const tier = useMemo(
    () => ({
      name: t.subscriptionTiers.standardPlan.name,
      price: t.subscriptionTiers.standardPlan.price,
      description: t.subscriptionTiers.standardPlan.description,
      benefits: t.subscriptionTiers.standardPlan.benefits,
      getStarted: t.subscriptionTiers.standardPlan.getStarted,
    }),
    [t.subscriptionTiers.standardPlan],
  )

  return (
    <div className="bg-gradient-to-r from-[#000a12] to-[#02141f] text-white px-6 pt-36">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold leading-tight mb-4">{t.subscriptionTiers.hero.title}</h1>
        <p className="text-gray-400 text-lg mb-6">{t.subscriptionTiers.hero.subtitle}</p>
      </motion.div>

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto mb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureHighlights.map((f, i) => (
          <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
        ))}
      </section>

      {/* Limited-Time Offer */}
      <motion.div
        className="max-w-4xl mx-auto mb-12 bg-blue-600/30 backdrop-blur-md p-6 rounded-xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-2">{t.subscriptionTiers.limitedOffer.title}</h2>
        <p className="text-gray-200 mb-4">
          {t.subscriptionTiers.limitedOffer.description}{" "}
          <span className="font-bold">
            {countdown.days}d {countdown.hrs}h {countdown.mins}m {countdown.secs}s
          </span>
          .
        </p>
        <Link href={`/${locale}/signup`} passHref>
          <Button className="bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black px-8 py-3 rounded-lg">
            {t.subscriptionTiers.limitedOffer.claimOffer}
          </Button>
        </Link>
      </motion.div>

      {/* Single Tier Card - Centered */}
      <section className="max-w-2xl mx-auto mb-20">
        <h2 className="text-center text-3xl font-semibold mb-8">{t.subscriptionTiers.standardPlan.title}</h2>
        <TierCard tier={tier} locale={locale} />
      </section>

      {/* Plan Details */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-center text-3xl font-semibold mb-8">{t.subscriptionTiers.planDetails.title}</h2>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">
                {t.subscriptionTiers.planDetails.platformAccess.title}
              </h3>
              <ul className="space-y-2 text-gray-200">
                {t.subscriptionTiers.planDetails.platformAccess.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400">
                {t.subscriptionTiers.planDetails.supportCommunity.title}
              </h3>
              <ul className="space-y-2 text-gray-200">
                {t.subscriptionTiers.planDetails.supportCommunity.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto pb-20">
        <h2 className="text-center text-3xl font-semibold mb-6">{t.subscriptionTiers.testimonials.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.subscriptionTiers.testimonials.items.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} delay={i * 0.2} />
          ))}
        </div>
      </section>
    </div>
  )
}
