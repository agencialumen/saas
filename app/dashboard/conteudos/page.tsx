"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Video, Lock, Play, Heart, Eye, ArrowLeft, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"

// Simulação do plano do usuário - em produção viria do Supabase
const USER_PLAN = "premium" // "basic" | "premium" | "diamond"

const PLAN_CONFIG = {
  basic: {
    name: "Básico",
    price: "R$19,90",
    color: "from-zinc-500 to-zinc-600",
    badge: "bg-zinc-600",
    level: 1,
  },
  premium: {
    name: "Premium",
    price: "R$29,90",
    color: "from-rose-500 to-red-500",
    badge: "bg-rose-600",
    level: 2,
  },
  diamond: {
    name: "Diamante",
    price: "R$99,90",
    color: "from-blue-500 to-indigo-500",
    badge: "bg-blue-600",
    level: 3,
  },
}

// Dados simulados do conteúdo
const CONTENT_DATA = [
  // Fotos
  {
    id: 1,
    type: "photo",
    title: "Ensaio Sensual",
    thumbnail: "/images/photo1.jpg",
    requiredPlan: "premium",
    isCloseFriends: false,
    date: "2024-01-15",
    likes: 1247,
    views: 3421,
  },
  {
    id: 2,
    type: "photo",
    title: "Lingerie Vermelha",
    thumbnail: "/images/photo2.jpg",
    requiredPlan: "premium",
    isCloseFriends: false,
    date: "2024-01-14",
    likes: 892,
    views: 2156,
  },
  {
    id: 3,
    type: "photo",
    title: "Close Friends Especial",
    thumbnail: "/images/photo3.jpg",
    requiredPlan: "diamond",
    isCloseFriends: true,
    date: "2024-01-13",
    likes: 2341,
    views: 4567,
  },
  {
    id: 4,
    type: "photo",
    title: "Banho de Sol",
    thumbnail: "/images/photo4.jpg",
    requiredPlan: "basic",
    isCloseFriends: false,
    date: "2024-01-12",
    likes: 567,
    views: 1234,
  },
  // Vídeos
  {
    id: 5,
    type: "video",
    title: "Dançando para Você",
    thumbnail: "/images/video1.jpg",
    duration: "03:24",
    requiredPlan: "premium",
    isCloseFriends: false,
    date: "2024-01-11",
    likes: 1876,
    views: 5432,
  },
  {
    id: 6,
    type: "video",
    title: "Momento Íntimo",
    thumbnail: "/images/video2.jpg",
    duration: "05:12",
    requiredPlan: "diamond",
    isCloseFriends: true,
    date: "2024-01-10",
    likes: 3421,
    views: 7890,
  },
  {
    id: 7,
    type: "video",
    title: "Boa Noite Amor",
    thumbnail: "/images/video3.jpg",
    duration: "02:45",
    requiredPlan: "premium",
    isCloseFriends: false,
    date: "2024-01-09",
    likes: 1234,
    views: 3456,
  },
  {
    id: 8,
    type: "video",
    title: "Exclusivo Diamante",
    thumbnail: "/images/video4.jpg",
    duration: "07:30",
    requiredPlan: "diamond",
    isCloseFriends: false,
    date: "2024-01-08",
    likes: 2567,
    views: 6789,
  },
]

