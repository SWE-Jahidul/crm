"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter, MoreHorizontal, Calendar, DollarSign, ArrowRight } from "lucide-react"
import { DealForm } from "@/components/deal-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const STAGES = [
  { id: "new", label: "New", color: "bg-blue-500", lightColor: "bg-blue-50 dark:bg-blue-900/10", borderColor: "border-blue-200 dark:border-blue-800" },
  { id: "contacted", label: "Contacted", color: "bg-purple-500", lightColor: "bg-purple-50 dark:bg-purple-900/10", borderColor: "border-purple-200 dark:border-purple-800" },
  { id: "qualified", label: "Qualified", color: "bg-yellow-500", lightColor: "bg-yellow-50 dark:bg-yellow-900/10", borderColor: "border-yellow-200 dark:border-yellow-800" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500", lightColor: "bg-orange-50 dark:bg-orange-900/10", borderColor: "border-orange-200 dark:border-orange-800" },
  { id: "closing", label: "Closing", color: "bg-cyan-500", lightColor: "bg-cyan-50 dark:bg-cyan-900/10", borderColor: "border-cyan-200 dark:border-cyan-800" },
  { id: "won", label: "Won", color: "bg-green-500", lightColor: "bg-green-50 dark:bg-green-900/10", borderColor: "border-green-200 dark:border-green-800" },
  { id: "lost", label: "Lost", color: "bg-red-500", lightColor: "bg-red-50 dark:bg-red-900/10", borderColor: "border-red-200 dark:border-red-800" },
]

// Mock Deals Data
const mockDeals = [
  { _id: "1", name: "Enterprise License", value: 50000, stage: "negotiation", probability: 75, expected_close_date: "2024-04-15", customer_name: "Tech Startup Inc" },
  { _id: "2", name: "Startup Package", value: 5000, stage: "won", probability: 100, expected_close_date: "2024-03-01", customer_name: "Global Corp" },
  { _id: "3", name: "Consulting Project", value: 15000, stage: "qualified", probability: 50, expected_close_date: "2024-05-10", customer_name: "Design Studio" },
  { _id: "4", name: "Maintenance Contract", value: 8000, stage: "closing", probability: 90, expected_close_date: "2024-03-20", customer_name: "Law Firm" },
  { _id: "5", name: "Training Session", value: 2000, stage: "new", probability: 20, expected_close_date: "2024-06-01", customer_name: "Consulting Group" },
  { _id: "6", name: "Custom Development", value: 25000, stage: "contacted", probability: 40, expected_close_date: "2024-04-30", customer_name: "Retail Chain" },
  { _id: "7", name: "Cloud Migration", value: 12000, stage: "new", probability: 25, expected_close_date: "2024-05-20", customer_name: "Software House" },
  { _id: "8", name: "Security Audit", value: 9000, stage: "negotiation", probability: 70, expected_close_date: "2024-04-05", customer_name: "Marketing Agency" },
  { _id: "9", name: "API Integration", value: 6000, stage: "qualified", probability: 55, expected_close_date: "2024-05-01", customer_name: "Logistics Co" },
  { _id: "10", name: "Mobile App V2", value: 40000, stage: "lost", probability: 0, expected_close_date: "2024-02-15", customer_name: "Real Estate" }
]

export default function PipelinePage() {
  const [formOpen, setFormOpen] = useState(false)
  const deals = mockDeals

  const dealsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage.id] = deals.filter((deal: any) => deal.stage === stage.id)
      return acc
    },
    {} as Record<string, any[]>,
  )

  const stageValues = STAGES.map((stage) => ({
    stage: stage.label,
    value: dealsByStage[stage.id].reduce((sum: number, deal: any) => sum + deal.value, 0),
  }))

  const totalValue = stageValues.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Pipeline
          </h1>
          <p className="text-lg text-muted-foreground">
            Visualise and manage your sales process
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
            <Filter size={18} />
            Filter
          </Button>
          <Button onClick={() => setFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
            <Plus size={20} className="mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {stageValues.map(({ stage, value }) => (
              <div key={stage} className="text-center p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{stage}</div>
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100">${(value / 1000).toFixed(0)}K</div>
              </div>
            ))}
            <div className="text-center p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Total Value</div>
              <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300">${(totalValue / 1000).toFixed(0)}K</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-6 min-w-max">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80 flex flex-col gap-3">
              {/* Stage Header */}
              <div className={`flex items-center justify-between p-3 rounded-xl border ${stage.borderColor} ${stage.lightColor}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color} ring-2 ring-white dark:ring-slate-950`} />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{stage.label}</h3>
                </div>
                <Badge variant="secondary" className="bg-white dark:bg-slate-900 shadow-sm text-slate-600 dark:text-slate-400 font-mono">
                  {dealsByStage[stage.id].length}
                </Badge>
              </div>

              {/* Stage Column */}
              <div className="flex-1 space-y-3 min-h-[500px]">
                {dealsByStage[stage.id].map((deal: any) => (
                  <Card key={deal._id} className="group bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-move border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 border-slate-200 dark:border-slate-700 text-slate-500`}>
                          {deal.customer_name}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 -mr-2 -mt-1">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                            <DropdownMenuItem>Move Stage</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-indigo-600 transition-colors">
                        {deal.name}
                      </h4>

                      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                        <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                          <DollarSign size={14} className="text-emerald-500" />
                          {deal.value.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar size={12} />
                          {new Date(deal.expected_close_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      {/* Probability Bar */}
                      <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stage.color} opacity-80`}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Deal Button (Ghost) */}
                <Button variant="ghost" className="w-full border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 h-10">
                  <Plus size={16} className="mr-2" />
                  Add Deal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DealForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  )
}
