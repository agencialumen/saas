"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Video, Headphones, Camera, Lock, Check, Clock, Play, Eye, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

type ContentType = {
  id: string
  name: string
  icon: React.ElementType
  price: number
  description: string
  minPlan: "premium" | "diamond"
}

type Order = {
  id: string
  type: string
  title: string
  status: "pending" | "producing" | "delivered"
  price: number
  createdAt: string
  deliveryUrl?: string
}

const contentTypes: ContentType[] = [
  {
    id: "video",
    name: "Vídeo Personalizado",
    icon: Video,
    price: 89.9,
    description: "Vídeo exclusivo gravado especialmente para você",
    minPlan: "diamond",
  },
  {
    id: "audio",
    name: "Áudio Sexy",
    icon: Headphones,
    price: 49.9,
    description: "Áudio sensual com sua mensagem personalizada",
    minPlan: "premium",
  },
  {
    id: "photo",
    name: "Foto Exclusiva",
    icon: Camera,
    price: 39.9,
    description: "Foto única criada especialmente para você",
    minPlan: "premium",
  },
]

const mockOrders: Order[] = [
  {
    id: "1",
    type: "Vídeo Personalizado",
    title: "Vídeo com lingerie vermelha",
    status: "delivered",
    price: 89.9,
    createdAt: "2024-01-15",
    deliveryUrl: "#",
  },
  {
    id: "2",
    type: "Áudio Sexy",
    title: "Áudio dizendo meu nome",
    status: "producing",
    price: 49.9,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    type: "Foto Exclusiva",
    title: "Foto em pose especial",
    status: "pending",
    price: 39.9,
    createdAt: "2024-01-22",
  },
]

