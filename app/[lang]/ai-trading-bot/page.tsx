"use client"
import { useState, useEffect, useRef } from "react"
import {
  Bot,
  Zap,
  Brain,
  DollarSign,
  Sparkles,
  Eye,
  Database,
  Globe,
  Atom,
  Cpu,
  Shield,
  Layers,
  Network,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { translations, type Locale } from "../../../lib/translations"

interface AITradingBotPageProps {
  params: Promise<{ lang: Locale }>
}

export default function AITradingBotPage({ params }: AITradingBotPageProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const [hologramActive, setHologramActive] = useState(false)
  const [scanlinePosition, setScanlinePosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [locale, setLocale] = useState<Locale>("en")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null)
  const [tradingData, setTradingData] = useState<any[]>([])
  const [pricePoints, setPricePoints] = useState<number[]>([])
  const [volumeData, setVolumeData] = useState<number[]>([])
  const [indicators, setIndicators] = useState<any[]>([])

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setLocale(resolvedParams.lang)
    }
    getParams()
  }, [params])

  const t = translations[locale]

  useEffect(() => {
    setMounted(true)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Slower hologram activation
    const hologramInterval = setInterval(() => {
      setHologramActive((prev) => !prev)
    }, 6000)

    // Slower metrics cycling
    const metricsInterval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 6)
    }, 3000)

    // Much slower scanline animation
    const scanlineInterval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 0.5) % 100)
    }, 150)

    // Canvas particle system with mobile optimization
    const canvas = canvasRef.current
    const noiseCanvas = noiseCanvasRef.current
    if (canvas && noiseCanvas) {
      const ctx = canvas.getContext("2d")
      const noiseCtx = noiseCanvas.getContext("2d")

      const updateCanvasSize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        noiseCanvas.width = window.innerWidth
        noiseCanvas.height = window.innerHeight
      }

      updateCanvasSize()
      window.addEventListener("resize", updateCanvasSize)

      const particles: any[] = []
      // Reduce particles on mobile for performance
      const particleCount = window.innerWidth < 768 ? 30 : 60

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (window.innerWidth < 768 ? 0.3 : 0.5),
          vy: (Math.random() - 0.5) * (window.innerWidth < 768 ? 0.3 : 0.5),
          size: Math.random() * (window.innerWidth < 768 ? 2 : 3) + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: Math.random() > 0.5 ? "cyan" : Math.random() > 0.5 ? "purple" : "blue",
          pulse: Math.random() * Math.PI * 2,
          energy: Math.random(),
        })
      }

      // Reduce noise frequency on mobile
      const createNoise = () => {
        if (!noiseCtx || (window.innerWidth < 768 && Math.random() < 0.5)) return
        const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * (window.innerWidth < 768 ? 15 : 30)
          data[i] = noise
          data[i + 1] = noise * 0.5
          data[i + 2] = noise * 1.5
          data[i + 3] = Math.random() * (window.innerWidth < 768 ? 8 : 15)
        }
        noiseCtx.putImageData(imageData, 0, 0)
      }

      const animate = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Create noise less frequently on mobile
        if (Math.random() < (window.innerWidth < 768 ? 0.01 : 0.02)) {
          createNoise()
        }

        particles.forEach((particle, i) => {
          particle.x += particle.vx
          particle.y += particle.vy
          particle.pulse += 0.02

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

          const pulseFactor = Math.sin(particle.pulse) * 0.3 + 1
          const currentSize = particle.size * pulseFactor

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
          let color
          switch (particle.color) {
            case "cyan":
              color = `rgba(0, 255, 255, ${particle.opacity})`
              break
            case "purple":
              color = `rgba(147, 51, 234, ${particle.opacity})`
              break
            default:
              color = `rgba(59, 130, 246, ${particle.opacity})`
          }
          ctx.fillStyle = color
          ctx.shadowBlur = window.innerWidth < 768 ? 8 : 15
          ctx.shadowColor = color
          ctx.fill()
          ctx.shadowBlur = 0

          // Reduce connections on mobile
          if (!isMobile || Math.random() < 0.3) {
            particles.forEach((otherParticle, j) => {
              if (i !== j) {
                const dx = particle.x - otherParticle.x
                const dy = particle.y - otherParticle.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const maxDistance = window.innerWidth < 768 ? 60 : 100

                if (distance < maxDistance) {
                  ctx.beginPath()
                  ctx.moveTo(particle.x, particle.y)
                  ctx.lineTo(otherParticle.x, otherParticle.y)
                  const opacity = (0.15 * (maxDistance - distance)) / maxDistance
                  const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)
                  gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`)
                  gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 0.5})`)
                  gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`)
                  ctx.strokeStyle = gradient
                  ctx.lineWidth = 0.5
                  ctx.stroke()
                }
              }
            })
          }
        })
        requestAnimationFrame(animate)
      }

      animate()
    }

    // Generate realistic trading data
    const generateTradingData = () => {
      const basePrice = 45000 + Math.random() * 10000
      const prices = []
      const volumes = []
      const indicatorData = []
      for (let i = 0; i < 100; i++) {
        const price = basePrice + Math.sin(i * 0.1) * 2000 + (Math.random() - 0.5) * 1000
        const volume = Math.random() * 1000000 + 500000
        prices.push(price)
        volumes.push(volume)
        if (i % 10 === 0) {
          indicatorData.push({
            x: i,
            rsi: Math.random() * 100,
            macd: (Math.random() - 0.5) * 200,
            signal: Math.random() > 0.7 ? "BUY" : Math.random() < 0.3 ? "SELL" : "HOLD",
          })
        }
      }
      setPricePoints(prices)
      setVolumeData(volumes)
      setIndicators(indicatorData)
    }

    generateTradingData()

    const tradingInterval = setInterval(() => {
      generateTradingData()
    }, 5000)

    return () => {
      clearInterval(hologramInterval)
      clearInterval(metricsInterval)
      clearInterval(scanlineInterval)
      clearInterval(tradingInterval)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const metrics = [
    {
      label: t.aiBot.metrics.neuralAccuracy,
      value: "99.97%",
      icon: Brain,
      color: "from-cyan-400 via-blue-500 to-purple-600",
      glow: "shadow-cyan-500/50",
      hoverColor: "hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500",
    },
    {
      label: t.aiBot.metrics.quantumSpeed,
      value: "0.001ms",
      icon: Zap,
      color: "from-yellow-400 via-orange-500 to-red-600",
      glow: "shadow-yellow-500/50",
      hoverColor: "hover:from-yellow-300 hover:via-orange-400 hover:to-red-500",
    },
    {
      label: t.aiBot.metrics.activeNodes,
      value: "∞",
      icon: Globe,
      color: "from-green-400 via-emerald-500 to-teal-600",
      glow: "shadow-green-500/50",
      hoverColor: "hover:from-green-300 hover:via-emerald-400 hover:to-teal-500",
    },
    {
      label: t.aiBot.metrics.dimensionalAnalysis,
      value: "12D",
      icon: Atom,
      color: "from-purple-400 via-pink-500 to-rose-600",
      glow: "shadow-purple-500/50",
      hoverColor: "hover:from-purple-300 hover:via-pink-400 hover:to-rose-500",
    },
    {
      label: t.aiBot.metrics.processingPower,
      value: "∞ THz",
      icon: Cpu,
      color: "from-indigo-400 via-violet-500 to-purple-600",
      glow: "shadow-indigo-500/50",
      hoverColor: "hover:from-indigo-300 hover:via-violet-400 hover:to-purple-500",
    },
    {
      label: t.aiBot.metrics.securityLevel,
      value: "Quantum",
      icon: Shield,
      color: "from-emerald-400 via-cyan-500 to-blue-600",
      glow: "shadow-emerald-500/50",
      hoverColor: "hover:from-emerald-300 hover:via-cyan-400 hover:to-blue-500",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: t.aiBot.features.quantumNeural.title,
      description: t.aiBot.features.quantumNeural.description,
      gradient: "from-black to-black",
      hoverGradient: "",
      particles: true,
    },
    {
      icon: Atom,
      title: t.aiBot.features.molecularAnalysis.title,
      description: t.aiBot.features.molecularAnalysis.description,
      gradient: "from-black to-black",
      hoverGradient: "",
      particles: true,
    },
    {
      icon: Database,
      title: t.aiBot.features.interdimensionalData.title,
      description: t.aiBot.features.interdimensionalData.description,
      gradient: "from-black to-black",
      hoverGradient: "",
      particles: true,
    },
    {
      icon: Eye,
      title: t.aiBot.features.omniscientVision.title,
      description: t.aiBot.features.omniscientVision.description,
      gradient: "from-black to-black",
      hoverGradient: "from-black to-black",
      particles: true,
    },
    {
      icon: Network,
      title: t.aiBot.features.hyperdimensionalNetworks.title,
      description: t.aiBot.features.hyperdimensionalNetworks.description,
      gradient: "from-black to-black",
      hoverGradient: "from-black to-black",
      particles: true,
    },
    {
      icon: Layers,
      title: t.aiBot.features.realityProcessing.title,
      description: t.aiBot.features.realityProcessing.description,
      gradient: "from-black to-black",
      hoverGradient: "from-black to-black",
      particles: true,
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-16 md:pt-24 mt-24 max-[500px]:mt-0">
      {/* Enhanced Canvas Particle System */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, #001122 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #110022 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, #002211 0%, transparent 50%),
            linear-gradient(135deg, #000000 0%, #001122 50%, #000000 100%)
          `,
        }}
      />

      {/* Digital Noise Canvas */}
      <canvas ref={noiseCanvasRef} className="absolute inset-0 pointer-events-none z-5 opacity-10 mix-blend-screen" />

      {/* AI Bot Trading Analysis Background - Hidden on mobile for performance */}
      <div className={`absolute inset-0 opacity-25 pointer-events-none z-10 ${isMobile ? "hidden" : ""}`}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Main AI Analysis Chart */}
          <path
            d={`M 50,${typeof window !== "undefined" ? window.innerHeight * 0.5 : 400} ${pricePoints
              .map(
                (price, i) =>
                  `L ${
                    50 + (i / pricePoints.length) * (typeof window !== "undefined" ? window.innerWidth - 100 : 300)
                  },${
                    (typeof window !== "undefined" ? window.innerHeight * 0.5 : 400) +
                    Math.sin(i * 0.1) * 80 +
                    (price - 45000) * 0.02
                  }`,
              )
              .join(" ")}`}
            stroke="url(#aiGradient)"
            strokeWidth="3"
            fill="none"
            className="animate-ai-analysis"
          />

          {/* AI Prediction Cone */}
          <path
            d={`M ${typeof window !== "undefined" ? window.innerWidth * 0.7 : 500},${
              typeof window !== "undefined" ? window.innerHeight * 0.5 : 400
            }
           L ${typeof window !== "undefined" ? window.innerWidth * 0.9 : 600},${
             typeof window !== "undefined" ? window.innerHeight * 0.45 : 380
           }
          L ${typeof window !== "undefined" ? window.innerWidth * 0.9 : 600},${
            typeof window !== "undefined" ? window.innerHeight * 0.55 : 420
          } Z`}
            fill="url(#predictionGradient)"
            className="animate-prediction-pulse"
          />

          {/* Neural Network Nodes */}
          {[...Array(12)].map((_, i) => (
            <g key={i}>
              <circle
                cx={100 + (i * (typeof window !== "undefined" ? window.innerWidth : 800)) / 15}
                cy={(typeof window !== "undefined" ? window.innerHeight * 0.75 : 600) + Math.sin(i) * 50}
                r="4"
                fill="rgba(0, 255, 255, 0.8)"
                className="animate-neural-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
              {i < 11 && (
                <line
                  x1={100 + (i * (typeof window !== "undefined" ? window.innerWidth : 800)) / 15}
                  y1={(typeof window !== "undefined" ? window.innerHeight * 0.75 : 600) + Math.sin(i) * 50}
                  x2={100 + ((i + 1) * (typeof window !== "undefined" ? window.innerWidth : 800)) / 15}
                  y2={(typeof window !== "undefined" ? window.innerHeight * 0.75 : 600) + Math.sin(i + 1) * 50}
                  stroke="rgba(147, 51, 234, 0.6)"
                  strokeWidth="2"
                  className="animate-neural-connection"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              )}
            </g>
          ))}

          {/* Enhanced Gradients */}
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 255, 255, 1)" />
              <stop offset="30%" stopColor="rgba(147, 51, 234, 0.9)" />
              <stop offset="70%" stopColor="rgba(59, 130, 246, 0.9)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 1)" />
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(251, 191, 36, 0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* AI Processing Status - Mobile optimized */}
        <div className="absolute top-2 md:top-6 left-2 md:left-6 space-y-2 md:space-y-3">
          <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 md:p-4">
            <div className="text-cyan-400 text-xs md:text-sm font-mono mb-1 md:mb-2">{t.aiBot.status.title}</div>
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-mono">{t.aiBot.status.neuralNetworks}</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span className="text-blue-400 text-xs font-mono">{t.aiBot.status.patternRecognition}</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div
                  className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span className="text-purple-400 text-xs font-mono">{t.aiBot.status.quantumProcessing}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Market Analysis - Mobile optimized */}
        <div className="absolute top-2 md:top-6 right-2 md:right-6 space-y-2 md:space-y-3">
          <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2 md:p-4">
            <div className="text-purple-400 text-xs md:text-sm font-mono mb-1 md:mb-2">
              {t.aiBot.marketAnalysis.title}
            </div>
            <div className="space-y-1 md:space-y-2">
              {["BTC/USD", "ETH/USD"].map((pair, i) => (
                <div key={pair} className="flex items-center justify-between space-x-2 md:space-x-4">
                  <span className="text-cyan-400 text-xs font-mono">{pair}</span>
                  <span className="text-green-400 text-xs font-mono">
                    ${(45000 + Math.sin(Date.now() * 0.001 + i) * 2000).toFixed(0)}
                  </span>
                  <span className="text-purple-400 text-xs font-mono animate-pulse">
                    {Math.random() > 0.5 ? "↗" : "↘"} {(Math.random() * 5).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slower Holographic Grid - Reduced on mobile */}
      <div className={`absolute inset-0 opacity-20 pointer-events-none z-10 ${isMobile ? "opacity-10" : ""}`}>
        <div
          className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-scan-line-slow"
          style={{ top: `${scanlinePosition}%` }}
        ></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(0,255,255,0.2)_100%)] bg-[length:50px_50px] animate-grid-move-slow"></div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_98%,rgba(147,51,234,0.2)_100%)] bg-[length:50px_50px] animate-grid-move-vertical-slow"></div>
      </div>

      {/* Slower Floating Holograms - Reduced on mobile */}
      <div className={`absolute inset-0 pointer-events-none z-20 ${isMobile ? "opacity-50" : ""}`}>
        {[...Array(isMobile ? 5 : 10)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-hologram-float-slow ${
              hologramActive ? "opacity-60" : "opacity-20"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              background: `radial-gradient(circle, ${
                ["#00ffff", "#9333ea", "#3b82f6", "#10b981", "#f59e0b"][Math.floor(Math.random() * 5)]
              }, transparent)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              boxShadow: `0 0 15px currentColor, 0 0 30px currentColor`,
            }}
          />
        ))}
      </div>

      <div className="relative z-30">
        {/* Ultra Enhanced Hero Section - Mobile Responsive */}
        <section className="px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Massive Bot Icon with Enhanced Holographic Effects - Mobile Responsive */}
            <div className="relative inline-block mb-8 md:mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-xl md:blur-3xl opacity-70 animate-pulse-glow-ultra"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full blur-lg md:blur-2xl opacity-50 animate-pulse-glow-delayed-ultra"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/40 via-blue-500/30 to-purple-500/40 p-6 md:p-12 rounded-full backdrop-blur-sm border-2 border-cyan-400/60 hover:border-cyan-300 transition-all duration-700 group hover:scale-110 transform-gpu hover:shadow-2xl hover:shadow-cyan-500/50">
                <Bot className="w-16 h-16 md:w-32 md:h-32 text-cyan-300 mx-auto group-hover:scale-110 group-hover:text-white transition-all duration-700 drop-shadow-2xl" />
              </div>
            </div>

            {/* Enhanced Title with Advanced Glitch Effects - Mobile Responsive */}
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-8 relative">
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent animate-glitch-1-enhanced">
                {t.aiBot.hero.title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-glitch-2-enhanced">
                {t.aiBot.hero.title}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent animate-glitch-3-enhanced">
                {t.aiBot.hero.title}
              </span>
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                {t.aiBot.hero.title}
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-text-glow-enhanced">
                {t.aiBot.hero.subtitle}
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4">
              {t.aiBot.hero.description}
            </p>

            {/* Enhanced CTA Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mb-12 md:mb-16 px-4">
              <Button className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white px-6 md:px-12 py-4 md:py-6 text-lg md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/60 transition-all duration-500 transform hover:scale-105 md:hover:scale-110 border-2 border-cyan-400/50 hover:border-cyan-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4 group-hover:animate-spin transition-transform duration-500" />
                <Link href={`/${locale}/signup`}>
                  <span className="relative z-10 cursor-pointer">{t.aiBot.hero.ctaEnterMatrix}</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="group border-2 border-purple-500/50 text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/30 hover:via-pink-500/20 hover:to-red-500/30 px-6 md:px-12 py-4 md:py-6 text-lg md:text-2xl rounded-full backdrop-blur-sm bg-transparent hover:border-purple-400 transition-all duration-500 transform hover:scale-105 md:hover:scale-110 shadow-2xl hover:shadow-purple-500/60 relative overflow-hidden hover:text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Eye className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4 transition-transform duration-500 group-hover:animate-pulse group-hover:text-black" />
                <Link href={`/${locale}/signup`}>
                  <span className="relative z-10 group-hover:text-black">{t.aiBot.hero.ctaWitnessFuture}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Quantum Metrics - Mobile Responsive */}
        <section className="px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-8xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-text-glow-enhanced">
                {t.aiBot.metrics.title}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {metrics.map((metric, index) => (
                <Card
                  key={index}
                  className={`group bg-gradient-to-br ${metric.color} ${
                    metric.hoverColor
                  } border-2 border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-700 hover:scale-105 transform-gpu ${
                    activeMetric === index
                      ? `ring-2 md:ring-4 ring-white/60 shadow-xl md:shadow-2xl ${metric.glow} animate-quantum-pulse-enhanced`
                      : "hover:shadow-xl md:hover:shadow-2xl hover:shadow-white/30"
                  } relative overflow-hidden`}
                >
                  <CardContent className="p-4 md:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(isMobile ? 3 : 6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white/80 rounded-full animate-particle-float-enhanced"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>
                    <metric.icon className="w-8 h-8 md:w-16 md:h-16 text-white mx-auto mb-3 md:mb-6 animate-spin-slow group-hover:animate-spin group-hover:scale-105 transition-all duration-500 drop-shadow-lg" />
                    <div className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4 font-mono tracking-wider group-hover:scale-105 transition-transform duration-500">
                      {metric.value}
                    </div>
                    <div className="text-white/90 text-sm md:text-lg font-semibold tracking-wide group-hover:text-white transition-colors duration-300">
                      {metric.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Interdimensional Features - Mobile Responsive */}
        <section className="px-4 md:px-6 py-12 md:py-24">
          <div className="max-w-8xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-center mb-4 md:mb-8">
              <span className="bg-gradient-to-r from-white via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                {t.aiBot.features.title}
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-text-glow-enhanced">
                {t.aiBot.features.subtitle}
              </span>
            </h2>
            <p className="text-cyan-300 text-center text-lg md:text-2xl mb-12 md:mb-20 max-w-4xl mx-auto font-light px-4">
              {t.aiBot.features.description}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`group bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} border-2 border-white/20 hover:border-white/50 backdrop-blur-sm transition-all duration-700 hover:scale-105 transform-gpu relative overflow-hidden hover:shadow-xl md:hover:shadow-2xl hover:shadow-white/20`}
                >
                  <CardContent className="p-6 md:p-12 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="bg-white/20 group-hover:bg-white/40 p-4 md:p-6 rounded-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-110 transform-gpu mx-auto sm:mx-0">
                        <feature.icon className="w-8 h-8 md:w-12 md:h-12 text-white animate-pulse group-hover:animate-spin-slow transition-all duration-500 drop-shadow-lg" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-6 tracking-wide group-hover:text-cyan-100 transition-colors duration-500">
                          {feature.title}
                        </h3>
                        <p className="text-cyan-100 leading-relaxed text-sm md:text-lg group-hover:text-white transition-colors duration-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  {/* Enhanced particle overlay for each card */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(isMobile ? 4 : 8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/80 rounded-full animate-particle-float-enhanced"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 4}s`,
                        }}
                      />
                    ))}
                  </div>
                  {/* Holographic scan line */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan-line-card"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ultimate Enhanced CTA - Mobile Responsive */}
        <section className="px-4 md:px-6 py-12 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="group bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 hover:from-cyan-400/30 hover:via-blue-400/20 hover:to-purple-400/30 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-300/60 rounded-3xl p-8 md:p-16 relative overflow-hidden transition-all duration-700 hover:scale-105 transform-gpu hover:shadow-xl md:hover:shadow-2xl hover:shadow-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500"></div>
              {/* Enhanced floating particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(isMobile ? 6 : 12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400/60 rounded-full animate-particle-float-enhanced"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-8 group-hover:scale-105 transition-transform duration-500">
                {t.aiBot.finalCta.title}
              </h3>
              <p className="text-cyan-300 group-hover:text-cyan-200 text-lg md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed transition-colors duration-500 px-4">
                {t.aiBot.finalCta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center">
                <Button className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white px-8 md:px-16 py-4 md:py-8 text-lg md:text-2xl font-black rounded-full shadow-2xl hover:shadow-cyan-500/60 transition-all duration-500 transform hover:scale-105 md:hover:scale-110 border-2 border-cyan-400/50 hover:border-cyan-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <DollarSign className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4 group-hover:animate-bounce transition-transform duration-500" />
                  <Link href={`/${locale}/signup`}>
                    <span className="relative z-10">{t.aiBot.finalCta.transcendNow}</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="group border-2 border-purple-500/50 text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/30 hover:via-pink-500/20 hover:to-red-500/30 px-8 md:px-16 py-4 md:py-8 text-lg md:text-2xl rounded-full backdrop-blur-sm bg-transparent hover:border-purple-400 transition-all duration-500 transform hover:scale-105 md:hover:scale-110 shadow-2xl hover:shadow-purple-500/60 font-black relative overflow-hidden hover:text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Brain className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-4 group-hover:animate-pulse transition-transform duration-500 group-hover:text-black" />
                  <Link href={`/${locale}/signup`}>
                    <span className="relative z-10 group-hover:text-black">{t.aiBot.finalCta.expandConsciousness}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes matrix-fall-slow {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes scan-line-slow {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        @keyframes scan-line-card {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes grid-move-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50px);
          }
        }
        @keyframes grid-move-vertical-slow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
        @keyframes grid-diagonal-slow {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(80px, 80px);
          }
        }
        @keyframes hologram-float-slow {
          0%,
          100% {
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-15px) scale(1.05) rotate(45deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) scale(1.1) rotate(90deg);
            opacity: 0.7;
          }
          75% {
            transform: translateY(-15px) scale(1.05) rotate(135deg);
            opacity: 0.5;
          }
        }
        @keyframes pulse-glow-ultra {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1.5);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.8);
          }
        }
        @keyframes pulse-glow-delayed-ultra {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1.25);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.5);
          }
        }
        @keyframes pulse-glow-tertiary {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1.1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }
        @keyframes glitch-1-enhanced {
          0%,
          100% {
            transform: translate(0);
            opacity: 1;
          }
          10% {
            transform: translate(-2px, 2px);
            opacity: 0.9;
          }
          20% {
            transform: translate(-2px, -2px);
            opacity: 0.95;
          }
          30% {
            transform: translate(2px, 2px);
            opacity: 0.85;
          }
          40% {
            transform: translate(2px, -2px);
            opacity: 0.9;
          }
          50% {
            transform: translate(-1px, 1px);
            opacity: 0.95;
          }
          60% {
            transform: translate(1px, -1px);
            opacity: 0.9;
          }
        }
        @keyframes glitch-2-enhanced {
          0%,
          100% {
            transform: translate(0);
            opacity: 1;
          }
          15% {
            transform: translate(1px, -2px);
            opacity: 0.95;
          }
          30% {
            transform: translate(1px, 2px);
            opacity: 0.9;
          }
          45% {
            transform: translate(-1px, -2px);
            opacity: 0.85;
          }
          60% {
            transform: translate(-1px, 2px);
            opacity: 0.9;
          }
          75% {
            transform: translate(2px, -1px);
            opacity: 0.95;
          }
        }
        @keyframes glitch-3-enhanced {
          0%,
          100% {
            transform: translate(0);
            opacity: 1;
          }
          20% {
            transform: translate(0.5px, -1px);
            opacity: 0.9;
          }
          40% {
            transform: translate(-0.5px, 1px);
            opacity: 0.95;
          }
          60% {
            transform: translate(1px, 0.5px);
            opacity: 0.85;
          }
          80% {
            transform: translate(-1px, -0.5px);
            opacity: 0.9;
          }
        }
        @keyframes text-glow-enhanced {
          0%,
          100% {
            text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
          }
          50% {
            text-shadow: 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor;
          }
        }
        @keyframes pulse-text {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes shimmer-ultra {
          0% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes quantum-pulse-enhanced {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes particle-float-enhanced {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10%,
          90% {
            opacity: 1;
          }
          25% {
            transform: translateY(-10px) translateX(3px) scale(1.1);
          }
          50% {
            transform: translateY(-20px) translateX(6px) scale(1.3);
          }
          75% {
            transform: translateY(-10px) translateX(9px) scale(1.1);
          }
        }
        @keyframes chromatic-shift-slow {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(1px);
          }
        }
        @keyframes ai-analysis {
          0% {
            stroke-dasharray: 0, 2000;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 2000, 0;
            opacity: 0.8;
          }
        }
        @keyframes prediction-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        @keyframes neural-pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes neural-connection {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-matrix-fall-slow {
          animation: matrix-fall-slow linear infinite;
        }
        .animate-scan-line-slow {
          animation: scan-line-slow 6s linear infinite;
        }
        .animate-scan-line-card {
          animation: scan-line-card 4s linear infinite;
        }
        .animate-grid-move-slow {
          animation: grid-move-slow 20s linear infinite;
        }
        .animate-grid-move-vertical-slow {
          animation: grid-move-vertical-slow 25s linear infinite;
        }
        .animate-grid-diagonal-slow {
          animation: grid-diagonal-slow 30s linear infinite;
        }
        .animate-hologram-float-slow {
          animation: hologram-float-slow ease-in-out infinite;
        }
        .animate-pulse-glow-ultra {
          animation: pulse-glow-ultra 3s ease-in-out infinite;
        }
        .animate-pulse-glow-delayed-ultra {
          animation: pulse-glow-delayed-ultra 3s ease-in-out infinite 1.5s;
        }
        .animate-pulse-glow-tertiary {
          animation: pulse-glow-tertiary 3s ease-in-out infinite 3s;
        }
        .animate-glitch-1-enhanced {
          animation: glitch-1-enhanced 0.6s ease-in-out infinite;
        }
        .animate-glitch-2-enhanced {
          animation: glitch-2-enhanced 0.6s ease-in-out infinite 0.15s;
        }
        .animate-glitch-3-enhanced {
          animation: glitch-3-enhanced 0.6s ease-in-out infinite 0.3s;
        }
        .animate-text-glow-enhanced {
          animation: text-glow-enhanced 3s ease-in-out infinite;
        }
        .animate-pulse-text {
          animation: pulse-text 3s ease-in-out infinite;
        }
        .animate-shimmer-ultra {
          animation: shimmer-ultra 4s ease-in-out infinite;
        }
        .animate-quantum-pulse-enhanced {
          animation: quantum-pulse-enhanced 2.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-particle-float-enhanced {
          animation: particle-float-enhanced ease-in-out infinite;
        }
        .animate-chromatic-shift-slow {
          animation: chromatic-shift-slow 8s ease-in-out infinite;
        }
        .animate-ai-analysis {
          animation: ai-analysis 12s ease-in-out infinite;
        }
        .animate-prediction-pulse {
          animation: prediction-pulse 4s ease-in-out infinite;
        }
        .animate-neural-pulse {
          animation: neural-pulse 3s ease-in-out infinite;
        }
        .animate-neural-connection {
          animation: neural-connection 2s ease-in-out infinite;
        }
        .transform-gpu {
          will-change: transform;
          transform: translateZ(0);
        }

        /* Mobile-specific optimizations */
        @media (max-width: 768px) {
          .animate-quantum-pulse-enhanced {
            animation: quantum-pulse-enhanced 2.5s ease-in-out infinite;
            transform: scale(1) !important;
          }

          .animate-quantum-pulse-enhanced:hover {
            transform: scale(1.02) !important;
          }
        }
      `}</style>
    </div>
  )
}
