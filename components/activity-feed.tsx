"use client"

import type React from "react"

import { Mail, Phone, MessageSquare, FileText, CheckCircle2, User, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  _id: string
  type: "email" | "call" | "note" | "task" | "deal_updated" | "contact_added"
  title: string
  description: string
  timestamp: string
  user?: string
}

interface ActivityFeedProps {
  activities?: Activity[]
  compact?: boolean
}

export function ActivityFeed({ activities = [], compact = false }: ActivityFeedProps) {
  const defaultActivities: Activity[] = [
    {
      _id: "1",
      type: "email",
      title: "Email sent",
      description: "Sent proposal to customer",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "2",
      type: "call",
      title: "Call logged",
      description: "Discussed implementation timeline",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "3",
      type: "note",
      title: "Note added",
      description: "Customer interested in Q3 implementation",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const items = activities.length > 0 ? activities : defaultActivities

  const getActivityIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      email: <Mail className="h-4 w-4" />,
      call: <Phone className="h-4 w-4" />,
      note: <MessageSquare className="h-4 w-4" />,
      task: <CheckCircle2 className="h-4 w-4" />,
      deal_updated: <FileText className="h-4 w-4" />,
      contact_added: <User className="h-4 w-4" />,
    }
    return icons[type] || <Calendar className="h-4 w-4" />
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  if (compact) {
    return (
      <div className="space-y-3">
        {items.slice(0, 3).map((activity) => (
          <div key={activity._id} className="flex items-start gap-3">
            <div className="text-muted-foreground mt-1">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{formatTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>All interactions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((activity) => (
            <div key={activity._id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="w-0.5 h-12 bg-border mt-2" />
              </div>
              <div className="pb-8">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{formatTime(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
