"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, Shield } from "lucide-react"
import { useState } from "react"

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general")
  const [newMember, setNewMember] = useState({ email: "", role: "sales_executive" })

  const organization = {
    name: "Demo Company",
    email: "company@example.com",
    phone: "555-0001",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
  }

  const user = {
    first_name: "Demo",
    last_name: "User",
    email: "demo@crm.com",
    role: "admin",
  }

  const teamMembers = [
    { id: 1, name: "Demo User", email: "demo@crm.com", role: "admin", status: "active" },
    { id: 2, name: "Sales Manager", email: "manager@crm.com", role: "manager", status: "active" },
    { id: 3, name: "Sales Rep", email: "sales@crm.com", role: "sales_executive", status: "active" },
  ]

  const pipelineStages = ["New", "Contacted", "Qualified", "Negotiation", "Closing", "Won", "Lost"]

  const integrations = [
    { name: "Gmail", status: "connected", last_sync: "2 hours ago" },
    { name: "Outlook", status: "disconnected", last_sync: null },
    { name: "Slack", status: "disconnected", last_sync: null },
    { name: "Zapier", status: "disconnected", last_sync: null },
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        <TabsTrigger value="roles">Roles</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>

      {/* General Settings */}
      <TabsContent value="general" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Manage your organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" value={organization.name} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Email</Label>
                <Input id="org-email" value={organization.email} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-phone">Phone</Label>
                <Input id="org-phone" value={organization.phone} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-timezone">Timezone</Label>
                <Input id="org-timezone" value={organization.timezone} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-currency">Currency</Label>
                <Input id="org-currency" value={organization.currency} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-language">Language</Label>
                <Input id="org-language" value={organization.language} readOnly className="bg-muted" />
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-first">First Name</Label>
                <Input id="user-first" value={user.first_name} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-last">Last Name</Label>
                <Input id="user-last" value={user.last_name} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" value={user.email} readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>
                <Input id="user-role" value={user.role} readOnly className="bg-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* User Management */}
      <TabsContent value="users" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage users and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded">
                      {member.role.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">{member.status}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border-t pt-6">
              <h4 className="font-semibold mb-4">Add Team Member</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="member-email">Email</Label>
                    <Input
                      id="member-email"
                      type="email"
                      placeholder="team@company.com"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-role">Role</Label>
                    <Select value={newMember.role} onValueChange={(role) => setNewMember({ ...newMember, role })}>
                      <SelectTrigger id="member-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="sales_executive">Sales Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full gap-2">
                      <Plus size={16} />
                      Invite
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Pipeline Configuration */}
      <TabsContent value="pipeline" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Stages</CardTitle>
            <CardDescription>Configure your sales pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineStages.map((stage, idx) => (
                <div key={stage} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-medium">{stage}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 gap-2 w-full md:w-auto">
              <Plus size={16} />
              Add Stage
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Role Management */}
      <TabsContent value="roles" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Manage roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Admin", description: "Full access to all features" },
                { name: "Manager", description: "Can manage team and view reports" },
                { name: "Sales Executive", description: "Can manage own leads and deals" },
              ].map((role) => (
                <div key={role.name} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={18} className="text-primary" />
                      <div>
                        <p className="font-medium">{role.name}</p>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Integrations */}
      <TabsContent value="integrations" className="space-y-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Integrations</CardTitle>
            <CardDescription>Manage third-party integrations and data sync</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div key={integration.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{integration.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        integration.status === "connected"
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {integration.status === "connected" ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                  {integration.last_sync && (
                    <p className="text-xs text-muted-foreground mb-3">Last sync: {integration.last_sync}</p>
                  )}
                  <Button
                    size="sm"
                    variant={integration.status === "connected" ? "outline" : "default"}
                    className="w-full"
                  >
                    {integration.status === "connected" ? "Manage" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Sync</CardTitle>
            <CardDescription>Manage data storage and synchronization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Auto-sync Emails</p>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground">Automatically sync emails from connected accounts</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Real-time Updates</p>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground">Get real-time notifications for important updates</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Data Backup</p>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <p className="text-xs text-muted-foreground">Automatically backup data daily</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
