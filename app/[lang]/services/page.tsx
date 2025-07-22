"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Shield, Users, Zap, TrendingUp, Globe, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { translations, type Locale } from "../../../lib/translations"

interface ServicesPageProps {
  params: Promise<{ lang: Locale }>
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const router = useRouter()
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.lang)
    }
    getParams()
  }, [params])

  const t = translations[locale]

  const serviceIcons = [BarChart3, Users, Shield, TrendingUp, Zap, Globe]
  const serviceGradients = [
    "from-blue-500/20 to-cyan-500/20",
    "from-purple-500/20 to-pink-500/20",
    "from-green-500/20 to-emerald-500/20",
    "from-orange-500/20 to-red-500/20",
    "from-yellow-500/20 to-orange-500/20",
    "from-indigo-500/20 to-blue-500/20",
  ]
  const serviceIconBgs = [
    "bg-blue-500/20",
    "bg-purple-500/20",
    "bg-green-500/20",
    "bg-orange-500/20",
    "bg-yellow-500/20",
    "bg-indigo-500/20",
  ]

  const services = t.services.items.map((service, index) => ({
    ...service,
    icon: serviceIcons[index],
    gradient: serviceGradients[index],
    iconBg: serviceIconBgs[index],
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#000a12]">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 h-56 sm:w-80 sm:h-80 bg-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-4 md:py-24 lg:pt-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400/60" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
              {t.services.hero.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold">
                {t.services.hero.titleHighlight}
              </span>
            </h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-4xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t.services.hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover="hover"
                className={`relative group rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-white/10 bg-gradient-to-br ${service.gradient} hover:border-white/20 transition-all duration-500`}
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`}
                      whileHover={{ rotate: 5 }}
                    >
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-200 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                        {service.description}
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {service.features.map((feat, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-center sm:justify-start text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors duration-300"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3 sm:mr-4 group-hover:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                            <span className="font-medium">{feat}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative backdrop-blur-sm bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-white/10"
          >
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                {t.services.cta.title}{" "}
                <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold">
                  {t.services.cta.titleHighlight}
                </span>{" "}
                {t.services.cta.titleEnd}
              </h2>
              <p className="text-slate-300 text-lg sm:text-xl mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-4">
                {t.services.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link href={`/${locale}/signup`}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      {t.services.cta.getStarted}
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link href={`/${locale}/signup`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 hover:text-white text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-xl backdrop-blur-sm transition-all duration-300 bg-transparent"
                    >
                      {t.services.cta.scheduleConsultation}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
