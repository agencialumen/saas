"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Upload, Check, Clock, Filter } from "lucide-react"

export function CustomRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isResponseOpen, setIsResponseOpen] = useState(false)

  const requests = [
    {
      id: 1,
      user: "João Silva",
      email: "joao@email.com",
      type: "Vídeo Personalizado",
      description: "Vídeo de 5 minutos usando lingerie vermelha, falando meu nome",
      status: "pendente",
      date: "2024-01-25",
      value: "R$ 150,00",
    },
    {
      id: 2,
      user: "Maria Santos",
      email: "maria@email.com",
      type: "Foto Sensual",
      description: "Set de 10 fotos sensuais com tema praia",
      status: "produzindo",
      date: "2024-01-24",
      value: "R$ 80,00",
    },
    {
      id: 3,
      user: "Pedro Costa",
      email: "pedro@email.com",
      type: "Áudio Personalizado",
      description: "Áudio de 3 minutos sussurrando mensagem carinhosa",
      status: "entregue",
      date: "2024-01-24",
      value: "R$ 60,00",
    },
    {
      id: 4,
      user: "Ana Paula",
      email: "ana@email.com",
      type: "Vídeo Premium",
      description: "Vídeo exclusivo de 10 minutos com tema fantasia",
      status: "pendente",
      date: "2024-01-23",
      value: "R$ 200,00",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-600"
      case "produzindo":
        return "bg-blue-600"
      case "entregue":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "produzindo":
        return "Produzindo"
      case "entregue":
        return "Entregue"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Pedidos Personalizados</h1>
        <p className="text-gray-400">Gerencie solicitações de conteúdo personalizado</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {requests.filter((r) => r.status === "pendente").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Produzindo</p>
                <p className="text-2xl font-bold text-blue-400">
                  {requests.filter((r) => r.status === "produzindo").length}
                </p>
              </div>
              <Upload className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Entregues</p>
                <p className="text-2xl font-bold text-green-400">
                  {requests.filter((r) => r.status === "entregue").length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Valor Total</p>
                <p className="text-2xl font-bold text-green-400">R$ 490,00</p>
              </div>
              <div className="text-green-400 text-sm">Este mês</div>
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="produzindo">Produzindo</SelectItem>
                <SelectItem value="entregue">Entregues</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="foto">Foto</SelectItem>
                <SelectItem value="audio">Áudio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Cliente</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Descrição</TableHead>
                <TableHead className="text-gray-400">Valor</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id} className="border-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{request.user}</p>
                      <p className="text-gray-400 text-sm">{request.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-300 border-gray-600">
                      {request.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 max-w-64">
                    <p className="truncate">{request.description}</p>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{request.value}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(request.status)} text-white`}>
                      {getStatusText(request.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{request.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Detalhes do Pedido</DialogTitle>
                          </DialogHeader>
                          {selectedRequest && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Cliente</label>
                                  <p className="text-white">{selectedRequest.user}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">E-mail</label>
                                  <p className="text-white">{selectedRequest.email}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-gray-400 text-sm">Tipo</label>
                                <p className="text-white">{selectedRequest.type}</p>
                              </div>
                              <div>
                                <label className="text-gray-400 text-sm">Descrição Completa</label>
                                <p className="text-white">{selectedRequest.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Valor</label>
                                  <p className="text-green-400 font-medium">{selectedRequest.value}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Status Atual</label>
                                  <Badge className={`${getStatusColor(selectedRequest.status)} text-white mt-1`}>
                                    {getStatusText(selectedRequest.status)}
                                  </Badge>
                                </div>
                              </div>

                              {selectedRequest.status !== "entregue" && (
                                <div className="pt-4 border-t border-gray-800">
                                  <h4 className="text-white font-medium mb-3">Resposta/Entrega</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-gray-400 text-sm mb-2 block">Upload do Conteúdo</label>
                                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Clique para fazer upload</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-gray-400 text-sm mb-2 block">Atualizar Status</label>
                                      <Select>
                                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                          <SelectValue placeholder="Novo status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                          <SelectItem value="produzindo">Produzindo</SelectItem>
                                          <SelectItem value="entregue">Marcar como Entregue</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button className="w-full bg-green-600 hover:bg-green-700">Atualizar Pedido</Button>
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
