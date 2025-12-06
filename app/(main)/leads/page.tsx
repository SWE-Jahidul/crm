"use client"

import { useState, useEffect } from "react"
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
import { useFetch } from "@/lib/hooks"

export default function LeadsPage() {
  const [skip, setSkip] = useState(0)
  const [statusFilter, setStatusFilter] = useState("")
  const [formOpen, setFormOpen] = useState(false)

  // Build query string
  const queryString = `/leads?skip=${skip}&limit=20${statusFilter ? `&status=${statusFilter}` : ''}`

  // Fetch leads from API
  const { data: response, loading, error, setData } = useFetch<any>(queryString)

  const leads = response?.data || []
  const total = response?.total || 0

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete lead')
      }

      // Refresh the list
      window.location.reload()
    } catch (error) {
      alert('Failed to delete lead')
    }
  }

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
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDelete(lead._id)}
                          >
                            Delete
                          </DropdownMenuItem>
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
