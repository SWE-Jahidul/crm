"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DealFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deal?: any
  initialStage?: string
  onSuccess?: () => void
}

export function DealForm({ open, onOpenChange, deal, initialStage, onSuccess }: DealFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    customer_name: "",
    value: "",
    stage: initialStage || "new",
    probability: "25",
    expected_close_date: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (deal) {
      // Editing existing deal
      setFormData({
        name: deal.name || "",
        customer_name: deal.customer_name || "",
        value: deal.value?.toString() || "",
        stage: deal.stage || "new",
        probability: deal.probability?.toString() || "25",
        expected_close_date: deal.expected_close_date ? new Date(deal.expected_close_date).toISOString().split('T')[0] : "",
      })
    } else if (initialStage) {
      // Adding new deal from a specific column
      setFormData({
        name: "",
        customer_name: "",
        value: "",
        stage: initialStage,
        probability: "25",
        expected_close_date: "",
      })
    } else {
      // Adding new deal from main button
      setFormData({
        name: "",
        customer_name: "",
        value: "",
        stage: "new",
        probability: "25",
        expected_close_date: "",
      })
    }
  }, [deal, initialStage, open])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = deal ? `/api/deals/${deal._id}` : '/api/deals'
      const method = deal ? 'PATCH' : 'POST'

      // Convert string values to numbers
      const payload = {
        ...formData,
        value: parseFloat(formData.value) || 0,
        probability: parseInt(formData.probability) || 0,
      }

      console.log('Submitting deal data:', payload)

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      console.log('Server response:', data)

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${deal ? 'update' : 'create'} deal`)
      }

      onSuccess?.()
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error submitting deal:', error)
      alert(`Failed to ${deal ? 'update' : 'create'} deal: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{deal ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
          <DialogDescription>
            {deal ? 'Update deal information' : 'Add a new deal to your pipeline'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deal_name">Deal Name</Label>
            <Input
              id="deal_name"
              placeholder="Enterprise Package - Acme Corp"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_name">Customer Name</Label>
            <Input
              id="customer_name"
              placeholder="Acme Corporation"
              value={formData.customer_name}
              onChange={(e) => handleChange("customer_name", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value ($)</Label>
              <Input
                id="value"
                type="number"
                placeholder="50000"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => handleChange("probability", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select value={formData.stage} onValueChange={(value) => handleChange("stage", value)}>
              <SelectTrigger id="stage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closing">Closing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="close_date">Expected Close Date</Label>
            <Input
              id="close_date"
              type="date"
              value={formData.expected_close_date}
              onChange={(e) => handleChange("expected_close_date", e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
