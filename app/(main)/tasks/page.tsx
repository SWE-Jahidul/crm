"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Clock, AlertCircle, CheckCircle2, MoreHorizontal } from "lucide-react"
import { TaskForm } from "@/components/task-form"
import { useFetch } from "@/lib/hooks"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState("open")
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(null)

  // Build query string
  const queryString = `/tasks?status=${statusFilter}&limit=100`

  // Fetch tasks from API
  const { data: response, loading, setData } = useFetch<any>(queryString)

  const tasks = response?.data || []

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      // Refresh the list
      window.location.reload()
    } catch (error) {
      alert('Failed to delete task')
    }
  }

  const handleEdit = (task: any) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleComplete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      })

      if (!response.ok) {
        throw new Error('Failed to complete task')
      }

      // Refresh the list
      window.location.reload()
    } catch (error) {
      alert('Failed to complete task')
    }
  }

  const handleFormSuccess = () => {
    window.location.reload()
  }

  const handleFormClose = (open: boolean) => {
    setFormOpen(open)
    if (!open) {
      setEditingTask(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

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
    <div className="space-y-4 p-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Tasks
          </h1>
          <p className="text-base text-muted-foreground">
            Track your follow-ups and activities
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20">
          <Plus size={20} className="mr-2" />
          New Task
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search tasks..." className="pl-10 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-indigo-500 shadow-sm" />
        </div>
        <Button variant="outline" className="gap-2 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
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
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${statusFilter === status
              ? "bg-indigo-600 text-white shadow-indigo-500/30"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
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
              className={`group hover:-translate-y-0.5 transition-all duration-200 border-none shadow-md hover:shadow-lg ring-1 ${overdue
                ? "ring-red-200 dark:ring-red-800 bg-red-50/50 dark:bg-red-900/10"
                : dueToday
                  ? "ring-yellow-200 dark:ring-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10"
                  : "ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900"
                }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{getCategoryIcon(task.category)}</span>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{task.title}</h3>
                          <Badge variant="outline" className={`${getPriorityColor(task.priority)} border font-medium`}>
                            {task.priority}
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 ml-10">{task.description}</p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(task)}>Edit Task</DropdownMenuItem>
                          {statusFilter === "open" && (
                            <DropdownMenuItem onClick={() => handleComplete(task._id)}>
                              Mark as Complete
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 ml-10 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        {overdue ? (
                          <>
                            <AlertCircle size={16} className="text-red-600 dark:text-red-400" />
                            <span className="text-red-600 dark:text-red-400 font-medium">Overdue by {Math.abs(daysUntil)} days</span>
                          </>
                        ) : dueToday ? (
                          <>
                            <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
                            <span className="text-yellow-600 dark:text-yellow-400 font-medium">Due today</span>
                          </>
                        ) : (
                          <>
                            <Clock size={16} />
                            <span>Due in {daysUntil} days</span>
                          </>
                        )}
                      </div>
                      <span>•</span>
                      <span>{new Date(task.due_date).toLocaleDateString()}</span>
                      {task.related_to_type && task.related_to_type !== 'general' && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{task.related_to_type}</span>
                        </>
                      )}
                    </div>
                  </div>
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

      <TaskForm
        open={formOpen}
        onOpenChange={handleFormClose}
        task={editingTask}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
