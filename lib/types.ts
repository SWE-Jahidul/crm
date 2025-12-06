// CRM Data Types and Database Schemas

export interface User {
  _id: string
  organization_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: "admin" | "manager" | "sales_exec" | "support"
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}

export interface Organization {
  _id: string
  name: string
  email: string
  phone: string
  timezone: string
  currency: string
  language: string
  created_at: Date
}

export interface Lead {
  _id: string
  organization_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  position: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  lead_score: number
  lead_source: string
  assigned_to: string
  assigned_at: Date
  tags: string[]
  created_at: Date
  updated_at: Date
}

export interface Customer {
  _id: string
  organization_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  industry: string
  health_score: number
  lifetime_value: number
  account_owner: string
  tags: string[]
  created_at: Date
  updated_at: Date
}

export interface Deal {
  _id: string
  organization_id: string
  name: string
  customer_id: string
  customer_name: string
  value: number
  stage: "new" | "contacted" | "qualified" | "negotiation" | "closing" | "won" | "lost"
  probability: number
  expected_close_date: Date
  owner_id: string
  owner_name: string
  created_at: Date
  updated_at: Date
}

export interface Task {
  _id: string
  organization_id: string
  title: string
  description: string
  category: "call" | "email" | "meeting" | "follow_up" | "other"
  priority: "high" | "medium" | "low"
  status: "open" | "completed" | "cancelled"
  due_date: Date
  assigned_to: string
  related_to_type: "customer" | "deal" | "lead"
  related_to_id: string
  created_at: Date
  completed_at?: Date
}

export interface Activity {
  _id: string
  organization_id: string
  activity_type: "call" | "email" | "note" | "status_change" | "task_created"
  title: string
  description: string
  related_to_type: "customer" | "deal" | "lead"
  related_to_id: string
  performed_by: string
  timestamp: Date
}

export interface AuthResponse {
  access_token: string
  user: User
  organization: Organization
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pages: number
}
