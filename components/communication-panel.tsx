"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare } from "lucide-react"

export function CommunicationPanel({ customerId }: { customerId: string }) {
  const [emailContent, setEmailContent] = useState("")
  const [callNotes, setCallNotes] = useState("")
  const [outcome, setOutcome] = useState("completed")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication</CardTitle>
        <CardDescription>Send emails, log calls, or send messages</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="gap-2">
              <Mail size={16} />
              Email
            </TabsTrigger>
            <TabsTrigger value="call" className="gap-2">
              <Phone size={16} />
              Call
            </TabsTrigger>
            <TabsTrigger value="sms" className="gap-2">
              <MessageSquare size={16} />
              SMS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-3 mt-4">
            <div>
              <label className="text-sm font-medium">To</label>
              <Input placeholder="customer@example.com" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Email subject" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea
                placeholder="Type your message..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button className="w-full">Send Email</Button>
          </TabsContent>

          <TabsContent value="call" className="space-y-3 mt-4">
            <div>
              <label className="text-sm font-medium">Duration (minutes)</label>
              <Input type="number" placeholder="0" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Outcome</label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
              >
                <option value="completed">Completed</option>
                <option value="voicemail">Left Voicemail</option>
                <option value="not_reached">Not Reached</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Call details and follow-up items..."
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button className="w-full">Log Call</Button>
          </TabsContent>

          <TabsContent value="sms" className="space-y-3 mt-4">
            <div>
              <label className="text-sm font-medium">To</label>
              <Input placeholder="+1 555-0000" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Type your SMS message (160 characters max)..." className="mt-1" maxLength={160} />
            </div>
            <Button className="w-full">Send SMS</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
