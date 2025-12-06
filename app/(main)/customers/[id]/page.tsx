"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Edit2, Trash2 } from "lucide-react"
import { ActivityFeed } from "@/components/activity-feed"
import { CommunicationPanel } from "@/components/communication-panel"
import { NotesPanel } from "@/components/notes-panel"

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params.id as string

  const customer = {
    _id: customerId,
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
    website: "https://enterprise-corp.com",
    employees: "100-500",
    description: "Major enterprise client with strong growth trajectory",
  }

  const deals = [
    { id: 1, name: "Enterprise Package", value: 100000, stage: "negotiation" },
    { id: 2, name: "Professional Plan Renewal", value: 50000, stage: "won" },
  ]

  const contacts = [
    { name: "Jane Smith", title: "Finance Manager", email: "jane@enterprise.com" },
    { name: "Mike Johnson", title: "IT Director", email: "mike@enterprise.com" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">
              {customer.first_name} {customer.last_name}
            </h1>
            <Badge className="bg-green-500/10 text-green-700">Healthy</Badge>
          </div>
          <p className="text-muted-foreground">{customer.company_name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit2 size={18} />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Deals</CardTitle>
              <CardDescription>
                {deals.length} deals worth ${deals.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deals.map((deal) => (
                  <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{deal.name}</p>
                      <p className="text-xs text-muted-foreground">{deal.stage}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${deal.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Contacts</CardTitle>
              <CardDescription>{contacts.length} contacts at this organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.email} className="p-3 border rounded-lg">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <p className="text-xs text-primary">{contact.email}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <NotesPanel />

          <CommunicationPanel customerId={customerId} />

          <ActivityFeed />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{customer.health_score}</div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-accent h-2 rounded-full" style={{ width: `${customer.health_score}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">Excellent Health</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lifetime Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">${(customer.lifetime_value / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground mt-2">Total revenue generated</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Industry</p>
                <p className="font-medium">{customer.industry}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Size</p>
                <p className="font-medium">{customer.employees} employees</p>
              </div>
              <div>
                <p className="text-muted-foreground">Website</p>
                <p className="font-medium text-primary truncate">{customer.website}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full">Create Deal</Button>
            <Button variant="outline" className="w-full bg-transparent">
              Send Email
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
