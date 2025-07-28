"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Shield,
  Users,
  TrendingUp,
  Award,
  Globe,
  Clock,
  ChevronRight,
  Star,
  BarChart3,
  Zap,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { translations, type Locale } from "../../../lib/translations"

interface AboutPageProps {
  params: Promise<{ lang: Locale }>
}

export default function About({ params }: AboutPageProps) {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState("mission")
  const [counters, setCounters] = useState({
    years: 0,
    countries: 0,
    clients: 0,
    trades: 0,
  })
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.lang)
    }
    getParams()
  }, [params])

  const t = translations[locale]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    const interval = setInterval(() => {
      setCounters((prev) => ({
        years: prev.years < 12 ? prev.years + 1 : 12,
        countries: prev.countries < 120 ? prev.countries + 6 : 120,
        clients: prev.clients < 50000 ? prev.clients + 2500 : 50000,
        trades: prev.trades < 1000000 ? prev.trades + 50000 : 1000000,
      }))
    }, 100)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(interval)
    }
  }, [])

  const features = [
    {
      icon: Shield,
      title: t.about.features.items[0].title,
      description: t.about.features.items[0].description,
    },
    {
      icon: Users,
      title: t.about.features.items[1].title,
      description: t.about.features.items[1].description,
    },
    {
      icon: TrendingUp,
      title: t.about.features.items[2].title,
      description: t.about.features.items[2].description,
    },
    {
      icon: Award,
      title: t.about.features.items[3].title,
      description: t.about.features.items[3].description,
    },
    {
      icon: Globe,
      title: t.about.features.items[4].title,
      description: t.about.features.items[4].description,
    },
    {
      icon: Clock,
      title: t.about.features.items[5].title,
      description: t.about.features.items[5].description,
    },
  ]

  const milestones = [
    {
      year: "2012",
      title: "Company Founded",
      description: "Prestige was established with a vision to democratize professional trading tools.",
    },
    {
      year: "2014",
      title: "First Trading Algorithm",
      description: "Launched our proprietary trading algorithm, achieving 27% returns in its first year.",
    },
    {
      year: "2016",
      title: "Global Expansion",
      description: "Expanded operations to Europe and Asia, opening offices in London and Singapore.",
    },
    {
      year: "2018",
      title: "Mobile Platform Launch",
      description: "Released our award-winning mobile trading platform with real-time analytics.",
    },
    {
      year: "2020",
      title: "AI Integration",
      description: "Incorporated machine learning algorithms for predictive market analysis.",
    },
    {
      year: "2022",
      title: "Institutional Partnership",
      description: "Formed strategic partnerships with major financial institutions and liquidity providers.",
    },
    {
      year: "2023",
      title: "Advanced Analytics Suite",
      description: "Launched comprehensive analytics suite with customizable dashboards and alerts.",
    },
    {
      year: "2024",
      title: "Next-Gen Platform",
      description: "Released Prestige Trading with institutional-grade tools for retail traders.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-[#000a12]">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 max-[500px]:pt-32 max-[500px]:pb-24">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 sm:mb-6 bg-blue-500/30 text-blue-200 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              {t.about.hero.badge}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t.about.hero.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold">
                {t.about.hero.titleHighlight}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4"
            >
              {t.about.hero.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                onClick={() => router.push(`/${locale}/signup`)}
              >
                {t.about.hero.joinButton} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-white hover:bg-blue-900/20 hover:text-white w-full sm:w-auto bg-transparent"
                onClick={() => router.push(`/${locale}/signup`)}
              >
                {t.about.hero.watchDemo}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#001524] to-[#002a43]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: counters.years + "+", label: t.about.stats.yearsOfExcellence },
              { value: counters.countries, label: t.about.stats.countriesServed },
              {
                value: counters.clients.toLocaleString() + "+",
                label: t.about.stats.activeTraders,
              },
              {
                value: counters.trades.toLocaleString() + "+",
                label: t.about.stats.tradesExecuted,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="text-center"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-blue-300 text-sm sm:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Tabs */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center mb-8 sm:mb-12">
          <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.philosophy.badge}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.about.philosophy.title}{" "}
            <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent font-bold">
              {t.about.philosophy.titleHighlight}
            </span>{" "}
            {t.about.philosophy.titleEnd}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">{t.about.philosophy.description}</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="mission" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-blue-900/20">
              <TabsTrigger value="mission" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white">
                {t.about.philosophy.tabs.mission}
              </TabsTrigger>
              <TabsTrigger value="vision" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white">
                {t.about.philosophy.tabs.vision}
              </TabsTrigger>
              <TabsTrigger value="values" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-white">
                {t.about.philosophy.tabs.values}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mission">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.philosophy.missionTitle}</h3>
                {t.about.philosophy.missionContent.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="vision">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.philosophy.visionTitle}</h3>
                {t.about.philosophy.visionContent.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="values">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-2xl p-8 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.philosophy.valuesTitle}</h3>
                <ul className="space-y-4 text-gray-300">
                  {t.about.philosophy.values.map((v, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="text-blue-400 mr-3 mt-1 w-5 h-5" />
                      <div>
                        <h4 className="text-lg font-semibold text-white">{v.title}</h4>
                        <p>{v.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-fixed bg-cover bg-center relative">
        <div className="absolute inset-0" />
        <div className="container mx-auto relative z-10 text-center mb-12">
          <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.features.badge}</Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t.about.features.title}{" "}
            <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
              {t.about.features.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">{t.about.features.description}</p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-effect rounded-xl p-6 shadow-lg border border-blue-500/20 hover:bg-blue-500/20 transition"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.testimonials.badge}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.about.testimonials.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
                {t.about.testimonials.titleHighlight}
              </span>{" "}
              {t.about.testimonials.titleEnd}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.about.testimonials.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.about.testimonials.items.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-effect rounded-xl p-6 border border-blue-500/20"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${idx < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-blue-400 text-sm">{testimonial.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.awards.badge}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.about.awards.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
                {t.about.awards.titleHighlight}
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.about.awards.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.about.awards.items.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-effect rounded-xl p-6 text-center border border-blue-500/20 hover:border-blue-500/50"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-blue-400 font-semibold mb-2">{award.year}</p>
                <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                <p className="text-gray-400">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.performance.badge}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.about.performance.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
                {t.about.performance.titleHighlight}
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.about.performance.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{t.about.performance.strategyTitle}</h3>
              {t.about.performance.strategies.map((strategy, i) => (
                <div key={i} className="mb-6 last:mb-0">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{strategy.name}</span>
                    <span
                      className={`${
                        strategy.name.includes("Benchmark") ? "text-blue-400" : "text-green-400"
                      } font-bold`}
                    >
                      +{strategy.value}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        strategy.name.includes("Benchmark") ? "bg-blue-400" : "bg-green-500"
                      }`}
                      style={{ width: `${strategy.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{t.about.performance.kpiTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.about.performance.kpis.map((kpi, i) => (
                  <Card key={i} className="bg-blue-900/20 border-blue-500/20">
                    <CardContent className="p-6">
                      {i === 0 && <BarChart3 className="w-8 h-8 mb-4 text-blue-400" />}
                      {i === 1 && <Zap className="w-8 h-8 mb-4 text-blue-400" />}
                      {i === 2 && <TrendingUp className="w-8 h-8 mb-4 text-blue-400" />}
                      {i === 3 && <Clock className="w-8 h-8 mb-4 text-blue-400" />}
                      <h4 className="text-lg font-semibold text-white mb-1">{kpi.label}</h4>
                      <p className="text-3xl font-bold text-green-400 mb-1">{kpi.value}</p>
                      <p className="text-gray-400 text-sm">{kpi.sub}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12 shadow-2xl border border-blue-500/30 max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.cta.badge}</Badge>
                <h2 className="text-4xl font-bold text-white mb-6">
                  {t.about.cta.title}{" "}
                  <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
                    {t.about.cta.titleHighlight}
                  </span>{" "}
                  {t.about.cta.titleEnd}
                </h2>
                <p className="text-gray-300 mb-8">{t.about.cta.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                    onClick={() => router.push(`/${locale}/signup`)}
                  >
                    {t.about.cta.startTrial}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-500 text-white hover:bg-blue-900/20 hover:text-white w-full sm:w-auto bg-transparent"
                    onClick={() => router.push(`/${locale}/signup`)}
                  >
                    {t.about.cta.scheduleDemo}
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 opacity-75 blur-lg" />
                <div className="relative bg-[#001524] p-6 rounded-lg space-y-4">
                  {t.about.cta.benefits.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-3 w-5 h-5" />
                      <p className="text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/30 text-blue-200">{t.about.faq.badge}</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.about.faq.title}{" "}
              <span className="bg-gradient-to-r from-[#9ac5ff] via-[#c4e0ff] to-[#eaf7ff] bg-clip-text text-transparent">
                {t.about.faq.titleHighlight}
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">{t.about.faq.description}</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {t.about.faq.items.map((faq, i) => (
              <motion.div key={i} variants={itemVariants} className="glass-effect rounded-xl overflow-hidden">
                <div className="p-6 border-b border-blue-500/20">
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                </div>
                <div className="p-6 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
