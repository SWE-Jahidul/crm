"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, Shield, Mail, Bell, HardDrive, Check } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

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
    { name: "Gmail", status: "connected", last_sync: "2 hours ago", icon: "M" },
    { name: "Outlook", status: "disconnected", last_sync: null, icon: "O" },
    { name: "Slack", status: "disconnected", last_sync: null, icon: '#' },
    { name: "Zapier", status: "disconnected", last_sync: null, icon: 'Z' },
  ]

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-xl h-auto">
        {["general", "users", "pipeline", "roles", "integrations"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 capitalize py-3 rounded-lg font-medium transition-all"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* General Settings */}
      <TabsContent value="general" className="space-y-6 mt-8">
        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>Manage your organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" value={organization.name} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Email</Label>
                <Input id="org-email" value={organization.email} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-phone">Phone</Label>
                <Input id="org-phone" value={organization.phone} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-timezone">Timezone</Label>
                <Input id="org-timezone" value={organization.timezone} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-currency">Currency</Label>
                <Input id="org-currency" value={organization.currency} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-language">Language</Label>
                <Input id="org-language" value={organization.language} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="user-first">First Name</Label>
                <Input id="user-first" value={user.first_name} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-last">Last Name</Label>
                <Input id="user-last" value={user.last_name} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" value={user.email} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>
                <Input id="user-role" value={user.role} readOnly className="bg-slate-50 dark:bg-slate-900/50" />
              </div>
            </div>
            <div className="space-y-2 pt-4 flex gap-4">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* User Management */}
      <TabsContent value="users" className="space-y-6 mt-8">
        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage users and their roles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{member.name}</p>
                      <p className="text-sm text-slate-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 capitalize">
                      {member.role.replace(/_/g, " ")}
                    </Badge>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Active</Badge>
                    <div className="flex gap-1 ml-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Add Team Member</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="member-email">Email Address</Label>
                  <Input
                    id="member-email"
                    type="email"
                    placeholder="teammate@company.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    className="bg-white dark:bg-slate-950"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-role">Assign Role</Label>
                  <Select value={newMember.role} onValueChange={(role) => setNewMember({ ...newMember, role })}>
                    <SelectTrigger id="member-role" className="bg-white dark:bg-slate-950">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="sales_executive">Sales Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus size={16} />
                  Send Invitation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Pipeline Configuration */}
      <TabsContent value="pipeline" className="space-y-6 mt-8">
        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Pipeline Stages</CardTitle>
            <CardDescription>Configure your sales pipeline stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineStages.map((stage, idx) => (
                <div key={stage} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                      {idx + 1}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{stage}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600">
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-6 gap-2 w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus size={16} />
              Add New Stage
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Role Management */}
      <TabsContent value="roles" className="space-y-6 mt-8">
        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>Manage roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Admin", description: "Full access to all features and settings", count: 1 },
                { name: "Manager", description: "Can manage team, view reports, and edit pipelines", count: 2 },
                { name: "Sales Executive", description: "Can manage own leads, deals, and tasks", count: 5 },
              ].map((role) => (
                <div key={role.name} className="p-5 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                        <Shield size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">{role.name}</p>
                          <Badge variant="secondary" className="text-[10px] items-center h-5">{role.count} Users</Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">{role.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
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
      <TabsContent value="integrations" className="space-y-6 mt-8">
        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <CardTitle>Connected Integrations</CardTitle>
            <CardDescription>Manage third-party integrations and data sync</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((integration) => (
                <div key={integration.name} className={`border rounded-xl p-5 transition-all ${integration.status === "connected" ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center font-bold text-lg text-slate-700 dark:text-slate-200">
                        {integration.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">{integration.name}</h4>
                        <p className="text-xs text-slate-500">Syncs contacts & emails</p>
                      </div>
                    </div>
                    <Badge variant={integration.status === "connected" ? "default" : "secondary"} className={integration.status === "connected" ? "bg-green-500 hover:bg-green-600" : ""}>
                      {integration.status === "connected" ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>

                  {integration.last_sync && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 px-1">
                      <Check size={12} className="text-green-500" />
                      Last synced: {integration.last_sync}
                    </div>
                  )}

                  <Button
                    size="sm"
                    variant={integration.status === "connected" ? "outline" : "default"}
                    className={`w-full ${integration.status !== "connected" ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white hover:bg-slate-50"}`}
                  >
                    {integration.status === "connected" ? "Manage Configuration" : "Connect Integration"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <HardDrive size={20} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <CardTitle>Data & Synchronization</CardTitle>
                <CardDescription>Manage how your data is stored and synced</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Auto-sync Emails</p>
                  <p className="text-xs text-slate-500">Automatically sync emails from connected accounts</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-full text-amber-600 dark:text-amber-400">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">Real-time Notifications</p>
                  <p className="text-xs text-slate-500">Get updates as they happen</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
