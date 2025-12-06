"use client"

import type React from "react"

import { useState } from "react"
import { useFetch } from "@/lib/hooks"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { TaskForm } from "@/components/task-form"

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState("open")
  const [formOpen, setFormOpen] = useState(false)
  const { data: tasksData } = useFetch(`/api/tasks?status=${statusFilter}&limit=50`)

  const tasks = tasksData?.data || []

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "bg-red-500/10 text-red-700 dark:text-red-400",
      medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      low: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    }
    return colors[priority] || ""
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      call: "📞",
      email: "📧",
      meeting: "📅",
      follow_up: "↩️",
      other: "📋",
    }
    return icons[category] || "📋"
  }

  const getDaysUntilDue = (dueDate: string) => {
    const date = new Date(dueDate)
    const today = new Date()
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const isOverdue = (dueDate: string) => getDaysUntilDue(dueDate) < 0
  const isDueToday = (dueDate: string) => getDaysUntilDue(dueDate) === 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Track your follow-ups and activities</p>
        </div>
        <Button className="gap-2" onClick={() => setFormOpen(true)}>
          <Plus size={20} />
          New Task
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2">
        {["open", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              statusFilter === status ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {tasks.map((task: any) => {
          const daysUntil = getDaysUntilDue(task.due_date)
          const overdue = isOverdue(task.due_date)
          const dueToday = isDueToday(task.due_date)

          return (
            <Card
              key={task._id}
              className={`hover:shadow-md transition-shadow ${
                overdue ? "border-destructive/50" : dueToday ? "border-yellow-500/50" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <input type="checkbox" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCategoryIcon(task.category)}</span>
                          <h3 className="font-semibold">{task.title}</h3>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {overdue ? (
                          <>
                            <AlertCircle size={16} className="text-destructive" />
                            <span className="text-destructive">Overdue by {Math.abs(daysUntil)} days</span>
                          </>
                        ) : dueToday ? (
                          <>
                            <Clock size={16} className="text-yellow-500" />
                            <span>Due today</span>
                          </>
                        ) : (
                          <>
                            <Clock size={16} />
                            <span>Due in {daysUntil} days</span>
                          </>
                        )}
                      </div>
                      <span>{new Date(task.due_date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Related to: {task.related_to_type}</span>
                    </div>
                  </div>

                  {statusFilter === "open" && (
                    <Button variant="ghost" size="sm" className="gap-2">
                      <CheckCircle2 size={18} />
                      Complete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {tasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No tasks</h3>
            <p className="text-muted-foreground">All tasks are completed or no tasks in this view</p>
          </CardContent>
        </Card>
      )}

      <TaskForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  )
}
