"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Mail, Phone, MoreHorizontal, FileText, ArrowUpDown } from "lucide-react"
import { LeadForm } from "@/components/lead-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock Leads Data
const mockLeads = [
  { _id: "1", first_name: "Alice", last_name: "Johnson", email: "alice@techstartup.com", phone: "+1 555-0101", company_name: "Tech Startup Inc", status: "New", source: "Website", created_at: "2024-03-10T10:00:00Z" },
  { _id: "2", first_name: "Bob", last_name: "Smith", email: "bob@globalcorp.com", phone: "+1 555-0102", company_name: "Global Corp", status: "Qualified", source: "Referral", created_at: "2024-03-09T14:30:00Z" },
  { _id: "3", first_name: "Carol", last_name: "White", email: "carol@design.com", phone: "+1 555-0103", company_name: "Design Studio", status: "Contacted", source: "LinkedIn", created_at: "2024-03-08T09:15:00Z" },
  { _id: "4", first_name: "David", last_name: "Brown", email: "david@law.com", phone: "+1 555-0104", company_name: "Law Firm", status: "Converted", source: "Event", created_at: "2024-03-07T16:45:00Z" },
  { _id: "5", first_name: "Eva", last_name: "Green", email: "eva@consult.com", phone: "+1 555-0105", company_name: "Consulting Group", status: "Lost", source: "Website", created_at: "2024-03-06T11:20:00Z" },
  { _id: "6", first_name: "Frank", last_name: "Miller", email: "frank@retail.com", phone: "+1 555-0106", company_name: "Retail Chain", status: "New", source: "Ads", created_at: "2024-03-05T13:10:00Z" },
  { _id: "7", first_name: "Grace", last_name: "Lee", email: "grace@soft.com", phone: "+1 555-0107", company_name: "Software House", status: "Qualified", source: "Referral", created_at: "2024-03-04T15:55:00Z" },
  { _id: "8", first_name: "Henry", last_name: "Wilson", email: "henry@manufacture.com", phone: "+1 555-0108", company_name: "Manufacture Co", status: "Contacted", source: "Cold Call", created_at: "2024-03-03T08:40:00Z" },
  { _id: "9", first_name: "Isabel", last_name: "Taylor", email: "isabel@market.com", phone: "+1 555-0109", company_name: "Marketing Agency", status: "New", source: "Website", created_at: "2024-03-02T12:25:00Z" },
  { _id: "10", first_name: "Jack", last_name: "Anderson", email: "jack@logistics.com", phone: "+1 555-0110", company_name: "Logistics Co", status: "Qualified", source: "LinkedIn", created_at: "2024-03-01T10:50:00Z" }
]

export default function LeadsPage() {
  const [skip, setSkip] = useState(0)
  const [statusFilter, setStatusFilter] = useState("")
  const [formOpen, setFormOpen] = useState(false)

  // Filter and paginate mock data
  const filteredLeads = mockLeads.filter(lead => statusFilter ? lead.status === statusFilter : true)
  const leads = filteredLeads.slice(skip, skip + 20)
  const total = filteredLeads.length

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
      case "contacted": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800"
      case "qualified": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
      case "converted": return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
      case "lost": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
      default: return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Leads
          </h1>
          <p className="text-lg text-muted-foreground">
            Capture and nurture your potential customers
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
          <Plus size={20} className="mr-2" />
          Add New Lead
        </Button>
      </div>

      <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search leads by name, email or company..." className="pl-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter size={16} />
                    {statusFilter || "All Status"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("New")}>New</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Contacted")}>Contacted</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Qualified")}>Qualified</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Converted")}>Converted</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Lost")}>Lost</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <TableHead className="w-[250px] font-semibold">Name & Company</TableHead>
                  <TableHead className="font-semibold">Contact Info</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Source</TableHead>
                  <TableHead className="font-semibold text-right">Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead: any) => (
                  <TableRow key={lead._id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{lead.first_name} {lead.last_name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <FileText size={12} />
                          {lead.company_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Mail size={12} />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Phone size={12} />
                          {lead.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(lead.status)} px-3 py-1`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{lead.source}</span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{leads.length > 0 ? skip + 1 : 0}</span> to{" "}
              <span className="font-medium">{Math.min(skip + 20, total)}</span> of{" "}
              <span className="font-medium">{total}</span> results
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={skip === 0}
                onClick={() => setSkip(Math.max(0, skip - 20))}
                className="bg-white dark:bg-slate-950"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={skip + 20 >= total}
                onClick={() => setSkip(skip + 20)}
                className="bg-white dark:bg-slate-950"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <LeadForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  )
}
