"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Mail, Phone, TrendingUp, Building2, ExternalLink } from "lucide-react"

// Mock Customers Data
const mockCustomers = [
  { _id: "1", first_name: "Alice", last_name: "Johnson", company_name: "Tech Startup Inc", email: "alice@techstartup.com", phone: "+1 555-0101", health_score: 95, lifetime_value: 12500, tags: ["Enterprise", "High Value"] },
  { _id: "2", first_name: "Bob", last_name: "Smith", company_name: "Global Corp", email: "bob@globalcorp.com", phone: "+1 555-0102", health_score: 88, lifetime_value: 50000, tags: ["VIP", "Reference"] },
  { _id: "3", first_name: "Carol", last_name: "White", company_name: "Design Studio", email: "carol@design.com", phone: "+1 555-0103", health_score: 75, lifetime_value: 8000, tags: ["Creative", "SMB"] },
  { _id: "4", first_name: "David", last_name: "Brown", company_name: "Law Firm", email: "david@law.com", phone: "+1 555-0104", health_score: 60, lifetime_value: 15000, tags: ["Professional"] },
  { _id: "5", first_name: "Eva", last_name: "Green", company_name: "Consulting Group", email: "eva@consult.com", phone: "+1 555-0105", health_score: 92, lifetime_value: 25000, tags: ["High Value"] },
  { _id: "6", first_name: "Frank", last_name: "Miller", company_name: "Retail Chain", email: "frank@retail.com", phone: "+1 555-0106", health_score: 55, lifetime_value: 100000, tags: ["Enterprise", "Risk"] },
  { _id: "7", first_name: "Grace", last_name: "Lee", company_name: "Software House", email: "grace@soft.com", phone: "+1 555-0107", health_score: 85, lifetime_value: 30000, tags: ["Tech"] },
  { _id: "8", first_name: "Henry", last_name: "Wilson", company_name: "Manufacture Co", email: "henry@manufacture.com", phone: "+1 555-0108", health_score: 70, lifetime_value: 45000, tags: ["Industrial"] },
  { _id: "9", first_name: "Isabel", last_name: "Taylor", company_name: "Marketing Agency", email: "isabel@market.com", phone: "+1 555-0109", health_score: 80, lifetime_value: 18000, tags: ["Service"] },
  { _id: "10", first_name: "Jack", last_name: "Anderson", company_name: "Logistics Co", email: "jack@logistics.com", phone: "+1 555-0110", health_score: 90, lifetime_value: 60000, tags: ["Transport"] }
]

export default function CustomersPage() {
  const [skip, setSkip] = useState(0)

  // Paginate mock data
  const customers = mockCustomers.slice(skip, skip + 20)
  const total = mockCustomers.length

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200"
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200"
  }

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Customers
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your client relationships and growth
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
          <Plus size={20} className="mr-2" />
          New Customer
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search customers..."
            className="pl-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 shadow-sm"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
          <Filter size={18} />
          Filters
        </Button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {customers.map((customer: any) => (
          <Card key={customer._id} className="group hover:-translate-y-1 transition-all duration-300 border-none shadow-md hover:shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 text-left overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-700 dark:text-slate-300">
                  {customer.first_name[0]}{customer.last_name[0]}
                </div>
                <Badge variant="outline" className={`${getHealthColor(customer.health_score)} border font-medium`}>
                  {customer.health_score} Health
                </Badge>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={`/customers/${customer._id}`} className="hover:underline flex items-center gap-1">
                    {customer.first_name} {customer.last_name}
                  </Link>
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                  <Building2 size={14} />
                  {customer.company_name}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Mail size={14} className="text-slate-400" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Phone size={14} className="text-slate-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-slate-200">
                  <TrendingUp size={14} className="text-emerald-500" />
                  <span>${customer.lifetime_value.toLocaleString()} LTV</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {customer.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-sm text-muted-foreground">
          Showing {customers.length > 0 ? skip + 1 : 0} to {Math.min(skip + 20, total)} of {total} customers
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
    </div>
  )
}
