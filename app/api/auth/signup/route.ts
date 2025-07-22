import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a proper database
// This is a simplified example using in-memory storage
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralNode, fullName, email, phone, password } = body

    // Validate required fields
    if (!referralNode || !fullName || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      referralNode,
      fullName,
      email,
      phone,
      password, // In production, hash this password
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Return success response (don't include password)
    const { password: _, ...userResponse } = newUser
    return NextResponse.json({ message: "User created successfully", user: userResponse }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
