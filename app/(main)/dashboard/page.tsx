"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Users, Target, CheckCircle2, ArrowUpRight, DollarSign, Activity } from "lucide-react"
import { useFetch } from "@/lib/hooks"

export default function DashboardPage() {
  // Fetch dashboard stats from API
  const { data: dashboardData, loading: statsLoading } = useFetch<any>('/dashboard/stats')
  const { data: leadsResponse, loading: leadsLoading } = useFetch<any>('/leads?limit=100')
  const { data: dealsResponse, loading: dealsLoading } = useFetch<any>('/deals?limit=100')

  if (statsLoading || leadsLoading || dealsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = dashboardData?.stats || {}
  const leadStats = leadsResponse?.data || []
  const dealStats = dealsResponse?.data || []

  const pipelineValue = stats.pipelineValue || 0
  const dealsWon = stats.wonDeals || 0
  const avgDealSize = dealStats.length > 0 ? Math.round(pipelineValue / dealStats.length) : 0
  const openTasks = stats.openTasks || 0

  const stageDistribution = [
    { name: "New", value: dealStats.filter((d) => d.stage === "new").length },
    { name: "Contacted", value: dealStats.filter((d) => d.stage === "contacted").length },
    { name: "Qualified", value: dealStats.filter((d) => d.stage === "qualified").length },
    { name: "Negotiation", value: dealStats.filter((d) => d.stage === "negotiation").length },
    { name: "Closing", value: dealStats.filter((d) => d.stage === "closing").length },
  ]

  // Enhanced chart data with gradients
  const chartData = stageDistribution.map(item => ({
    ...item,
    fill: "url(#colorGradient)"
  }))

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome back! Here's your executive overview.
        </p>
      </div>

      {/* Premium KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-none shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/80">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(pipelineValue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-indigo-100 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </Card>

        <Card className="border shadow-md hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Total Leads</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{leadStats.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600 font-medium">{leadStats.filter((l) => l.status === "qualified").length} qualified</span> leads
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-md hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Avg Deal Size</CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <Target className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${avgDealSize.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {dealsWon} deals won this period
            </p>
          </CardContent>
        </Card>

        <Card className="border shadow-md hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Open Tasks</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Action items due this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-md border-none ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Deal Pipeline
              </CardTitle>
              <CardDescription>Visual breakdown of deal stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#colorGradient)"
                      radius={[6, 6, 0, 0]}
                      barSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-none ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Where your healthy leads are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Custom Progress Bar for Lead Status */}
                {["New", "Contacted", "Qualified", "Converted"].map((status, i) => {
                  const count = leadStats.filter((l) => l.status.toLowerCase() === status.toLowerCase()).length;
                  const total = leadStats.length;
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  const colors = ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-indigo-500"];

                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{status}</span>
                        <span className="text-gray-500">{percentage.toFixed(0)}% ({count})</span>
                      </div>
                      <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${colors[i]}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Column */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-md border-none ring-1 ring-slate-200 dark:ring-slate-800">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                {/* Timeline Item 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-8 last:pb-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-indigo-600 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ml-4 md:ml-0 md:mr-0 z-0">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100">New deal created</div>
                      <time className="font-caveat font-medium text-xs text-indigo-500">Just now</time>
                    </div>
                    <div className="text-slate-500 text-sm">Enterprise Package for $100k</div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-8 last:pb-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-sky-100 text-sky-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ml-4 md:ml-0 md:mr-0 z-0">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Lead Qualified</div>
                      <time className="font-caveat font-medium text-xs text-slate-500">2h ago</time>
                    </div>
                    <div className="text-slate-500 text-sm">Alice Johnson moved to Qualified</div>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-8 last:pb-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm ml-4 md:ml-0 md:mr-0 z-0">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100">Task Completed</div>
                      <time className="font-caveat font-medium text-xs text-slate-500">5h ago</time>
                    </div>
                    <div className="text-slate-500 text-sm">Follow-up with John Doe</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
