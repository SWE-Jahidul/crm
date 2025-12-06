"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"

// Mock Data
const mockLeads = [
  { id: 1, name: "Alice Johnson", status: "qualified", company: "Tech Startup Inc" },
  { id: 2, name: "Bob Smith", status: "new", company: "Global Corp" },
  { id: 3, name: "Carol White", status: "contacted", company: "Design Studio" },
  { id: 4, name: "David Brown", status: "converted", company: "Law Firm" },
  { id: 5, name: "Eva Green", status: "lost", company: "Consulting Group" },
  { id: 6, name: "Frank Miller", status: "qualified", company: "Retail Chain" },
  { id: 7, name: "Grace Lee", status: "new", company: "Software House" },
]

const mockDeals = [
  { id: 1, title: "Enterprise License", value: 50000, stage: "negotiation" },
  { id: 2, title: "Startup Package", value: 5000, stage: "won" },
  { id: 3, title: "Consulting Project", value: 15000, stage: "qualified" },
  { id: 4, title: "Maintenance Contract", value: 8000, stage: "closing" },
  { id: 5, title: "Training Session", value: 2000, stage: "new" },
  { id: 6, title: "Custom Development", value: 25000, stage: "contacted" },
]

const mockTasks = [
  { id: 1, title: "Follow up with Alice", status: "open", dueDate: "2024-03-20" },
  { id: 2, title: "Prepare proposal for Global Corp", status: "completed", dueDate: "2024-03-18" },
  { id: 3, title: "Schedule demo", status: "open", dueDate: "2024-03-21" },
  { id: 4, title: "Email marketing campaign", status: "open", dueDate: "2024-03-22" },
]

export default function DashboardPage() {
  const leadStats = mockLeads
  const dealStats = mockDeals
  const taskStats = mockTasks

  const pipelineValue = dealStats.reduce((sum, deal) => sum + deal.value, 0)
  const dealsWon = dealStats.filter((d) => d.stage === "won").length
  const avgDealSize = dealStats.length > 0 ? Math.round(pipelineValue / dealStats.length) : 0
  const openTasks = taskStats.filter((t) => t.status === "open").length

  const stageDistribution = [
    { name: "New", value: dealStats.filter((d) => d.stage === "new").length },
    { name: "Contacted", value: dealStats.filter((d) => d.stage === "contacted").length },
    { name: "Qualified", value: dealStats.filter((d) => d.stage === "qualified").length },
    { name: "Negotiation", value: dealStats.filter((d) => d.stage === "negotiation").length },
    { name: "Closing", value: dealStats.filter((d) => d.stage === "closing").length },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your sales overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(pipelineValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">{dealStats.length} open deals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadStats.length}</div>
            <p className="text-xs text-muted-foreground">
              {leadStats.filter((l) => l.status === "qualified").length} qualified
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{dealsWon} won this period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTasks}</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Deal Pipeline by Stage</CardTitle>
            <CardDescription>Number of deals at each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Leads by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["new", "contacted", "qualified", "converted", "lost"].map((status) => {
                const count = leadStats.filter((l) => l.status === status).length
                const percentage = leadStats.length > 0 ? (count / leadStats.length) * 100 : 0
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize">{status}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <p className="text-sm font-medium">New deal created</p>
                <p className="text-xs text-muted-foreground">Enterprise Package - Corp for $100,000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-accent mt-2" />
              <div>
                <p className="text-sm font-medium">Lead qualified</p>
                <p className="text-xs text-muted-foreground">Alice Johnson from Tech Startup Inc</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-chart-2 mt-2" />
              <div>
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-muted-foreground">Follow-up call with John Doe</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
