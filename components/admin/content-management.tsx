"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Upload, Edit, Trash2, Eye, Filter } from "lucide-react"

export function ContentManagement() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const content = [
    {
      id: 1,
      title: "Ensaio Sensual Verão",
      type: "Foto",
      plan: "Premium",
      tags: ["sensual", "verão"],
      date: "2024-01-25",
      views: 1247,
    },
    {
      id: 2,
      title: "Vídeo Exclusivo Lingerie",
      type: "Vídeo",
      plan: "Diamante",
      tags: ["lingerie", "exclusivo"],
      date: "2024-01-24",
      views: 892,
    },
    {
      id: 3,
      title: "Story Close Friends",
      type: "Story",
      plan: "Básico",
      tags: ["close", "friends"],
      date: "2024-01-24",
      views: 2156,
    },
    {
      id: 4,
      title: "Pack Especial Dezembro",
      type: "Pack",
      plan: "Premium",
      tags: ["pack", "especial"],
      date: "2024-01-23",
      views: 567,
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Conteúdos</h1>
          <p className="text-gray-400">Upload e gerenciamento de fotos, vídeos e packs</p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Upload de Conteúdo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Título</label>
                  <Input placeholder="Título do conteúdo" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Tipo</label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="foto">Foto</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="pack">Pack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Nível de Acesso</label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecionar plano" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="basico">Básico</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="diamante">Diamante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Tags</label>
                <Input
                  placeholder="sensual, verão, exclusivo (separado por vírgula)"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Arquivo</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Clique para fazer upload ou arraste o arquivo aqui</p>
                  <p className="text-gray-500 text-sm mt-2">Máximo 100MB - JPG, PNG, MP4</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700">Upload Conteúdo</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="foto">Fotos</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="story">Stories</SelectItem>
                <SelectItem value="pack">Packs</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Conteúdos da Plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead className="text-gray-400">Título</TableHead>
                <TableHead className="text-gray-400">Tipo</TableHead>
                <TableHead className="text-gray-400">Plano</TableHead>
                <TableHead className="text-gray-400">Tags</TableHead>
                <TableHead className="text-gray-400">Visualizações</TableHead>
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.map((item) => (
                <TableRow key={item.id} className="border-gray-800">
                  <TableCell className="text-white font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-gray-300 border-gray-600">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPlanColor(item.plan)} text-white`}>{item.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{item.views.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">{item.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </Button>
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
