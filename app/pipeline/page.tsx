"use client"

import { useState } from "react"
import { useFetch } from "@/lib/hooks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Filter } from "lucide-react"
import { DealForm } from "@/components/deal-form"

const STAGES = [
  { id: "new", label: "New", color: "bg-blue-500" },
  { id: "contacted", label: "Contacted", color: "bg-purple-500" },
  { id: "qualified", label: "Qualified", color: "bg-yellow-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "closing", label: "Closing", color: "bg-cyan-500" },
  { id: "won", label: "Won", color: "bg-green-500" },
  { id: "lost", label: "Lost", color: "bg-red-500" },
]

export default function PipelinePage() {
  const [formOpen, setFormOpen] = useState(false)
  const { data: dealsData } = useFetch("/api/deals?limit=100")
  const deals = dealsData?.data || []

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Pipeline</h1>
          <p className="text-muted-foreground">Manage your sales deals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter size={18} />
            Filter
          </Button>
          <Button className="gap-2" onClick={() => setFormOpen(true)}>
            <Plus size={20} />
            New Deal
          </Button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pipeline Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {stageValues.map(({ stage, value }) => (
              <div key={stage} className="text-center">
                <div className="text-sm text-muted-foreground">{stage}</div>
                <div className="text-lg font-bold">${(value / 1000).toFixed(0)}K</div>
              </div>
            ))}
            <div className="text-center border-l">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-lg font-bold text-primary">${(totalValue / 1000).toFixed(0)}K</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-min pb-4">
          {STAGES.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              {/* Stage Header */}
              <div className="flex items-center gap-2 mb-3 px-2">
                <div className={`w-3 h-3 rounded ${stage.color}`} />
                <h3 className="font-semibold">{stage.label}</h3>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {dealsByStage[stage.id].length}
                </span>
              </div>

              {/* Stage Column */}
              <div className="space-y-2 bg-muted/30 rounded-lg p-3 min-h-96">
                {dealsByStage[stage.id].map((deal: any) => (
                  <Card key={deal._id} className="bg-card hover:shadow-md transition-shadow cursor-move">
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-2">{deal.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{deal.customer_name}</p>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">${deal.value.toLocaleString()}</div>
                        <Badge variant="outline" className="text-xs">
                          {deal.probability}%
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Expected: {new Date(deal.expected_close_date).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Deal Button */}
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-foreground"
                  onClick={() => setFormOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add deal
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
