// Deals API endpoints

import { type NextRequest, NextResponse } from "next/server"

const mockDeals = [
  {
    _id: "deal_1",
    organization_id: "org_1",
    name: "Enterprise Package - Corp",
    customer_id: "customer_1",
    customer_name: "Enterprise Corp",
    value: 100000,
    stage: "negotiation",
    probability: 75,
    expected_close_date: new Date("2025-02-28"),
    owner_id: "user_1",
    owner_name: "Demo User",
    created_at: new Date("2024-12-01"),
    updated_at: new Date("2025-01-05"),
  },
  {
    _id: "deal_2",
    organization_id: "org_1",
    name: "Professional Plan - Innovation",
    customer_id: "customer_2",
    customer_name: "Innovation Inc",
    value: 50000,
    stage: "qualified",
    probability: 50,
    expected_close_date: new Date("2025-02-15"),
    owner_id: "user_1",
    owner_name: "Demo User",
    created_at: new Date("2024-12-15"),
    updated_at: new Date("2025-01-03"),
  },
  {
    _id: "deal_3",
    organization_id: "org_1",
    name: "Starter Plan - Prospect",
    customer_id: "lead_1",
    customer_name: "Tech Startup Inc",
    value: 30000,
    stage: "contacted",
    probability: 25,
    expected_close_date: new Date("2025-03-01"),
    owner_id: "user_1",
    owner_name: "Demo User",
    created_at: new Date("2024-12-20"),
    updated_at: new Date("2025-01-02"),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const skip = Number.parseInt(searchParams.get("skip") || "0")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const stage = searchParams.get("stage")

  let filtered = mockDeals
  if (stage) {
    filtered = filtered.filter((deal) => deal.stage === stage)
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

  const newDeal = {
    _id: "deal_" + Date.now(),
    organization_id: "org_1",
    owner_name: "Demo User",
    probability: 25,
    ...body,
    created_at: new Date(),
    updated_at: new Date(),
  }

  return NextResponse.json(newDeal, { status: 201 })
}
