import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with better error handling
let supabase: any = null;

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
} catch (error) {
  console.error("Supabase initialization error:", error);
}

export async function POST(request: NextRequest) {
  try {
    console.log("Signup API called");

    // Check if Supabase is configured
    if (!supabase) {
      console.error("Supabase not configured. Missing environment variables:");
      console.error(
        "NEXT_PUBLIC_SUPABASE_URL:",
        !!process.env.NEXT_PUBLIC_SUPABASE_URL
      );
      console.error(
        "SUPABASE_SERVICE_ROLE_KEY:",
        !!process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      return NextResponse.json(
        {
          error:
            "Database not configured. Please set up Supabase environment variables.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log("Request body received:", Object.keys(body));

    const { referralNode, fullName, email, phone, password, confirmPassword } =
      body;

    // Validate required fields
    if (
      !referralNode ||
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate referral code
    if (referralNode.trim() !== "TRADEPRO2025") {
      console.log("Invalid referral code:", referralNode);
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 400 }
      );
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength (minimum 8 characters)
    if (password.length < 8) {
      console.log("Password too short");
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    console.log("All validations passed, checking for existing user");

    // Check if user already exists
    try {
      const { data: existingUser, error: selectError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no user found

      if (selectError) {
        console.error("Error checking existing user:", selectError);
        // Check if it's a table not found error
        if (
          selectError.message?.includes("relation") &&
          selectError.message?.includes("does not exist")
        ) {
          return NextResponse.json(
            {
              error:
                "Users table does not exist. Please set up the database schema first.",
            },
            { status: 500 }
          );
        }
        throw selectError;
      }

      if (existingUser) {
        console.log("User already exists");
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 }
        );
      }
    } catch (error: any) {
      console.error("Database check error:", error);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    // Create user in database
    try {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            referral_node: referralNode.trim(),
            full_name: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            password: password,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        return NextResponse.json(
          { error: `Failed to create user: ${insertError.message}` },
          { status: 500 }
        );
      }

      console.log("User created successfully");

      // Return success response (don't include sensitive data)
      return NextResponse.json(
        {
          message: "Account created successfully",
          user: {
            id: newUser.id,
            fullName: newUser.full_name,
          },
        },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Insert operation error:", error);
      return NextResponse.json(
        { error: `Database insert error: ${error.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
