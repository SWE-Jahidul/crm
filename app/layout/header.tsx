"use client"

import { useAuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"

export function Header() {
  const { user } = useAuthContext()

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
          <div className="text-sm">
            <div className="font-medium">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="text-xs text-muted-foreground">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
