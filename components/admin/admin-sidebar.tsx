"use client"

import { Home, ImageIcon, MessageCircle, Calendar, Gift, Users, Settings, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Visão Geral", icon: Home },
  { id: "content", label: "Conteúdos", icon: ImageIcon },
  { id: "requests", label: "Pedidos Personalizados", icon: MessageCircle },
  { id: "calls", label: "Chamadas Agendadas", icon: Calendar },
  { id: "gifts", label: "Mimos Recebidos", icon: Gift },
  { id: "users", label: "Usuários", icon: Users },
  { id: "settings", label: "Configurações", icon: Settings },
]

export function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-400">Isabelle Lua</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  activeSection === item.id
                    ? "bg-rose-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
