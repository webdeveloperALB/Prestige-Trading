import { NextResponse } from "next/server"

// Mock data for demonstration
// In a real application, this would come from your database
const mockUsers = [
  {
    id: "1",
    referralNode: "ELITE001",
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: "2",
    referralNode: "ELITE002",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 234-5678",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "3",
    referralNode: "ELITE003",
    fullName: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 345-6789",
    createdAt: new Date().toISOString(), // Today
  },
  {
    id: "4",
    referralNode: "ELITE004",
    fullName: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    phone: "+1 (555) 456-7890",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: "5",
    referralNode: "ELITE005",
    fullName: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    createdAt: new Date().toISOString(), // Today
  },
]

export async function GET() {
  try {
    // In a real application, you would:
    // 1. Verify admin authentication
    // 2. Query your database for all users
    // 3. Apply any filtering or pagination

    return NextResponse.json(mockUsers, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
