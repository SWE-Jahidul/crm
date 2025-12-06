"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authStorage } from "@/lib/auth-client"

interface AuthContextType {
  user: any
  organization: any
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const [organization, setOrganization] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const demoUser = {
      _id: "user_1",
      organization_id: "org_1",
      first_name: "Demo",
      last_name: "User",
      email: "demo@crm.com",
      phone: "555-0000",
      role: "admin",
      status: "active",
      created_at: new Date(),
      updated_at: new Date(),
    }

    const demoOrganization = {
      _id: "org_1",
      name: "Demo Company",
      email: "company@example.com",
      phone: "555-0001",
      timezone: "America/New_York",
      currency: "USD",
      language: "en",
      created_at: new Date(),
    }

    // Set demo user as if logged in
    localStorage.setItem("auth_token", "demo_token_auto_login")
    localStorage.setItem("user", JSON.stringify(demoUser))
    localStorage.setItem("organization", JSON.stringify(demoOrganization))

    setLoading(false)
  }, [])

  const checkAuth = async () => {
    const token = authStorage.getToken()
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setOrganization(data.organization)
      } else {
        authStorage.clearToken()
      }
    } catch {
      authStorage.clearToken()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error("Invalid credentials")
    }

    const data = await response.json()
    authStorage.setToken(data.access_token)
    setUser(data.user)
    setOrganization(data.organization)
    router.push("/dashboard")
  }

  const logout = () => {
    authStorage.clearToken()
    setUser(null)
    setOrganization(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, organization, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
