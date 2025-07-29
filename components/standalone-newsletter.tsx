"use client"

import { useActionState } from "react"

// Inline server action for testing
async function subscribeNewsletter(
  prevState: { success: boolean; message: string } | null,
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  "use server"

  console.log("Newsletter server action called")

  const email = formData.get("email") as string
  console.log("Email:", email)

  if (!email) {
    return { success: false, message: "Email is required" }
  }

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    success: true,
    message: `Successfully subscribed ${email}!`,
  }
}

export default function StandaloneNewsletter() {
  const [state, action, isPending] = useActionState(subscribeNewsletter, null)

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h3>Newsletter Subscription</h3>

      <form action={action} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isPending ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {state && (
        <div
          style={{
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: state.success ? "#d4edda" : "#f8d7da",
            color: state.success ? "#155724" : "#721c24",
            border: `1px solid ${state.success ? "#c3e6cb" : "#f5c6cb"}`,
          }}
        >
          {state.message}
        </div>
      )}
    </div>
  )
}
