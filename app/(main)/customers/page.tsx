"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Mail, Phone, TrendingUp, Building2, MoreHorizontal } from "lucide-react"
import { useFetch } from "@/lib/hooks"
import { CustomerForm } from "@/components/customer-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CustomersPage() {
  const [skip, setSkip] = useState(0)
  const [formOpen, setFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)

  // Fetch customers from API
  const queryString = `/customers?skip=${skip}&limit=20`
  const { data: response, loading, setData } = useFetch<any>(queryString)

  const customers = response?.data || []
  const total = response?.total || 0

  const handleDelete = async (customerId: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return

    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete customer')
      }

      // Refresh the list
      window.location.reload()
    } catch (error) {
      alert('Failed to delete customer')
    }
  }

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer)
    setFormOpen(true)
  }

  const handleFormSuccess = () => {
    window.location.reload()
  }

  const handleFormClose = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setEditingCustomer(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

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
        <Button onClick={() => setFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
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
          <Card key={customer._id} className="group hover:-translate-y-1 transition-all duration-300 border-none shadow-md hover:shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 text-left overflow-hidden relative">
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-bold text-slate-700 dark:text-slate-300">
                  {customer.first_name[0]}{customer.last_name[0]}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${getHealthColor(customer.health_score)} border font-medium`}>
                    {customer.health_score} Health
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(customer)}>Edit Customer</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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

      <CustomerForm
        open={formOpen}
        onOpenChange={handleFormClose}
        customer={editingCustomer}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
