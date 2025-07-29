"use server"

// Simple newsletter subscription without external email service
export async function subscribeToNewsletterSimple(
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  try {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Log the subscription (in a real app, you'd save to database)
    console.log(`Newsletter subscription: ${email} at ${new Date().toISOString()}`)

    // You could save to a database here:
    // await saveToDatabase(email)

    return {
      success: true,
      message: "Successfully subscribed! We'll send you updates soon.",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
