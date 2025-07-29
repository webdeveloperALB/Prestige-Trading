"use client"

import { useState, useEffect } from "react"

interface NewsletterCountdownProps {
  onComplete: () => void
  duration?: number // in milliseconds
}

export default function NewsletterCountdown({ onComplete, duration = 60000 }: NewsletterCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = sessionStorage.getItem("newsletter-popup-shown")
    if (hasSeenPopup) return

    // Show countdown in last 10 seconds
    const showCountdownTimer = setTimeout(() => {
      setIsVisible(true)
    }, duration - 10000)

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval)
          onComplete()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => {
      clearTimeout(showCountdownTimer)
      clearInterval(interval)
    }
  }, [duration, onComplete])

  if (!isVisible || timeLeft <= 0) return null

  const secondsLeft = Math.ceil(timeLeft / 1000)

  return (
    <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-30 animate-in slide-in-from-top-2 duration-300">
      <p className="text-sm">Newsletter popup in {secondsLeft}s</p>
    </div>
  )
}
