"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, CheckCircle2, Settings, LogOut, Menu, X, LayoutDashboard } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/pipeline", label: "Pipeline", icon: TrendingUp },
  { href: "/tasks", label: "Tasks", icon: CheckCircle2 },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout, organization } = useAuthContext()
  const [open, setOpen] = useState(true)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg shadow-lg border border-slate-700"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative left-0 top-0 z-40 w-72 h-screen bg-slate-950 border-r border-slate-800 flex flex-col transition-transform duration-300 shadow-2xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <div className="font-bold text-lg text-white tracking-tight">CRM</div>
              <div className="text-xs text-slate-400 font-medium truncate max-w-[140px]">{organization?.name}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link key={href} href={href}>
                <button
                  onClick={() => setOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${isActive
                      ? "text-white bg-indigo-600/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                >
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 rounded-r-full" />
                  )}
                  <Icon size={20} className={`transition-colors ${isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-white"}`} />
                  {label}
                </button>
              </Link>
            )
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
          <div className="mb-4 px-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-500 truncate">admin@crm.com</p>
              </div>
            </div>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-950/20 gap-3"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
