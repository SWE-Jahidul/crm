"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Mail, Phone } from "lucide-react"
import { LeadForm } from "@/components/lead-form"

// Mock Leads Data
const mockLeads = [
  { _id: "1", first_name: "John", last_name: "Doe", company: "Acme Corp", lead_score: 85, status: "qualified", lead_source: "website_form" },
  { _id: "2", first_name: "Alice", last_name: "Smith", company: "Global Tech", lead_score: 92, status: "new", lead_source: "referral" },
  { _id: "3", first_name: "Robert", last_name: "Johnson", company: "Consulting LLC", lead_score: 45, status: "contacted", lead_source: "linkedin" },
  { _id: "4", first_name: "Emily", last_name: "Davis", company: "Design Studio", lead_score: 78, status: "converted", lead_source: "website_form" },
  { _id: "5", first_name: "Michael", last_name: "Brown", company: "Law Firm", lead_score: 30, status: "lost", lead_source: "cold_call" },
  { _id: "6", first_name: "Sarah", last_name: "Wilson", company: "Retail Chain", lead_score: 65, status: "qualified", lead_source: "conference" },
  { _id: "7", first_name: "David", last_name: "Miller", company: "Software House", lead_score: 88, status: "new", lead_source: "referral" },
  { _id: "8", first_name: "Jessica", last_name: "Taylor", company: "Marketing Agency", lead_score: 55, status: "contacted", lead_source: "website_form" },
  { _id: "9", first_name: "James", last_name: "Anderson", company: "Logistics Co", lead_score: 40, status: "lost", lead_source: "cold_call" },
  { _id: "10", first_name: "Laura", last_name: "Thomas", company: "Real Estate", lead_score: 95, status: "converted", lead_source: "other" }
]

export default function LeadsPage() {
  const [skip, setSkip] = useState(0)
  const [statusFilter, setStatusFilter] = useState("")
  const [formOpen, setFormOpen] = useState(false)

  // Filter leads based on status if needed
  const filteredLeads = statusFilter
    ? mockLeads.filter(lead => lead.status === statusFilter)
    : mockLeads

  // Paginate mock data
  const leads = filteredLeads.slice(skip, skip + 20)
  const total = filteredLeads.length

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-700 dark:text-green-400"
    if (score >= 60) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    return "bg-red-500/10 text-red-700 dark:text-red-400"
  }

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      contacted: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      qualified: "bg-green-500/10 text-green-700 dark:text-green-400",
      converted: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
      lost: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    }
    return colors[status] || ""
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">Manage and track your sales leads</p>
        </div>
        <Button className="gap-2" onClick={() => setFormOpen(true)}>
          <Plus size={20} />
          New Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter size={18} />
          Filters
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["", "new", "contacted", "qualified", "converted", "lost"].map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status)
              setSkip(0)
            }}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${statusFilter === status ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
          >
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "All"}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">Company</th>
                  <th className="px-6 py-3 text-left font-medium">Score</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Source</th>
                  <th className="px-6 py-3 text-left font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead: any) => (
                  <tr key={lead._id} className="border-b hover:bg-muted/50 transition-colors cursor-pointer">
                    <td className="px-6 py-3">
                      <Link href={`/leads/${lead._id}`} className="font-medium hover:underline">
                        {lead.first_name} {lead.last_name}
                      </Link>
                    </td>
                    <td className="px-6 py-3">{lead.company}</td>
                    <td className="px-6 py-3">
                      <Badge className={getScoreBadgeColor(lead.lead_score)}>{lead.lead_score}</Badge>
                    </td>
                    <td className="px-6 py-3">
                      <Badge className={getStatusBadgeColor(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">{lead.lead_source.replace(/_/g, " ")}</td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-primary/10 rounded">
                          <Mail size={16} />
                        </button>
                        <button className="p-1 hover:bg-primary/10 rounded">
                          <Phone size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {leads.length > 0 ? skip + 1 : 0} to {Math.min(skip + 20, total)} of {total} leads
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - 20))}>
            Previous
          </Button>
          <Button variant="outline" disabled={skip + 20 >= total} onClick={() => setSkip(skip + 20)}>
            Next
          </Button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  )
}
