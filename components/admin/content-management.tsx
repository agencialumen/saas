"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Filter, ImageIcon, Video, FileText, Calendar, ExternalLink } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface Content {
  id: string
  created_at: string
  titulo: string
  descricao: string
  tipo: string
  url_arquivo: string
  visibilidade: string
  criado_por: string
}

interface ContentForm {
  titulo: string
  descricao: string
  tipo: string
  url_arquivo: string
  visibilidade: string
}

export function ContentManagement() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [filterType, setFilterType] = useState("all")
  const [filterVisibility, setFilterVisibility] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<ContentForm>({
    titulo: "",
    descricao: "",
    tipo: "",
    url_arquivo: "",
    visibilidade: "",
  })

  // Buscar conteúdos
  const fetchContents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("conteudos").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Erro ao buscar conteúdos:", error)
        return
      }

      setContents(data || [])
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }

  // Criar conteúdo
  const handleCreate = async () => {
    if (!formData.titulo || !formData.tipo || !formData.visibilidade) {
      alert("Preencha os campos obrigatórios")
      return
    }

    try {
      setSubmitting(true)
      const { data: userData } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from("conteudos")
        .insert([
          {
            ...formData,
            criado_por: userData.user?.id,
          },
        ])
        .select()

      if (error) {
        console.error("Erro ao criar conteúdo:", error)
        alert("Erro ao criar conteúdo")
        return
      }

      setIsCreateOpen(false)
      setFormData({
        titulo: "",
        descricao: "",
        tipo: "",
        url_arquivo: "",
        visibilidade: "",
      })
      fetchContents()
      alert("Conteúdo criado com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao criar conteúdo")
    } finally {
      setSubmitting(false)
    }
  }

  // Editar conteúdo
  const handleEdit = async () => {
    if (!editingContent || !formData.titulo || !formData.tipo || !formData.visibilidade) {
      alert("Preencha os campos obrigatórios")
      return
    }

    try {
      setSubmitting(true)
      const { error } = await supabase.from("conteudos").update(formData).eq("id", editingContent.id)

      if (error) {
        console.error("Erro ao editar conteúdo:", error)
        alert("Erro ao editar conteúdo")
        return
      }

      setIsEditOpen(false)
      setEditingContent(null)
      setFormData({
        titulo: "",
        descricao: "",
        tipo: "",
        url_arquivo: "",
        visibilidade: "",
      })
      fetchContents()
      alert("Conteúdo editado com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao editar conteúdo")
    } finally {
      setSubmitting(false)
    }
  }

  // Excluir conteúdo
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("conteudos").delete().eq("id", id)

      if (error) {
        console.error("Erro ao excluir conteúdo:", error)
        alert("Erro ao excluir conteúdo")
        return
      }

      fetchContents()
      alert("Conteúdo excluído com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao excluir conteúdo")
    }
  }

  // Abrir modal de edição
  const openEditModal = (content: Content) => {
    setEditingContent(content)
    setFormData({
      titulo: content.titulo,
      descricao: content.descricao,
      tipo: content.tipo,
      url_arquivo: content.url_arquivo,
      visibilidade: content.visibilidade,
    })
    setIsEditOpen(true)
  }

  // Filtrar conteúdos
  const filteredContents = contents.filter((content) => {
    const matchesType = filterType === "all" || content.tipo === filterType
    const matchesVisibility = filterVisibility === "all" || content.visibilidade === filterVisibility
    const matchesSearch =
      content.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.descricao.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesType && matchesVisibility && matchesSearch
  })

  // Obter cor do badge por tipo
  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case "foto":
        return "bg-blue-600"
      case "video":
        return "bg-purple-600"
      case "outro":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  // Obter cor do badge por visibilidade
  const getVisibilityColor = (visibilidade: string) => {
    switch (visibilidade) {
      case "público":
        return "bg-green-600"
      case "privado":
        return "bg-red-600"
      case "assinantes":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  // Obter ícone por tipo
  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "foto":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    fetchContents()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Conteúdos</h1>
          <p className="text-gray-400">Gerencie fotos, vídeos e outros conteúdos da plataforma</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Criar Novo Conteúdo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Título *</label>
                  <Input
                    placeholder="Título do conteúdo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Tipo *</label>
                  <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="foto">Foto</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Descrição</label>
                <Textarea
                  placeholder="Descrição do conteúdo"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">URL do Arquivo</label>
                <Input
                  placeholder="https://exemplo.com/arquivo.jpg"
                  value={formData.url_arquivo}
                  onChange={(e) => setFormData({ ...formData, url_arquivo: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Visibilidade *</label>
                <Select
                  value={formData.visibilidade}
                  onValueChange={(value) => setFormData({ ...formData, visibilidade: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecionar visibilidade" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="público">Público</SelectItem>
                    <SelectItem value="privado">Privado</SelectItem>
                    <SelectItem value="assinantes">Assinantes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleCreate} disabled={submitting}>
                  {submitting ? "Criando..." : "Criar Conteúdo"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Filtros:</span>
            </div>

            <Input
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white md:w-64"
            />

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="foto">Fotos</SelectItem>
                <SelectItem value="video">Vídeos</SelectItem>
                <SelectItem value="outro">Outros</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterVisibility} onValueChange={setFilterVisibility}>
              <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Visibilidade" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="público">Público</SelectItem>
                <SelectItem value="privado">Privado</SelectItem>
                <SelectItem value="assinantes">Assinantes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Conteúdos */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Conteúdos da Plataforma
            <Badge variant="outline" className="text-gray-300 border-gray-600">
              {filteredContents.length} conteúdos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Preview</TableHead>
                    <TableHead className="text-gray-400">Título</TableHead>
                    <TableHead className="text-gray-400">Tipo</TableHead>
                    <TableHead className="text-gray-400">Visibilidade</TableHead>
                    <TableHead className="text-gray-400">Data</TableHead>
                    <TableHead className="text-gray-400">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContents.map((content) => (
                    <TableRow key={content.id} className="border-gray-800">
                      <TableCell>
                        <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                          {content.url_arquivo ? (
                            content.tipo === "video" ? (
                              <video src={content.url_arquivo} className="w-full h-full object-cover" muted />
                            ) : content.tipo === "foto" ? (
                              <img
                                src={content.url_arquivo || "/placeholder.svg"}
                                alt={content.titulo}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              getTypeIcon(content.tipo)
                            )
                          ) : (
                            getTypeIcon(content.tipo)
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">{content.titulo}</p>
                          {content.descricao && (
                            <p className="text-gray-400 text-sm truncate max-w-xs">{content.descricao}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTypeColor(content.tipo)} text-white`}>
                          <span className="mr-1">{getTypeIcon(content.tipo)}</span>
                          {content.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getVisibilityColor(content.visibilidade)} text-white`}>
                          {content.visibilidade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-300 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(content.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {content.url_arquivo && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-400 hover:text-blue-300"
                              onClick={() => window.open(content.url_arquivo, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-yellow-400 hover:text-yellow-300"
                            onClick={() => openEditModal(content)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-gray-900 border-gray-800">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">Confirmar Exclusão</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Tem certeza que deseja excluir o conteúdo "{content.titulo}"? Esta ação não pode ser
                                  desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-800 text-white border-gray-700">
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => handleDelete(content.id)}
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredContents.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Nenhum conteúdo encontrado</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Conteúdo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Título *</label>
                <Input
                  placeholder="Título do conteúdo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Tipo *</label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="foto">Foto</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Descrição</label>
              <Textarea
                placeholder="Descrição do conteúdo"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
                rows={3}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">URL do Arquivo</label>
              <Input
                placeholder="https://exemplo.com/arquivo.jpg"
                value={formData.url_arquivo}
                onChange={(e) => setFormData({ ...formData, url_arquivo: e.target.value })}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Visibilidade *</label>
              <Select
                value={formData.visibilidade}
                onValueChange={(value) => setFormData({ ...formData, visibilidade: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecionar visibilidade" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="público">Público</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                  <SelectItem value="assinantes">Assinantes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleEdit} disabled={submitting}>
                {submitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
