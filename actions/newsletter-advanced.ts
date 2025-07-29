"use server"

import { sendNewsletterNotification } from "../lib/email-service"

export async function subscribeToNewsletterAdvanced(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    // Send notification to news@prestigetradingacademy.uk
    await sendNewsletterNotification(email)

    // Here you could also:
    // 1. Save to database
    // 2. Add to email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send welcome email to subscriber

    // Log for tracking
    console.log(`Newsletter subscription: ${email} -> news@prestigetradingacademy.uk`)

    return {
      success: true,
      message: "Welcome to Prestige Trading Academy! Check your email for confirmation.",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Subscription failed. Please try again or contact support.",
    }
  }
}
