"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Heart, Copy, Lock, Crown, Diamond, Sparkles, ArrowLeft, Check, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

// Simulação do plano do usuário
const USER_PLAN = "premium" // "basic" | "premium" | "diamond"

const PLAN_CONFIG = {
  basic: {
    name: "Básico",
    canAccessWishlist: false,
    maxGiftValue: 0,
  },
  premium: {
    name: "Premium",
    canAccessWishlist: true,
    maxGiftValue: 500,
  },
  diamond: {
    name: "Diamante",
    canAccessWishlist: true,
    maxGiftValue: Number.POSITIVE_INFINITY,
  },
}

const WISHLIST_ITEMS = [
  {
    id: 1,
    name: "Conjunto de Lingerie",
    price: 120,
    description: "Rendinha delicada para momentos especiais",
    icon: "💋",
    category: "fashion",
    requiredPlan: "premium",
  },
  {
    id: 2,
    name: "Perfume Importado",
    price: 249,
    description: "Fragrância sedutora que você vai amar",
    icon: "🌹",
    category: "beauty",
    requiredPlan: "premium",
  },
  {
    id: 3,
    name: "Salto Alto Luxo",
    price: 380,
    description: "Para arrasar nos próximos conteúdos",
    icon: "👠",
    category: "fashion",
    requiredPlan: "premium",
  },
  {
    id: 4,
    name: "Smartphone Novo",
    price: 2000,
    description: "Para fotos e vídeos em alta qualidade",
    icon: "📱",
    category: "tech",
    requiredPlan: "diamond",
  },
  {
    id: 5,
    name: "Câmera Profissional",
    price: 3500,
    description: "Para conteúdos ainda mais incríveis",
    icon: "📸",
    category: "tech",
    requiredPlan: "diamond",
  },
  {
    id: 6,
    name: "Jóias Exclusivas",
    price: 1200,
    description: "Brilho especial para momentos únicos",
    icon: "💎",
    category: "jewelry",
    requiredPlan: "diamond",
  },
]

const GIFT_HISTORY = [
  {
    id: 1,
    item: "Perfume Importado",
    value: 249,
    date: "2024-01-15",
    message: "Para você usar nos próximos vídeos 🔥",
    status: "delivered",
  },
  {
    id: 2,
    item: "PIX",
    value: 100,
    date: "2024-01-10",
    message: "Um mimo especial para você ❤️",
    status: "received",
  },
  {
    id: 3,
    item: "Conjunto de Lingerie",
    value: 120,
    date: "2024-01-05",
    message: "Mal posso esperar para ver você usando",
    status: "delivered",
  },
]

const PIX_KEY = "isabelle.lua@email.com"