export default function ConteudosPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedContent, setSelectedContent] = useState(null)
  const [upgradeModal, setUpgradeModal] = useState(null)
  const [filterPlan, setFilterPlan] = useState("all")

  const currentPlan = PLAN_CONFIG[USER_PLAN]

  // Filtrar conteúdo baseado na aba ativa e filtro de plano
  const filteredContent = useMemo(() => {
    let content = CONTENT_DATA

    // Filtrar por tipo
    if (activeTab !== "all") {
      content = content.filter((item) => item.type === activeTab)
    }

    // Filtrar por plano
    if (filterPlan !== "all") {
      content = content.filter((item) => item.requiredPlan === filterPlan)
    }

    return content.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [activeTab, filterPlan])

  const checkAccess = (requiredPlan) => {
    return currentPlan.level >= PLAN_CONFIG[requiredPlan].level
  }

  const handleContentClick = (content) => {
    const hasAccess = checkAccess(content.requiredPlan)

    if (!hasAccess) {
      setUpgradeModal({
        content,
        requiredPlan: content.requiredPlan,
      })
    } else {
      setSelectedContent(content)
    }
  }

  const getPlanBadgeColor = (plan) => {
    switch (plan) {
      case "basic":
        return "bg-zinc-600"
      case "premium":
        return "bg-rose-600"
      case "diamond":
        return "bg-blue-600"
      default:
        return "bg-zinc-600"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Galeria Exclusiva</h1>
                <p className="text-zinc-400 text-sm">Conteúdo premium para assinantes</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className={`${currentPlan.badge} text-white`}>Plano {currentPlan.name}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50 rounded-xl p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg transition-all duration-300"
              >
                Tudo ({CONTENT_DATA.length})
              </TabsTrigger>
              <TabsTrigger
                value="photo"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Fotos ({CONTENT_DATA.filter((c) => c.type === "photo").length})
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Video className="h-4 w-4" />
                Vídeos ({CONTENT_DATA.filter((c) => c.type === "video").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-zinc-400" />
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-48 bg-zinc-800/50 border-zinc-700 text-white">
                <SelectValue placeholder="Filtrar por plano" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="all">Todos os planos</SelectItem>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="diamond">Diamante</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredContent.map((content) => {
              const hasAccess = checkAccess(content.requiredPlan)
              const Icon = content.type === "photo" ? Camera : Video

              return (
                <motion.div
                  key={content.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => handleContentClick(content)}
                  className={`bg-zinc-800/50 backdrop-blur-sm border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                    content.isCloseFriends
                      ? "border-green-500/50 hover:border-green-400"
                      : hasAccess
                        ? "border-zinc-700 hover:border-rose-500/50"
                        : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={content.thumbnail || "/placeholder.svg"}
                      alt={content.title}
                      fill
                      className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                        !hasAccess ? "blur-md" : ""
                      }`}
                    />

                    {/* Overlay for locked content */}
                    {!hasAccess && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="h-8 w-8 text-white mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">Exclusivo</p>
                          <p className="text-zinc-300 text-xs">{PLAN_CONFIG[content.requiredPlan].name}</p>
                        </div>
                      </div>
                    )}

                    {/* Video duration */}
                    {content.type === "video" && hasAccess && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                        {content.duration}
                      </div>
                    )}

                    {/* Play button for videos */}
                    {content.type === "video" && hasAccess && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    )}

                    {/* Content type icon */}
                    <div className="absolute top-2 left-2">
                      <div className={`p-2 rounded-full ${hasAccess ? "bg-black/50" : "bg-black/70"}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Plan badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getPlanBadgeColor(content.requiredPlan)} text-white text-xs`}>
                        {PLAN_CONFIG[content.requiredPlan].name}
                      </Badge>
                    </div>

                    {/* Close Friends indicator */}
                    {content.isCloseFriends && (
                      <div className="absolute bottom-2 left-2">
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Close Friends
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Info */}
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 line-clamp-1">{content.title}</h3>

                    <div className="flex items-center justify-between text-zinc-400 text-sm">
                      <span>{formatDate(content.date)}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{content.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{content.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* Unlock button for locked content */}
                    {!hasAccess && (
                      <Button
                        className={`w-full mt-3 bg-gradient-to-r ${PLAN_CONFIG[content.requiredPlan].color} hover:opacity-90 text-white text-sm`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleContentClick(content)
                        }}
                      >
                        Desbloquear - {PLAN_CONFIG[content.requiredPlan].price}
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="text-zinc-500 mb-4">
              <Camera className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg">Nenhum conteúdo encontrado</p>
              <p className="text-sm">Tente ajustar os filtros</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Viewer Modal */}
      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl p-0">
          {selectedContent && (
            <div className="relative">
              <button
                onClick={() => setSelectedContent(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {selectedContent.type === "photo" ? (
                <div className="relative aspect-[4/5] max-h-[80vh]">
                  <Image
                    src={selectedContent.thumbnail || "/placeholder.svg"}
                    alt={selectedContent.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="relative aspect-video bg-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Player de vídeo seria implementado aqui</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{selectedContent.title}</h2>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>{formatDate(selectedContent.date)}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{selectedContent.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{selectedContent.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <Dialog open={!!upgradeModal} onOpenChange={() => setUpgradeModal(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          {upgradeModal && (
            <div className="text-center py-4">
              <div className="mb-6">
                <Lock className="h-12 w-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Conteúdo Exclusivo</h3>
                <p className="text-zinc-300">
                  <strong>{upgradeModal.content.title}</strong> é exclusivo para assinantes do plano{" "}
                  <strong>{PLAN_CONFIG[upgradeModal.requiredPlan].name}</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className={`w-full bg-gradient-to-r ${PLAN_CONFIG[upgradeModal.requiredPlan].color} hover:opacity-90 text-white font-medium`}
                  onClick={() => {
                    setUpgradeModal(null)
                    // Redirect to upgrade
                  }}
                >
                  Fazer Upgrade - {PLAN_CONFIG[upgradeModal.requiredPlan].price}/mês
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-zinc-400 hover:text-white"
                  onClick={() => setUpgradeModal(null)}
                >
                  Voltar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
