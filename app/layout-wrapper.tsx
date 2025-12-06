"use client"

import { AuthProvider } from "@/components/auth-provider"
import type { ReactNode } from "react"

export function LayoutWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
