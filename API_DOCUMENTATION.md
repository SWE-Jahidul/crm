# CRM Software - API Documentation

## Base URL
\`\`\`
http://localhost:3000/api
\`\`\`

## Authentication

All endpoints require Bearer token authentication (except login).

**Header Format:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints Overview

### Authentication

#### POST /auth/login
Login with credentials.

**Request:**
\`\`\`json
{
  "email": "demo@crm.com",
  "password": "demo123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "access_token": "token_string",
  "user": { /* user object */ },
  "organization": { /* organization object */ }
}
\`\`\`

---

#### GET /auth/me
Get current user information.

**Response:**
\`\`\`json
{
  "user": { /* user object */ },
  "organization": { /* organization object */ }
}
\`\`\`

---

### Leads

#### GET /leads
Get list of leads with pagination and filtering.

**Query Parameters:**
- `skip`: Skip records (default: 0)
- `limit`: Records per page (default: 20)
- `status`: Filter by status
- `score_min`: Min lead score
- `score_max`: Max lead score
- `source`: Filter by source

**Response:**
\`\`\`json
{
  "data": [ /* leads array */ ],
  "total": 100,
  "pages": 5,
  "page": 1
}
\`\`\`

#### POST /leads
Create a new lead.

**Request:**
\`\`\`json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "+1-555-0000",
  "company": "Company Inc",
  "position": "Manager",
  "lead_source": "website_form",
  "status": "new"
}
\`\`\`

#### GET /leads/:id
Get lead details.

#### PATCH /leads/:id
Update lead information.

#### DELETE /leads/:id
Delete a lead.

---

### Customers

#### GET /customers
Get customer list with pagination.

**Query Parameters:**
- `skip`: Skip records
- `limit`: Records per page
- `segment`: Filter by segment
- `health_score_min`: Min health score

#### POST /customers
Create a new customer.

#### GET /customers/:id
Get customer details.

#### PATCH /customers/:id
Update customer information.

#### DELETE /customers/:id
Delete a customer.

---

### Deals

#### GET /deals
Get deals list.

**Query Parameters:**
- `skip`: Skip records
- `limit`: Records per page
- `stage`: Filter by stage
- `pipeline_id`: Filter by pipeline

#### POST /deals
Create a new deal.

**Request:**
\`\`\`json
{
  "name": "Enterprise Package",
  "customer_id": "cust_123",
  "value": 100000,
  "stage": "new",
  "probability": 25,
  "expected_close_date": "2025-06-30"
}
\`\`\`

#### GET /deals/:id
Get deal details.

#### PATCH /deals/:id
Update deal.

#### PATCH /deals/:id/stage
Change deal stage.

**Request:**
\`\`\`json
{
  "new_stage": "negotiation"
}
\`\`\`

#### POST /deals/:id/close
Close a deal (won/lost).

---

### Tasks

#### GET /tasks
Get tasks list.

**Query Parameters:**
- `skip`: Skip records
- `status`: Filter by status
- `assigned_to`: Filter by user
- `due_date_from`: From date
- `due_date_to`: To date

#### POST /tasks
Create a new task.

**Request:**
\`\`\`json
{
  "title": "Follow up call",
  "description": "Details here",
  "category": "call",
  "priority": "high",
  "due_date": "2025-01-20",
  "assigned_to": "user_id",
  "related_to_type": "customer",
  "related_to_id": "customer_id"
}
\`\`\`

#### GET /tasks/:id
Get task details.

#### PATCH /tasks/:id
Update task.

#### PATCH /tasks/:id/complete
Mark task as complete.

#### DELETE /tasks/:id
Delete task.

---

### Communications

#### GET /communications/emails
Get email list.

#### POST /communications/emails/send
Send an email.

#### GET /communications/calls
Get call log.

#### POST /communications/calls/log
Log a call.

#### GET /communications/sms
Get SMS messages.

#### POST /communications/sms/send
Send SMS message.

---

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "message": "Validation error details"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "message": "Invalid or expired token"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "message": "Resource not found"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "message": "Internal server error"
}
\`\`\`

---

## Rate Limiting

- 100 requests per minute per user
- Contact support for higher limits

---

## Webhooks (Future)

\`\`\`
POST /webhooks/subscribe
POST /webhooks/events
\`\`\`

## Data Models

### User
\`\`\`typescript
{
  _id: string
  organization_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive"
  created_at: Date
  updated_at: Date
}
\`\`\`

### Lead
\`\`\`typescript
{
  _id: string
  first_name: string
  last_name: string
  email: string
  company: string
  lead_score: number
  status: string
  lead_source: string
  created_at: Date
  updated_at: Date
}
\`\`\`

### Customer
\`\`\`typescript
{
  _id: string
  first_name: string
  last_name: string
  company_name: string
  health_score: number
  lifetime_value: number
  tags: string[]
  created_at: Date
  updated_at: Date
}
\`\`\`

### Deal
\`\`\`typescript
{
  _id: string
  name: string
  customer_id: string
  value: number
  stage: string
  probability: number
  expected_close_date: Date
  created_at: Date
  updated_at: Date
}
\`\`\`

---

## Testing

Use Postman or cURL to test endpoints:

\`\`\`bash
# Get leads
curl -H "Authorization: Bearer token" \
  http://localhost:3000/api/leads

# Create lead
curl -X POST \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","email":"john@example.com"}' \
  http://localhost:3000/api/leads
