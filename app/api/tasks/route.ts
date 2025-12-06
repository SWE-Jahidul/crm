// Tasks API endpoints

import { type NextRequest, NextResponse } from "next/server"

const mockTasks = [
  {
    _id: "task_1",
    organization_id: "org_1",
    title: "Call John Doe - Follow up on proposal",
    description: "Discuss pricing and timeline",
    category: "call",
    priority: "high",
    status: "open",
    due_date: new Date("2025-01-15"),
    assigned_to: "user_1",
    related_to_type: "customer",
    related_to_id: "customer_1",
    created_at: new Date("2025-01-05"),
  },
  {
    _id: "task_2",
    organization_id: "org_1",
    title: "Send email to Jane Smith",
    description: "Follow up on contract details",
    category: "email",
    priority: "medium",
    status: "open",
    due_date: new Date("2025-01-16"),
    assigned_to: "user_1",
    related_to_type: "customer",
    related_to_id: "customer_2",
    created_at: new Date("2025-01-04"),
  },
  {
    _id: "task_3",
    organization_id: "org_1",
    title: "Schedule meeting with Alice",
    description: "Product demo and discovery call",
    category: "meeting",
    priority: "high",
    status: "open",
    due_date: new Date("2025-01-14"),
    assigned_to: "user_1",
    related_to_type: "lead",
    related_to_id: "lead_1",
    created_at: new Date("2025-01-03"),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const skip = Number.parseInt(searchParams.get("skip") || "0")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const status = searchParams.get("status")

  let filtered = mockTasks
  if (status) {
    filtered = filtered.filter((task) => task.status === status)
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

  const newTask = {
    _id: "task_" + Date.now(),
    organization_id: "org_1",
    status: "open",
    ...body,
    created_at: new Date(),
  }

  return NextResponse.json(newTask, { status: 201 })
}
