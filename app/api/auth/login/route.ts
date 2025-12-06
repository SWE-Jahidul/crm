// Login API endpoint

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - In production, validate against database
    if (email === "demo@crm.com" && password === "demo123") {
      const user = {
        _id: "user_1",
        organization_id: "org_1",
        first_name: "Demo",
        last_name: "User",
        email: "demo@crm.com",
        phone: "555-0000",
        role: "admin",
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      }

      const organization = {
        _id: "org_1",
        name: "Demo Company",
        email: "company@example.com",
        phone: "555-0001",
        timezone: "America/New_York",
        currency: "USD",
        language: "en",
        created_at: new Date(),
      }

      // In production, sign JWT token
      const token = "mock_token_" + Math.random().toString(36).substr(2, 9)

      return NextResponse.json({
        access_token: token,
        user,
        organization,
      })
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
