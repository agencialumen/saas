"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { ContentManagement } from "@/components/admin/content-management"
import { CustomRequests } from "@/components/admin/custom-requests"
import { ScheduledCalls } from "@/components/admin/scheduled-calls"
import { ReceivedGifts } from "@/components/admin/received-gifts"
import { UserManagement } from "@/components/admin/user-management"
import { PlatformSettings } from "@/components/admin/platform-settings"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // 1. Verificar se há usuário logado
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.error("Erro ao verificar usuário:", userError)
          router.push("/auth")
          return
        }

        // 2. Se não há usuário logado, redirecionar para /auth
        if (!user) {
          console.log("Usuário não autenticado, redirecionando para /auth")
          router.push("/auth")
          return
        }

        setUser(user)
        console.log("Usuário autenticado:", user)

        // 3. Verificar se o usuário é admin na tabela admins
        const { data: adminData, error: adminError } = await supabase
          .from("admins")
          .select("*")
          .eq("id", user.id)
          .single()

        if (adminError) {
          console.error("Erro ao verificar admin:", adminError)
          // Se erro for "PGRST116" significa que não encontrou o registro (não é admin)
          if (adminError.code === "PGRST116") {
            console.log("Usuário não é admin, redirecionando para /")
            router.push("/")
            return
          }
        }

        // 4. Se não encontrou o usuário na tabela admins, redirecionar para /
        if (!adminData) {
          console.log("Usuário não é admin, redirecionando para /")
          router.push("/")
          return
        }

        // 5. Se chegou até aqui, é admin válido
        console.log("Usuário é admin:", adminData)
        setIsAdmin(true)
      } catch (error) {
        console.error("Erro na verificação de admin:", error)
        router.push("/auth")
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()

    // Listener para mudanças no estado de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push("/auth")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Mostrar loading enquanto verifica autenticação e permissões
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-white">Verificando permissões...</p>
        </div>
      </div>
    )
  }

  // Se não é admin, não renderizar nada (redirecionamento já foi feito)
  if (!isAdmin) {
    return null
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Erro ao fazer logout:", error)
      } else {
        console.log("Logout realizado com sucesso")
        router.push("/auth")
      }
    } catch (error) {
      console.error("Erro no logout:", error)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "content":
        return <ContentManagement />
      case "requests":
        return <CustomRequests />
      case "calls":
        return <ScheduledCalls />
      case "gifts":
        return <ReceivedGifts />
      case "users":
        return <UserManagement />
      case "settings":
        return <PlatformSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SidebarProvider>
        <div className="flex">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          <div className="flex-1 flex flex-col">
            <AdminHeader onLogout={handleLogout} />
            <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
