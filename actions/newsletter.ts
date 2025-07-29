"use server";

import { Resend } from "resend";

// Initialize Resend (you need to install: npm install resend)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(
  prevState: { success: boolean; message: string } | null,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const email = formData.get("email") as string;

  console.log("Newsletter action called with email:", email);

  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address",
    };
  }

  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.log(`📧 NEWSLETTER SUBSCRIPTION (NO EMAIL SERVICE CONFIGURED):`);
      console.log(`Email: ${email}`);
      console.log(`Time: ${new Date().toISOString()}`);
      console.log(`⚠️  To send real emails, configure Resend API key`);

      return {
        success: true,
        message:
          "Subscription recorded! (Email service not configured - check console)",
      };
    }

    // Send welcome email to subscriber
    const { data: welcomeEmail, error: welcomeError } =
      await resend.emails.send({
        from: "Prestige Trading Academy <newsletter@prestigetradingacademy.uk>", // FIXED: Added newsletter@ prefix
        to: [email],
        subject: "Welcome to Prestige Trading Academy Newsletter! 🎉",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to Prestige Trading Academy!</h1>
            <p style="color: #666; font-size: 16px;">Thank you for subscribing to our newsletter</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1e293b; margin-bottom: 15px;">What you'll receive:</h2>
            <ul style="color: #475569; line-height: 1.6;">
              <li>📈 Latest market updates and analysis</li>
              <li>💡 Professional trading insights and strategies</li>
              <li>🎯 Exclusive educational content</li>
              <li>📊 Market trends and opportunities</li>
              <li>🚀 Trading tips from our experts</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #475569; font-size: 16px;">We're excited to have you on board!</p>
            <a href="https://www.prestigetradingacademy.uk" 
               style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px;">
              Visit Our Website
            </a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <div style="text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              You're receiving this because you subscribed to our newsletter at prestigetradingacademy.uk
            </p>
            <p style="font-size: 12px; color: #94a3b8; margin: 5px 0 0 0;">
              You can unsubscribe at any time by replying to this email.
            </p>
          </div>
        </div>
      `,
      });

    if (welcomeError) {
      console.error("Failed to send welcome email:", welcomeError);
      return {
        success: false,
        message: `Failed to send welcome email: ${welcomeError.message}`,
      };
    }

    // Send notification to admin
    const { data: adminEmail, error: adminError } = await resend.emails.send({
      from: "Prestige Trading Academy <noreply@prestigetradingacademy.uk>", // FIXED: Added noreply@ prefix
      to: ["news@prestigetradingacademy.uk"], // Your admin email
      subject: "🔔 New Newsletter Subscription",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #059669;">New Newsletter Subscription</h2>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Source:</strong> Website Newsletter Widget</p>
          </div>
          
          <p style="color: #374151;">A new user has subscribed to the Prestige Trading Academy newsletter.</p>
        </div>
      `,
    });

    if (adminError) {
      console.error("Failed to send admin notification:", adminError);
      // Don't fail the whole process if admin email fails
    }

    console.log(`✅ Newsletter subscription successful:`);
    console.log(`Subscriber: ${email}`);
    console.log(`Welcome email ID: ${welcomeEmail?.id}`);
    console.log(`Admin notification ID: ${adminEmail?.id}`);

    return {
      success: true,
      message: "Successfully subscribed! Check your email for confirmation.",
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
