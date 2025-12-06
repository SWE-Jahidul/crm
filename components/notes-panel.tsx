"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface Note {
  _id: string
  content: string
  created_at: string
  created_by: string
}

interface NotesPanelProps {
  notes?: Note[]
  onAddNote?: (content: string) => void
}

export function NotesPanel({ notes = [], onAddNote }: NotesPanelProps) {
  const [newNote, setNewNote] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const defaultNotes: Note[] = [
    {
      _id: "1",
      content: "Customer very interested in enterprise solution. Budget approved for Q1. Follow up next week.",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: "Demo User",
    },
    {
      _id: "2",
      content: "Discussed implementation timeline. They prefer a phased approach over 6 months.",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: "Demo User",
    },
  ]

  const displayNotes = notes.length > 0 ? notes : defaultNotes

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote?.(newNote)
      setNewNote("")
      setIsAdding(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>Internal notes and observations about this contact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding ? (
          <div className="space-y-3">
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-24"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddNote} size="sm">
                Save Note
              </Button>
              <Button
                onClick={() => {
                  setIsAdding(false)
                  setNewNote("")
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full gap-2 bg-transparent">
            <Plus size={16} />
            Add Note
          </Button>
        )}

        {displayNotes.length > 0 && (
          <div className="space-y-3 mt-4 pt-4 border-t">
            {displayNotes.map((note) => (
              <div key={note._id} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm">{note.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    {note.created_by} • {formatDate(note.created_at)}
                  </p>
                  <button className="p-1 hover:bg-destructive/10 rounded">
                    <Trash2 size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
