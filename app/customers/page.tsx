"use client"

import { useState } from "react"
import { useFetch } from "@/lib/hooks"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Mail, Phone, TrendingUp } from "lucide-react"

export default function CustomersPage() {
  const [skip, setSkip] = useState(0)
  const { data: customersData } = useFetch(`/api/customers?skip=${skip}&limit=20`)

  const customers = customersData?.data || []
  const total = customersData?.total || 0

  const getHealthColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-700 dark:text-green-400"
    if (score >= 60) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    return "bg-red-500/10 text-red-700 dark:text-red-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} />
          New Customer
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search customers..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter size={18} />
          Filters
        </Button>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer: any) => (
          <Card key={customer._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">
                    <Link href={`/customers/${customer._id}`} className="hover:underline">
                      {customer.first_name} {customer.last_name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{customer.company_name}</p>
                </div>
                <Badge className={getHealthColor(customer.health_score)}>{customer.health_score}</Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={14} />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-accent" />
                  <span className="font-medium">${customer.lifetime_value.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {customer.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
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
