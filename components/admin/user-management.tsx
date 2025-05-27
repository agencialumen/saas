"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserCheck, UserX, Crown, Search, Eye, Edit, Trash2, Filter } from "lucide-react"

export function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@email.com",
      plan: "Premium",
      status: "ativo",
      joinDate: "2024-01-15",
      lastActive: "2024-01-25",
      totalSpent: "R$ 450,00",
    },
    {
      id: 2,
      name: "Carlos Lima",
      email: "carlos@email.com",
      plan: "Diamante",
      status: "ativo",
      joinDate: "2024-01-10",
      lastActive: "2024-01-25",
      totalSpent: "R$ 780,00",
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@email.com",
      plan: "Básico",
      status: "ativo",
      joinDate: "2024-01-20",
      lastActive: "2024-01-24",
      totalSpent: "R$ 120,00",
    },
    {
      id: 4,
      name: "Pedro Costa",
      email: "pedro@email.com",
      plan: "Premium",
      status: "cancelado",
      joinDate: "2024-01-05",
      lastActive: "2024-01-20",
      totalSpent: "R$ 200,00",
    },
    {
      id: 5,
      name: "Bruno Alves",
      email: "bruno@email.com",
      plan: "Básico",
      status: "ativo",
      joinDate: "2024-01-22",
      lastActive: "2024-01-25",
      totalSpent: "R$ 85,00",
    },
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Básico":
        return "bg-blue-600"
      case "Premium":
        return "bg-purple-600"
      case "Diamante":
        return "bg-rose-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-600"
      case "cancelado":
        return "bg-red-600"
      case "suspenso":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRevenue = users.reduce((sum, user) => {
    const spent = Number.parseFloat(user.totalSpent.replace("R$ ", "").replace(",", "."))
    return sum + spent
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Usuários</h1>
        <p className="text-gray-400">Controle de clientes e assinaturas da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Usuários</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-400">{users.filter((u) => u.status === "ativo").length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cancelados</p>
                <p className="text-2xl font-bold text-red-400">
                  {users.filter((u) => u.status === "cancelado").length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Receita Total</p>
                <p className="text-2xl font-bold text-green-400">R$ {totalRevenue.toFixed(2).replace(".", ",")}</p>
              </div>
              <Crown className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="basico">Básico</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="diamante">Diamante</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ativo">Ativos</SelectItem>
                  <SelectItem value="cancelado">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Nome</TableHead>
                <TableHead className="text-gray-400">E-mail</TableHead>
                <TableHead className="text-gray-400">Plano</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Gasto Total</TableHead>
                <TableHead className="text-gray-400">Último Acesso</TableHead>
                <TableHead className="text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getPlanColor(user.plan)} text-white`}>{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-white`}>
                      {user.status === "ativo" ? "Ativo" : "Cancelado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{user.totalSpent}</TableCell>
                  <TableCell className="text-gray-300">{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Perfil do Usuário</DialogTitle>
                          </DialogHeader>
                          {selectedUser && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Nome Completo</label>
                                  <p className="text-white">{selectedUser.name}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">E-mail</label>
                                  <p className="text-white">{selectedUser.email}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Plano Atual</label>
                                  <Badge className={`${getPlanColor(selectedUser.plan)} text-white mt-1`}>
                                    {selectedUser.plan}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Status</label>
                                  <Badge className={`${getStatusColor(selectedUser.status)} text-white mt-1`}>
                                    {selectedUser.status === "ativo" ? "Ativo" : "Cancelado"}
                                  </Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Data de Cadastro</label>
                                  <p className="text-white">{selectedUser.joinDate}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Último Acesso</label>
                                  <p className="text-white">{selectedUser.lastActive}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Total Gasto</label>
                                  <p className="text-green-400 font-medium">{selectedUser.totalSpent}</p>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-gray-800">
                                <h4 className="text-white font-medium mb-3">Ações do Usuário</h4>
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Alterar Plano</label>
                                    <Select>
                                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Novo plano" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-gray-800 border-gray-700">
                                        <SelectItem value="basico">Básico</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="diamante">Diamante</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Alterar Status</label>
                                    <Select>
                                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Novo status" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-gray-800 border-gray-700">
                                        <SelectItem value="ativo">Ativar</SelectItem>
                                        <SelectItem value="suspenso">Suspender</SelectItem>
                                        <SelectItem value="cancelado">Cancelar</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div className="flex space-x-2">
                                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                      Salvar Alterações
                                    </Button>
                                    <Button variant="destructive" className="flex-1">
                                      Deletar Usuário
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