export default function PersonalizadoPage() {
  // Simular plano do usuário - pode vir do contexto/Supabase
  const [userPlan] = useState<"basic" | "premium" | "diamond">("premium")
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)
  const [description, setDescription] = useState("")
  const [reference, setReference] = useState("")
  const [contentTitle, setContentTitle] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canAccessContent = (contentType: ContentType) => {
    if (userPlan === "basic") return false
    if (userPlan === "premium" && contentType.minPlan === "diamond") return false
    return true
  }

  const handleContentSelect = (contentType: ContentType) => {
    if (!canAccessContent(contentType)) return
    setSelectedType(contentType)
  }

  const handleSubmit = () => {
    if (!selectedType || !description.trim() || !contentTitle.trim()) return
    setShowConfirmModal(true)
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)

    // Simular envio do pedido
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Aqui integraria com Supabase para salvar o pedido
    // e com Stripe para processar pagamento

    setIsSubmitting(false)
    setShowConfirmModal(false)

    // Reset form
    setSelectedType(null)
    setDescription("")
    setReference("")
    setContentTitle("")
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "producing":
        return "bg-blue-500/20 text-blue-400"
      case "delivered":
        return "bg-emerald-500/20 text-emerald-400"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "producing":
        return "Produzindo"
      case "delivered":
        return "Entregue"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return Clock
      case "producing":
        return Play
      case "delivered":
        return Check
    }
  }

  if (userPlan === "basic") {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
                Peça Algo Só Pra Você 🔥
              </h1>
              <p className="text-zinc-400 mt-2">
                Descreva o que deseja e receba um conteúdo exclusivo gravado especialmente pra você.
              </p>
            </div>
          </div>

          {/* Access Denied */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-12 max-w-2xl mx-auto">
              <Lock className="h-16 w-16 text-rose-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Conteúdo Exclusivo</h2>
              <p className="text-zinc-400 mb-8 text-lg">Essa função é exclusiva para assinantes Premium e Diamante</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-8"
              >
                Fazer Upgrade Agora
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
              Peça Algo Só Pra Você 🔥
            </h1>
            <p className="text-zinc-400 mt-2">
              Descreva o que deseja e receba um conteúdo exclusivo gravado especialmente pra você.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Content Type Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-semibold text-white mb-6">Escolha o tipo de conteúdo</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {contentTypes.map((type, index) => {
                  const Icon = type.icon
                  const canAccess = canAccessContent(type)
                  const isSelected = selectedType?.id === type.id

                  return (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <Card
                        className={`relative cursor-pointer transition-all duration-300 border-2 ${
                          isSelected
                            ? "border-rose-500 bg-rose-500/10"
                            : canAccess
                              ? "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900/80"
                              : "border-zinc-800 bg-zinc-900/30"
                        } ${!canAccess ? "opacity-60" : ""}`}
                        onClick={() => handleContentSelect(type)}
                      >
                        <CardHeader className="text-center pb-4">
                          <div className="relative">
                            <Icon
                              className={`h-12 w-12 mx-auto mb-3 ${
                                isSelected ? "text-rose-400" : canAccess ? "text-white" : "text-zinc-600"
                              }`}
                            />
                            {!canAccess && <Lock className="h-6 w-6 text-zinc-500 absolute -top-1 -right-1" />}
                          </div>
                          <CardTitle
                            className={`text-lg ${
                              isSelected ? "text-rose-400" : canAccess ? "text-white" : "text-zinc-500"
                            }`}
                          >
                            {type.name}
                          </CardTitle>
                          <div className="text-2xl font-bold text-emerald-400">
                            R$ {type.price.toFixed(2).replace(".", ",")}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <CardDescription className="text-center text-zinc-400">{type.description}</CardDescription>
                          {!canAccess && type.minPlan === "diamond" && (
                            <Badge
                              variant="secondary"
                              className="w-full mt-3 bg-amber-500/20 text-amber-400 border-amber-500/30"
                            >
                              Apenas Diamante
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Order Form */}
            <AnimatePresence>
              {selectedType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <CardTitle className="text-white">Descreva seu pedido</CardTitle>
                      <CardDescription>Seja específico sobre o que você gostaria de receber</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          Nome do conteúdo
                        </Label>
                        <Input
                          id="title"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          placeholder="Ex: Vídeo especial de aniversário"
                          className="bg-zinc-800 border-zinc-700 text-white mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-white">
                          Descrição detalhada
                        </Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                          placeholder="Ex: Quero um vídeo com você de lingerie vermelha dizendo meu nome..."
                          className="bg-zinc-800 border-zinc-700 text-white mt-2 min-h-[120px]"
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-zinc-500">Seja específico para um resultado perfeito</span>
                          <span className={`text-xs ${description.length > 450 ? "text-rose-400" : "text-zinc-500"}`}>
                            {description.length}/500
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="reference" className="text-white">
                          Referência (opcional)
                        </Label>
                        <Input
                          id="reference"
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          placeholder="Link ou exemplo do que você tem em mente"
                          className="bg-zinc-800 border-zinc-700 text-white mt-2"
                        />
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={!description.trim() || !contentTitle.trim()}
                        className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white py-6 text-lg font-semibold"
                      >
                        Pedir Agora - R$ {selectedType.price.toFixed(2).replace(".", ",")}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order History */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Seus Pedidos</CardTitle>
                  <CardDescription>Últimos pedidos realizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.map((order, index) => {
                    const StatusIcon = getStatusIcon(order.status)

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-white text-sm">{order.title}</h4>
                            <p className="text-xs text-zinc-400">{order.type}</p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {getStatusText(order.status)}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-emerald-400 font-semibold text-sm">
                            R$ {order.price.toFixed(2).replace(".", ",")}
                          </span>

                          {order.status === "delivered" ? (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                Ver
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                                <Repeat className="h-3 w-3 mr-1" />
                                Repetir
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-zinc-500">
                              {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-br from-rose-500/10 to-red-600/10 border-rose-500/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-rose-400 mb-3">💖 Dica Especial</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Quanto mais detalhes você fornecer, mais personalizado será seu conteúdo. Mencione cores, roupas,
                    poses ou palavras específicas que gostaria de ouvir.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Confirmar Pedido</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Revise os detalhes do seu pedido personalizado
              </DialogDescription>
            </DialogHeader>

            {selectedType && (
              <div className="space-y-4">
                <div className="bg-zinc-800/50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <selectedType.icon className="h-6 w-6 text-rose-400" />
                    <div>
                      <h3 className="font-semibold text-white">{selectedType.name}</h3>
                      <p className="text-sm text-zinc-400">{contentTitle}</p>
                    </div>
                  </div>

                  <Separator className="bg-zinc-700 my-3" />

                  <div className="space-y-2">
                    <p className="text-sm text-zinc-300">{description}</p>
                    {reference && <p className="text-xs text-zinc-500">Referência: {reference}</p>}
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-white">Total:</span>
                  <span className="text-emerald-400">R$ {selectedType.price.toFixed(2).replace(".", ",")}</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
                  >
                    {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
