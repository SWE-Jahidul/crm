"use client"

import { useFetch } from "@/lib/hooks"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"

export default function DashboardPage() {
  const { data: leads } = useFetch("/api/leads?limit=100")
  const { data: customers } = useFetch("/api/customers?limit=100")
  const { data: deals } = useFetch("/api/deals?limit=100")
  const { data: tasks } = useFetch("/api/tasks?limit=100")

  const leadStats = leads?.data || []
  const dealStats = deals?.data || []
  const taskStats = tasks?.data || []

  const pipelineValue = dealStats.reduce((sum: number, deal: any) => sum + deal.value, 0)
  const dealsWon = dealStats.filter((d: any) => d.stage === "won").length
  const avgDealSize = dealStats.length > 0 ? Math.round(pipelineValue / dealStats.length) : 0
  const openTasks = taskStats.filter((t: any) => t.status === "open").length

  const stageDistribution = [
    { name: "New", value: dealStats.filter((d: any) => d.stage === "new").length },
    { name: "Contacted", value: dealStats.filter((d: any) => d.stage === "contacted").length },
    { name: "Qualified", value: dealStats.filter((d: any) => d.stage === "qualified").length },
    { name: "Negotiation", value: dealStats.filter((d: any) => d.stage === "negotiation").length },
    { name: "Closing", value: dealStats.filter((d: any) => d.stage === "closing").length },
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
              {leadStats.filter((l: any) => l.status === "qualified").length} qualified
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
                const count = leadStats.filter((l: any) => l.status === status).length
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
