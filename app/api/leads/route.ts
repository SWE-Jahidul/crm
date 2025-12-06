// Leads API endpoints

import { type NextRequest, NextResponse } from "next/server"

// Mock leads data
const mockLeads = [
  {
    _id: "lead_1",
    organization_id: "org_1",
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@prospect.com",
    phone: "+1-555-1001",
    company: "Tech Startup Inc",
    position: "Marketing Manager",
    status: "qualified",
    lead_score: 85,
    lead_source: "website_form",
    assigned_to: "user_1",
    assigned_at: new Date("2025-01-01"),
    tags: ["enterprise", "high_priority"],
    created_at: new Date("2025-01-01"),
    updated_at: new Date("2025-01-05"),
  },
  {
    _id: "lead_2",
    organization_id: "org_1",
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@prospect.com",
    phone: "+1-555-1002",
    company: "Finance Corp",
    position: "CFO",
    status: "contacted",
    lead_score: 72,
    lead_source: "referral",
    assigned_to: "user_1",
    assigned_at: new Date("2025-01-02"),
    tags: ["enterprise"],
    created_at: new Date("2025-01-02"),
    updated_at: new Date("2025-01-04"),
  },
  {
    _id: "lead_3",
    organization_id: "org_1",
    first_name: "Carol",
    last_name: "Wilson",
    email: "carol@prospect.com",
    phone: "+1-555-1003",
    company: "Marketing Agency",
    position: "Founder",
    status: "new",
    lead_score: 45,
    lead_source: "cold_email",
    assigned_to: "user_1",
    assigned_at: new Date("2025-01-03"),
    tags: ["smb"],
    created_at: new Date("2025-01-03"),
    updated_at: new Date("2025-01-03"),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const skip = Number.parseInt(searchParams.get("skip") || "0")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const status = searchParams.get("status")

  let filtered = mockLeads
  if (status) {
    filtered = filtered.filter((lead) => lead.status === status)
  }

  const paginated = filtered.slice(skip, skip + limit)

  return NextResponse.json({
    data: paginated,
    total: filtered.length,
    page: Math.floor(skip / limit) + 1,
    pages: Math.ceil(filtered.length / limit),
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newLead = {
    _id: "lead_" + Date.now(),
    organization_id: "org_1",
    ...body,
    created_at: new Date(),
    updated_at: new Date(),
    lead_score: 50,
    status: "new",
  }

  return NextResponse.json(newLead, { status: 201 })
}