export default function MimosPage() {
  const [selectedGift, setSelectedGift] = useState(null)
  const [message, setMessage] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showPixModal, setShowPixModal] = useState(false)
  const [pixAmount, setPixAmount] = useState("")
  const [copiedPix, setCopiedPix] = useState(false)

  const currentPlan = PLAN_CONFIG[USER_PLAN]

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setCopiedPix(true)
    toast({
      title: "Chave PIX copiada!",
      description: "Cole no seu app de pagamento",
    })
    setTimeout(() => setCopiedPix(false), 2000)
  }

  const handleGiftSelect = (gift) => {
    if (!currentPlan.canAccessWishlist) {
      return
    }

    if (gift.price > currentPlan.maxGiftValue) {
      return
    }

    setSelectedGift(gift)
  }

  const handleSendGift = () => {
    setShowConfirmation(true)
    // Aqui integraria com Supabase para salvar o mimo
    console.log("Sending gift:", {
      gift: selectedGift,
      message,
      user: USER_PLAN,
      timestamp: new Date(),
    })
  }

  const handleSendPix = () => {
    setShowPixModal(true)
  }

  const canAccessGift = (gift) => {
    if (!currentPlan.canAccessWishlist) return false
    return gift.price <= currentPlan.maxGiftValue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Mimos & Presentes</h1>
              <p className="text-zinc-400">Demonstre seu carinho de forma especial</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Envie um mimo e deixe ela sorrindo 💖</h2>
          <p className="text-xl text-zinc-300 max-w-2xl mx-auto">
            Mostre o quanto você aprecia... cada gesto será recompensado.
          </p>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* PIX Section */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-gradient-to-r from-emerald-900/20 to-green-900/20 border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                    PIX Direto - Mais Rápido e Fácil
                  </CardTitle>
                  <p className="text-zinc-300">Quer ser mais direto? Me manda um Pix agora 💋</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-zinc-400 mb-1">Chave PIX</p>
                      <p className="text-white font-mono">{PIX_KEY}</p>
                    </div>
                    <Button
                      onClick={handleCopyPix}
                      variant="outline"
                      size="sm"
                      className={`${copiedPix ? "bg-emerald-600 border-emerald-600" : "border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"}`}
                    >
                      {copiedPix ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedPix ? "Copiado!" : "Copiar"}
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleSendPix}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium"
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      Enviar PIX
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Wishlist Section */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Lista de Desejos</h3>
                <Badge className="bg-rose-600 text-white">{currentPlan.name}</Badge>
              </div>

              {!currentPlan.canAccessWishlist ? (
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardContent className="text-center py-12">
                    <Lock className="h-16 w-16 text-zinc-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-white mb-2">Lista de Desejos Bloqueada</h4>
                    <p className="text-zinc-400 mb-6">
                      Faça upgrade para Premium e tenha acesso aos presentes especiais
                    </p>
                    <Button className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white">
                      <Crown className="h-4 w-4 mr-2" />
                      Fazer Upgrade
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {WISHLIST_ITEMS.map((item) => {
                    const hasAccess = canAccessGift(item)

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: hasAccess ? -5 : 0 }}
                        onClick={() => hasAccess && handleGiftSelect(item)}
                        className={`relative ${hasAccess ? "cursor-pointer" : "cursor-not-allowed"}`}
                      >
                        <Card
                          className={`bg-zinc-800/50 border-zinc-700 transition-all duration-300 ${
                            hasAccess ? "hover:border-rose-500/50 hover:bg-zinc-800/70" : "opacity-60"
                          } ${selectedGift?.id === item.id ? "border-rose-500 bg-rose-500/10" : ""}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="text-3xl">{item.icon}</div>
                              {!hasAccess && (
                                <div className="flex items-center gap-1">
                                  <Lock className="h-4 w-4 text-zinc-500" />
                                  <Diamond className="h-4 w-4 text-blue-400" />
                                </div>
                              )}
                            </div>

                            <h4 className="text-lg font-semibold text-white mb-2">{item.name}</h4>
                            <p className="text-zinc-400 text-sm mb-4">{item.description}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-rose-400">
                                R$ {item.price.toLocaleString("pt-BR")}
                              </span>
                              {hasAccess ? (
                                <Button
                                  size="sm"
                                  className={`${
                                    selectedGift?.id === item.id
                                      ? "bg-rose-600 hover:bg-rose-700"
                                      : "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600"
                                  } text-white`}
                                >
                                  {selectedGift?.id === item.id ? "Selecionado" : "Quero Enviar"}
                                </Button>
                              ) : (
                                <Badge variant="outline" className="border-zinc-600 text-zinc-500">
                                  Apenas Diamante
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.section>

            {/* Message Section */}
            {(selectedGift || currentPlan.canAccessWishlist) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-400" />
                      Mensagem Carinhosa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Esse é pra você usar no próximo vídeo 🔥"
                      className="bg-zinc-900/50 border-zinc-600 text-white placeholder:text-zinc-500 min-h-[100px]"
                      maxLength={200}
                    />
                    <p className="text-xs text-zinc-500 mt-2">{message.length}/200 caracteres</p>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Send Button */}
            {selectedGift && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Button
                  onClick={handleSendGift}
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold px-12 py-4 text-lg"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Enviar Mimo - R$ {selectedGift.price.toLocaleString("pt-BR")}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full overflow-hidden mx-auto border-2 border-rose-500">
                      <Image
                        src="/placeholder.svg?height=96&width=96"
                        alt="Isabelle Lua"
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 h-4 w-4 rounded-full border-2 border-zinc-900"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Isabelle Lua</h4>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm italic">
                    "Cada mimo que você envia me deixa mais animada para criar conteúdos especiais só para você 💕"
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gift History */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Seus Últimos Mimos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {GIFT_HISTORY.map((gift) => (
                    <div key={gift.id} className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg">
                      <div className="h-10 w-10 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center">
                        <Gift className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{gift.item}</p>
                        <p className="text-zinc-400 text-xs">R$ {gift.value}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          gift.status === "delivered"
                            ? "border-green-500 text-green-400"
                            : "border-blue-500 text-blue-400"
                        }`}
                      >
                        {gift.status === "delivered" ? "Entregue" : "Recebido"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-rose-500" />
              Confirmar Envio
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
              <h4 className="text-white font-medium mb-2">{selectedGift?.name}</h4>
              <p className="text-zinc-400 text-sm mb-3">{selectedGift?.description}</p>
              <p className="text-2xl font-bold text-rose-400">R$ {selectedGift?.price.toLocaleString("pt-BR")}</p>
            </div>

            {message && (
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                <p className="text-zinc-400 text-sm mb-1">Sua mensagem:</p>
                <p className="text-white italic">"{message}"</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border-zinc-600 text-zinc-400 hover:bg-zinc-800"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false)
                  toast({
                    title: "Mimo enviado! 💖",
                    description: "Isabelle ficará muito feliz!",
                  })
                }}
                className="flex-1 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white"
              >
                Confirmar Envio
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PIX Modal */}
      <Dialog open={showPixModal} onOpenChange={setShowPixModal}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Enviar PIX
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4 mb-4">
              <p className="text-emerald-400 text-sm mb-2">Chave PIX</p>
              <p className="text-white font-mono text-lg">{PIX_KEY}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Valor (opcional)</label>
                <input
                  type="number"
                  value={pixAmount}
                  onChange={(e) => setPixAmount(e.target.value)}
                  placeholder="R$ 0,00"
                  className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-white placeholder:text-zinc-500"
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-2 block">Mensagem</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Um mimo especial para você ❤️"
                  className="bg-zinc-800 border-zinc-600 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPixModal(false)}
                className="flex-1 border-zinc-600 text-zinc-400 hover:bg-zinc-800"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCopyPix}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Chave
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
