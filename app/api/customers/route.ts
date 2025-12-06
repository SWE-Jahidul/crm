// Customers API endpoints

import { type NextRequest, NextResponse } from "next/server"

const mockCustomers = [
  {
    _id: "customer_1",
    organization_id: "org_1",
    first_name: "John",
    last_name: "Doe",
    email: "john@company.com",
    phone: "+1-555-2001",
    company_name: "Enterprise Corp",
    industry: "Technology",
    health_score: 88,
    lifetime_value: 150000,
    account_owner: "user_1",
    tags: ["vip", "renewing"],
    created_at: new Date("2024-06-01"),
    updated_at: new Date("2025-01-05"),
  },
  {
    _id: "customer_2",
    organization_id: "org_1",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@company2.com",
    phone: "+1-555-2002",
    company_name: "Innovation Inc",
    industry: "Finance",
    health_score: 75,
    lifetime_value: 85000,
    account_owner: "user_1",
    tags: ["growth_potential"],
    created_at: new Date("2024-08-15"),
    updated_at: new Date("2025-01-04"),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const skip = Number.parseInt(searchParams.get("skip") || "0")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  const paginated = mockCustomers.slice(skip, skip + limit)

  return NextResponse.json({
    data: paginated,
    total: mockCustomers.length,
    page: Math.floor(skip / limit) + 1,
    pages: Math.ceil(mockCustomers.length / limit),
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newCustomer = {
    _id: "customer_" + Date.now(),
    organization_id: "org_1",
    health_score: 70,
    lifetime_value: 0,
    ...body,
    created_at: new Date(),
    updated_at: new Date(),
  }

  return NextResponse.json(newCustomer, { status: 201 })
}
