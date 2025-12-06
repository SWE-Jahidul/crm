"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeadFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function LeadForm({ open, onOpenChange, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    position: "",
    source: "Website",
    status: "New",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create lead')
      }

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name: "",
        position: "",
        source: "Website",
        status: "New",
      })

      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Failed to create lead')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>Add a new lead to your pipeline</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+1 555-0000"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Acme Inc"
                value={formData.company_name}
                onChange={(e) => handleChange("company_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                placeholder="Manager"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Lead Source</Label>
            <Select value={formData.source} onValueChange={(value) => handleChange("source", value)}>
              <SelectTrigger id="source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Ads">Ads</SelectItem>
                <SelectItem value="Cold Call">Cold Call</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Creating...' : 'Create Lead'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
