"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, DollarSign, Heart, Package, Eye, Send, Filter } from "lucide-react"

export function ReceivedGifts() {
  const [selectedGift, setSelectedGift] = useState<any>(null)

  const gifts = [
    {
      id: 1,
      user: "Carlos Lima",
      email: "carlos@email.com",
      type: "PIX",
      value: "R$ 150,00",
      message: "Você é incrível! Obrigado por todo carinho ❤️",
      date: "2024-01-25",
      status: "agradecido",
    },
    {
      id: 2,
      user: "Bruno Alves",
      email: "bruno@email.com",
      type: "PIX",
      value: "R$ 75,00",
      message: "Para você comprar algo especial 💕",
      date: "2024-01-24",
      status: "pendente",
    },
    {
      id: 3,
      user: "Roberto Silva",
      email: "roberto@email.com",
      type: "Presente Físico",
      value: "R$ 200,00",
      message: "Lingerie vermelha que você disse que queria ❤️",
      date: "2024-01-24",
      status: "agradecido",
    },
    {
      id: 4,
      user: "João Silva",
      email: "joao@email.com",
      type: "PIX",
      value: "R$ 100,00",
      message: "Mimo especial para minha princesa 👑",
      date: "2024-01-23",
      status: "pendente",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PIX":
        return "bg-green-600"
      case "Presente Físico":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-600"
      case "agradecido":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const totalValue = gifts.reduce((sum, gift) => {
    const value = Number.parseFloat(gift.value.replace("R$ ", "").replace(",", "."))
    return sum + value
  }, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mimos Recebidos</h1>
        <p className="text-gray-400">Gerencie presentes e agradecimentos de clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Mimos</p>
                <p className="text-2xl font-bold text-white">{gifts.length}</p>
              </div>
              <Gift className="h-8 w-8 text-pink-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Valor Total</p>
                <p className="text-2xl font-bold text-green-400">R$ {totalValue.toFixed(2).replace(".", ",")}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">PIX Recebidos</p>
                <p className="text-2xl font-bold text-green-400">{gifts.filter((g) => g.type === "PIX").length}</p>
              </div>
              <Heart className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Presentes Físicos</p>
                <p className="text-2xl font-bold text-purple-400">
                  {gifts.filter((g) => g.type === "Presente Físico").length}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Filtros:</span>
            </div>
            <Select>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="presente">Presente Físico</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="agradecido">Agradecidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Gifts Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Mimos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Cliente</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Valor</TableHead>
                <TableHead className="text-gray-400">Mensagem</TableHead>
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gifts.map((gift) => (
                <TableRow key={gift.id} className="border-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{gift.user}</p>
                      <p className="text-gray-400 text-sm">{gift.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getTypeColor(gift.type)} text-white`}>{gift.type}</Badge>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{gift.value}</TableCell>
                  <TableCell className="text-gray-300 max-w-64">
                    <p className="truncate">{gift.message}</p>
                  </TableCell>
                  <TableCell className="text-gray-300">{gift.date}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(gift.status)} text-white`}>
                      {gift.status === "pendente" ? "Pendente" : "Agradecido"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => setSelectedGift(gift)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Detalhes do Mimo</DialogTitle>
                          </DialogHeader>
                          {selectedGift && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Cliente</label>
                                  <p className="text-white">{selectedGift.user}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">E-mail</label>
                                  <p className="text-white">{selectedGift.email}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Tipo</label>
                                  <Badge className={`${getTypeColor(selectedGift.type)} text-white mt-1`}>
                                    {selectedGift.type}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Valor</label>
                                  <p className="text-green-400 font-medium">{selectedGift.value}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-gray-400 text-sm">Mensagem do Cliente</label>
                                <div className="p-3 bg-gray-800 rounded-lg mt-1">
                                  <p className="text-white">{selectedGift.message}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Data</label>
                                  <p className="text-white">{selectedGift.date}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Status</label>
                                  <Badge className={`${getStatusColor(selectedGift.status)} text-white mt-1`}>
                                    {selectedGift.status === "pendente" ? "Pendente" : "Agradecido"}
                                  </Badge>
                                </div>
                              </div>

                              {selectedGift.status === "pendente" && (
                                <div className="pt-4 border-t border-gray-800">
                                  <h4 className="text-white font-medium mb-3">Enviar Agradecimento</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-gray-400 text-sm mb-2 block">
                                        Mensagem de Agradecimento
                                      </label>
                                      <Textarea
                                        placeholder="Obrigada pelo carinho, amor! Você é incrível ❤️"
                                        className="bg-gray-800 border-gray-700 text-white"
                                        rows={3}
                                      />
                                    </div>
                                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                                      <Send className="h-4 w-4 mr-2" />
                                      Enviar Agradecimento
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
