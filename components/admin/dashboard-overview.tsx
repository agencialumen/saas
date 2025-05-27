"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, Package, Calendar, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  const stats = [
    {
      title: "Usuários Ativos",
      value: "1,247",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Faturamento Total",
      value: "R$ 45.890",
      change: "+23.1%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Packs Vendidos",
      value: "89",
      change: "+8.3%",
      icon: Package,
      color: "text-purple-400",
    },
    {
      title: "Chamadas Agendadas",
      value: "23",
      change: "+15.7%",
      icon: Calendar,
      color: "text-rose-400",
    },
  ]

  const recentRequests = [
    { id: 1, user: "João Silva", type: "Vídeo Personalizado", status: "pendente", date: "2024-01-25" },
    { id: 2, user: "Maria Santos", type: "Foto Sensual", status: "produzindo", date: "2024-01-24" },
    { id: 3, user: "Pedro Costa", type: "Áudio Personalizado", status: "entregue", date: "2024-01-24" },
    { id: 4, user: "Ana Paula", type: "Vídeo Premium", status: "pendente", date: "2024-01-23" },
  ]

  const recentGifts = [
    { id: 1, user: "Carlos Lima", type: "PIX", value: "R$ 150,00", date: "2024-01-25" },
    { id: 2, user: "Bruno Alves", type: "PIX", value: "R$ 75,00", date: "2024-01-24" },
    { id: 3, user: "Roberto Silva", type: "Presente Físico", value: "R$ 200,00", date: "2024-01-24" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
        <p className="text-gray-400">Painel administrativo da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">{stat.change}</span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Últimos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{request.user}</p>
                    <p className="text-gray-400 text-sm">{request.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={request.status === "entregue" ? "default" : "secondary"}
                      className={
                        request.status === "entregue"
                          ? "bg-green-600 text-white"
                          : request.status === "produzindo"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                      }
                    >
                      {request.status}
                    </Badge>
                    <p className="text-gray-400 text-xs mt-1">{request.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Gifts */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Últimos Mimos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGifts.map((gift) => (
                <div key={gift.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{gift.user}</p>
                    <p className="text-gray-400 text-sm">{gift.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium">{gift.value}</p>
                    <p className="text-gray-400 text-xs">{gift.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-rose-600/20 border border-rose-600/30 rounded-lg">
              <h3 className="text-rose-400 font-medium">Pedidos Pendentes</h3>
              <p className="text-2xl font-bold text-white">8</p>
            </div>
            <div className="p-4 bg-purple-600/20 border border-purple-600/30 rounded-lg">
              <h3 className="text-purple-400 font-medium">Chamadas Hoje</h3>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <h3 className="text-green-400 font-medium">Packs Vendidos (Mês)</h3>
              <p className="text-2xl font-bold text-white">47</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
