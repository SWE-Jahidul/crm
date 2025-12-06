"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, TrendingUp, Edit2, Trash2, ArrowRight } from "lucide-react"
import { ActivityFeed } from "@/components/activity-feed"
import { CommunicationPanel } from "@/components/communication-panel"
import { NotesPanel } from "@/components/notes-panel"

export default function LeadDetailPage() {
  const params = useParams()
  const leadId = params.id as string

  const lead = {
    _id: leadId,
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
    city: "San Francisco",
    state: "CA",
    tags: ["enterprise", "high_priority", "saas"],
    created_at: "2025-01-01",
    updated_at: "2025-01-05",
    notes: "Very interested in enterprise solution. Budget approved for Q1.",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">
              {lead.first_name} {lead.last_name}
            </h1>
            <Badge className="bg-green-500/10 text-green-700 dark:text-green-400">{lead.status}</Badge>
          </div>
          <p className="text-muted-foreground">{lead.company}</p>
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
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">
                    {lead.city}, {lead.state}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium">{lead.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead Source</p>
                  <p className="font-medium">{lead.lead_source.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead Score</p>
                  <p className="font-medium text-lg text-primary">{lead.lead_score}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <NotesPanel />

          <CommunicationPanel customerId={leadId} />

          <ActivityFeed />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lead Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{lead.lead_score}</div>
                <div className="w-full bg-muted rounded-full h-2 mb-4">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${lead.lead_score}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">Very High Quality Lead</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {lead.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full gap-2">
              <ArrowRight size={18} />
              Convert to Deal
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Send Email
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Schedule Call
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Create Task
            </Button>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{lead.created_at}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{lead.updated_at}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
