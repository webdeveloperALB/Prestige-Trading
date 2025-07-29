"use server";

export async function subscribeToNewsletter(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log(
        "Newsletter subscription (no email service configured):",
        email
      );

      // For development/testing - just log and return success
      return {
        success: true,
        message:
          "Successfully subscribed! (Email service not configured - check console)",
      };
    }

    // Dynamic import to avoid errors if resend is not installed
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send confirmation email to subscriber
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev", // Use Resend's test domain
      to: [email],
      subject: "Welcome to our Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to our Newsletter!</h2>
          <p>Thank you for subscribing to our newsletter. You'll receive updates about:</p>
          <ul>
            <li>Latest news and updates</li>
            <li>Exclusive content</li>
            <li>Special offers</li>
          </ul>
          <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent to ${email}. 
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        message: "Failed to send confirmation email. Please try again.",
      };
    }

    console.log("Email sent successfully:", data);

    return {
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // If it's a missing module error, provide helpful message
    if (
      error instanceof Error &&
      error.message.includes("Cannot resolve module")
    ) {
      return {
        success: false,
        message:
          "Email service not properly configured. Please install resend package.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
