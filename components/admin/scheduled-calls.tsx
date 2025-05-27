"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Video, Link, CheckCircle } from "lucide-react"

export function ScheduledCalls() {
  const [selectedCall, setSelectedCall] = useState<any>(null)

  const calls = [
    {
      id: 1,
      user: "João Silva",
      email: "joao@email.com",
      date: "2024-01-26",
      time: "20:00",
      duration: "30min",
      status: "confirmada",
      value: "R$ 120,00",
      notes: "Cliente prefere chamada mais íntima",
    },
    {
      id: 2,
      user: "Carlos Lima",
      email: "carlos@email.com",
      date: "2024-01-26",
      time: "21:30",
      duration: "15min",
      status: "pendente",
      value: "R$ 60,00",
      notes: "",
    },
    {
      id: 3,
      user: "Bruno Alves",
      email: "bruno@email.com",
      date: "2024-01-27",
      time: "19:00",
      duration: "60min",
      status: "confirmada",
      value: "R$ 200,00",
      notes: "Chamada especial de aniversário",
    },
    {
      id: 4,
      user: "Roberto Silva",
      email: "roberto@email.com",
      date: "2024-01-25",
      time: "22:00",
      duration: "30min",
      status: "concluida",
      value: "R$ 120,00",
      notes: "Chamada realizada com sucesso",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-600"
      case "confirmada":
        return "bg-green-600"
      case "concluida":
        return "bg-blue-600"
      case "cancelada":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "confirmada":
        return "Confirmada"
      case "concluida":
        return "Concluída"
      case "cancelada":
        return "Cancelada"
      default:
        return status
    }
  }

  const generateMeetingLink = () => {
    return `https://meet.jit.si/isabelle-private-${Date.now()}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Chamadas Agendadas</h1>
        <p className="text-gray-400">Gerencie videochamadas privadas com clientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hoje</p>
                <p className="text-2xl font-bold text-white">{calls.filter((c) => c.date === "2024-01-26").length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {calls.filter((c) => c.status === "pendente").length}
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
                <p className="text-gray-400 text-sm">Confirmadas</p>
                <p className="text-2xl font-bold text-green-400">
                  {calls.filter((c) => c.status === "confirmada").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faturamento</p>
                <p className="text-2xl font-bold text-green-400">R$ 500,00</p>
              </div>
              <div className="text-green-400 text-sm">Esta semana</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calls Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lista de Chamadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Cliente</TableHead>
                <TableHead className="text-gray-400">Data & Hora</TableHead>
                <TableHead className="text-gray-400">Duração</TableHead>
                <TableHead className="text-gray-400">Valor</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id} className="border-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{call.user}</p>
                      <p className="text-gray-400 text-sm">{call.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white">{call.date}</p>
                      <p className="text-gray-400 text-sm">{call.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-300 border-gray-600">
                      {call.duration}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">{call.value}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(call.status)} text-white`}>{getStatusText(call.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => setSelectedCall(call)}
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">Gerenciar Chamada</DialogTitle>
                          </DialogHeader>
                          {selectedCall && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Cliente</label>
                                  <p className="text-white">{selectedCall.user}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">E-mail</label>
                                  <p className="text-white">{selectedCall.email}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Data</label>
                                  <p className="text-white">{selectedCall.date}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Horário</label>
                                  <p className="text-white">{selectedCall.time}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Duração</label>
                                  <p className="text-white">{selectedCall.duration}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-gray-400 text-sm">Valor</label>
                                  <p className="text-green-400 font-medium">{selectedCall.value}</p>
                                </div>
                                <div>
                                  <label className="text-gray-400 text-sm">Status</label>
                                  <Badge className={`${getStatusColor(selectedCall.status)} text-white mt-1`}>
                                    {getStatusText(selectedCall.status)}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <label className="text-gray-400 text-sm">Observações</label>
                                <p className="text-white">{selectedCall.notes || "Nenhuma observação"}</p>
                              </div>

                              <div className="pt-4 border-t border-gray-800">
                                <h4 className="text-white font-medium mb-3">Ações da Chamada</h4>
                                <div className="space-y-3">
                                  {selectedCall.status === "confirmada" && (
                                    <div>
                                      <label className="text-gray-400 text-sm mb-2 block">Link da Sala</label>
                                      <div className="flex space-x-2">
                                        <Input
                                          value={generateMeetingLink()}
                                          readOnly
                                          className="bg-gray-800 border-gray-700 text-white"
                                        />
                                        <Button
                                          onClick={() => navigator.clipboard.writeText(generateMeetingLink())}
                                          className="bg-blue-600 hover:bg-blue-700"
                                        >
                                          <Link className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Atualizar Status</label>
                                    <Select>
                                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue placeholder="Novo status" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-gray-800 border-gray-700">
                                        <SelectItem value="confirmada">Confirmar</SelectItem>
                                        <SelectItem value="concluida">Marcar como Concluída</SelectItem>
                                        <SelectItem value="cancelada">Cancelar</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <label className="text-gray-400 text-sm mb-2 block">Observações</label>
                                    <Textarea
                                      placeholder="Adicionar observações sobre a chamada..."
                                      className="bg-gray-800 border-gray-700 text-white"
                                    />
                                  </div>

                                  <Button className="w-full bg-green-600 hover:bg-green-700">Atualizar Chamada</Button>
                                </div>
                              </div>
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
