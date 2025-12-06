// Get current user endpoint

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Mock user data
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

  return NextResponse.json({
    user,
    organization,
  })
}
