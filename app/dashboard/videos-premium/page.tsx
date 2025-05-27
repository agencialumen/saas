"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Lock, ArrowLeft, X, Clock, Eye, Heart, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
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

// Dados simulados dos vídeos premium
const PREMIUM_VIDEOS = [
  {
    id: 1,
    title: "Ensaio Íntimo Completo",
    thumbnail: "/images/video-thumb1.jpg",
    duration: "12:34",
    requiredPlan: "premium",
    date: "2024-01-20",
    views: 2341,
    likes: 456,
    description: "Um momento especial gravado só para você",
    isNew: true,
  },
  {
    id: 2,
    title: "Dança Sensual Exclusiva",
    thumbnail: "/images/video-thumb2.jpg",
    duration: "08:45",
    requiredPlan: "premium",
    date: "2024-01-18",
    views: 1876,
    likes: 321,
    description: "Uma dança que vai te deixar sem fôlego",
    isNew: false,
  },
  {
    id: 3,
    title: "Momento Diamante VIP",
    thumbnail: "/images/video-thumb3.jpg",
    duration: "15:22",
    requiredPlan: "diamond",
    date: "2024-01-15",
    views: 3421,
    likes: 678,
    description: "Conteúdo exclusivo para membros Diamante",
    isNew: true,
  },
  {
    id: 4,
    title: "Banho Relaxante",
    thumbnail: "/images/video-thumb4.jpg",
    duration: "09:12",
    requiredPlan: "premium",
    date: "2024-01-12",
    views: 1234,
    likes: 234,
    description: "Um banho especial para relaxar juntos",
    isNew: false,
  },
  {
    id: 5,
    title: "Experiência Diamante Completa",
    thumbnail: "/images/video-thumb5.jpg",
    duration: "20:15",
    requiredPlan: "diamond",
    date: "2024-01-10",
    views: 4567,
    likes: 890,
    description: "A experiência mais completa e exclusiva",
    isNew: false,
  },
  {
    id: 6,
    title: "Lingerie Collection",
    thumbnail: "/images/video-thumb6.jpg",
    duration: "11:30",
    requiredPlan: "premium",
    date: "2024-01-08",
    views: 2890,
    likes: 445,
    description: "Desfile especial da minha coleção favorita",
    isNew: false,
  },
  {
    id: 7,
    title: "Noite Especial Diamante",
    thumbnail: "/images/video-thumb7.jpg",
    duration: "18:45",
    requiredPlan: "diamond",
    date: "2024-01-05",
    views: 5234,
    likes: 1023,
    description: "Uma noite inesquecível só para você",
    isNew: false,
  },
  {
    id: 8,
    title: "Yoga Sensual",
    thumbnail: "/images/video-thumb8.jpg",
    duration: "14:20",
    requiredPlan: "premium",
    date: "2024-01-03",
    views: 1987,
    likes: 367,
    description: "Relaxe e se conecte comigo",
    isNew: false,
  },
]

export default function VideosPremiumPage() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [upgradeModal, setUpgradeModal] = useState(null)

  const currentPlan = PLAN_CONFIG[USER_PLAN]

  // Filtrar vídeos baseado no plano do usuário
  const accessibleVideos = useMemo(() => {
    return PREMIUM_VIDEOS.filter((video) => {
      return currentPlan.level >= PLAN_CONFIG[video.requiredPlan].level
    })
  }, [currentPlan.level])

  const checkAccess = (requiredPlan) => {
    return currentPlan.level >= PLAN_CONFIG[requiredPlan].level
  }

  const handleVideoClick = (video) => {
    const hasAccess = checkAccess(video.requiredPlan)

    if (!hasAccess) {
      setUpgradeModal({
        video,
        requiredPlan: video.requiredPlan,
      })
    } else {
      setSelectedVideo(video)
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
      year: "numeric",
    })
  }

  const formatDuration = (duration) => {
    return duration
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Vídeos Premium</h1>
                <p className="text-zinc-300">Vídeos completos em alta qualidade</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-zinc-400 text-sm">{PREMIUM_VIDEOS.length} vídeos disponíveis</span>
                  <Badge className={`${currentPlan.badge} text-white`}>Seu plano: {currentPlan.name}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {PREMIUM_VIDEOS.map((video, index) => {
              const hasAccess = checkAccess(video.requiredPlan)

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => handleVideoClick(video)}
                  className={`bg-zinc-800/50 backdrop-blur-sm border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${
                    hasAccess ? "border-zinc-700 hover:border-rose-500/50" : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail || "/placeholder.svg?height=180&width=320"}
                      alt={video.title}
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
                          <p className="text-zinc-300 text-xs">{PLAN_CONFIG[video.requiredPlan].name}</p>
                        </div>
                      </div>
                    )}

                    {/* Play button overlay */}
                    {hasAccess && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    )}

                    {/* Video duration */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                      {video.duration}
                    </div>

                    {/* Video icon */}
                    <div className="absolute top-2 left-2">
                      <div className={`p-2 rounded-full ${hasAccess ? "bg-black/50" : "bg-black/70"}`}>
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Plan badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className={`${getPlanBadgeColor(video.requiredPlan)} text-white text-xs`}>
                        {PLAN_CONFIG[video.requiredPlan].name}
                      </Badge>
                    </div>

                    {/* New badge */}
                    {video.isNew && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-emerald-600 text-white text-xs">Novo</Badge>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{video.description}</p>

                    <div className="flex items-center justify-between text-zinc-400 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(video.date)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-zinc-400 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{video.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{video.duration}</span>
                      </div>
                    </div>

                    {/* Unlock button for locked content */}
                    {!hasAccess && (
                      <Button
                        className={`w-full mt-3 bg-gradient-to-r ${PLAN_CONFIG[video.requiredPlan].color} hover:opacity-90 text-white text-sm`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVideoClick(video)
                        }}
                      >
                        Desbloquear - {PLAN_CONFIG[video.requiredPlan].price}
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty state for basic users */}
        {USER_PLAN === "basic" && (
          <div className="text-center py-12 mt-8">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-8 max-w-md mx-auto">
              <Lock className="h-12 w-12 text-zinc-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Conteúdo Premium</h3>
              <p className="text-zinc-300 mb-6">
                Todos os vídeos estão disponíveis para assinantes Premium e Diamante.
              </p>
              <Button className="bg-gradient-to-r from-rose-500 to-red-500 hover:opacity-90 text-white">
                Fazer Upgrade Agora
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl p-0">
          {selectedVideo && (
            <div className="relative">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Video Player Area */}
              <div className="relative aspect-video bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Player de vídeo seria implementado aqui</p>
                    <p className="text-sm text-zinc-400">Integração com player HTML5 ou plataforma de vídeo</p>
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                    <p className="text-zinc-300 mb-3">{selectedVideo.description}</p>
                  </div>
                  <Badge className={`${getPlanBadgeColor(selectedVideo.requiredPlan)} text-white`}>
                    {PLAN_CONFIG[selectedVideo.requiredPlan].name}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-zinc-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(selectedVideo.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedVideo.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{selectedVideo.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{selectedVideo.likes}</span>
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
                <h3 className="text-xl font-bold text-white mb-2">Vídeo Exclusivo</h3>
                <p className="text-zinc-300">
                  <strong>{upgradeModal.video.title}</strong> é exclusivo para assinantes do plano{" "}
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
