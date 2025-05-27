"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import { Camera, Video, Gift, Phone, Lock, Crown, Diamond, Package, Sparkles, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

// Simulação do plano do usuário - em produção viria do Supabase
const USER_PLAN = "premium" // "basic" | "premium" | "diamond"

const PLAN_CONFIG = {
  basic: {
    name: "Básico",
    price: "R$19,90",
    color: "from-zinc-500 to-zinc-600",
    badge: "bg-zinc-600",
    canAccessPhotos: false,
    canAccessVideos: false,
    canAccessCloseFriends: false,
    canAccessCalls: false,
    canSendGifts: false,
    canRequestCustom: false,
  },
  premium: {
    name: "Premium",
    price: "R$29,90",
    color: "from-rose-500 to-red-500",
    badge: "bg-rose-600",
    canAccessPhotos: true,
    canAccessVideos: true,
    canAccessCloseFriends: false,
    canAccessCalls: false,
    canSendGifts: true,
    canRequestCustom: true,
  },
  diamond: {
    name: "Diamante",
    price: "R$99,90",
    color: "from-blue-500 to-indigo-500",
    badge: "bg-blue-600",
    canAccessPhotos: true,
    canAccessVideos: true,
    canAccessCloseFriends: true,
    canAccessCalls: true,
    canSendGifts: true,
    canRequestCustom: true,
  },
}

const STORIES_DATA = [
  {
    id: 1,
    title: "Hoje",
    thumbnail: "/images/story1.jpg",
    isCloseFriends: false,
    hasNew: true,
  },
  {
    id: 2,
    title: "Ontem",
    thumbnail: "/images/story2.jpg",
    isCloseFriends: false,
    hasNew: true,
  },
  {
    id: 3,
    title: "VIP",
    thumbnail: "/images/story3.jpg",
    isCloseFriends: true,
    hasNew: true,
  },
  {
    id: 4,
    title: "Especial",
    thumbnail: "/images/story4.jpg",
    isCloseFriends: true,
    hasNew: false,
  },
]

const CONTENT_GRID = [
  {
    id: "photos",
    title: "Fotos Exclusivas",
    description: "Galeria completa de fotos sensuais",
    icon: Camera,
    requiredPlan: "premium",
    count: "247 fotos",
  },
  {
    id: "videos",
    title: "Vídeos Premium",
    description: "Vídeos completos em alta qualidade",
    icon: Video,
    requiredPlan: "premium",
    count: "89 vídeos",
  },
  {
    id: "packs",
    title: "Packs Especiais",
    description: "Conteúdo temático exclusivo",
    icon: Package,
    requiredPlan: "basic",
    count: "12 packs",
    isPurchase: true,
  },
  {
    id: "gifts",
    title: "Enviar Mimo",
    description: "Pix, presentes da wishlist",
    icon: Gift,
    requiredPlan: "premium",
  },
  {
    id: "custom",
    title: "Pedido Personalizado",
    description: "Vídeo ou áudio só seu",
    icon: Sparkles,
    requiredPlan: "premium",
  },
  {
    id: "calls",
    title: "Videochamada",
    description: "15, 30 ou 60 minutos",
    icon: Phone,
    requiredPlan: "diamond",
  },
]

export default function DashboardPage() {
  const [selectedModal, setSelectedModal] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const currentPlan = PLAN_CONFIG[USER_PLAN]

  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error("Erro ao verificar autenticação:", error)
          router.push("/auth")
          return
        }

        if (!user) {
          console.log("Usuário não autenticado, redirecionando...")
          router.push("/auth")
          return
        }

        console.log("Usuário autenticado:", user)
        setUser(user)
      } catch (error) {
        console.error("Erro inesperado na verificação de auth:", error)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Escutar mudanças no estado de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push("/auth")
      } else if (session?.user) {
        setUser(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-zinc-400">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não há usuário autenticado, não renderizar nada (redirecionamento já foi feito)
  if (!user) {
    return null
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Erro no logout:", error)
      } else {
        console.log("Logout realizado com sucesso")
        // Redirecionar para a página de login
        router.push("/auth")
      }
    } catch (error) {
      console.error("Erro inesperado no logout:", error)
    }
  }

  const handleFeatureClick = (feature) => {
    const hasAccess = checkAccess(feature.requiredPlan)

    if (!hasAccess) {
      setSelectedModal({
        type: "upgrade",
        feature: feature,
        requiredPlan: feature.requiredPlan,
      })
    } else {
      // Navegar para a funcionalidade
      console.log(`Accessing ${feature.id}`)
    }
  }

  const handleStoryClick = (story) => {
    if (story.isCloseFriends && !currentPlan.canAccessCloseFriends) {
      setSelectedModal({
        type: "upgrade",
        feature: { title: "Close Friends", description: "Conteúdo exclusivo para assinantes Diamante" },
        requiredPlan: "diamond",
      })
    } else {
      setSelectedStory(story)
    }
  }

  const checkAccess = (requiredPlan) => {
    const planHierarchy = { basic: 1, premium: 2, diamond: 3 }
    return planHierarchy[USER_PLAN] >= planHierarchy[requiredPlan]
  }

  const getUpgradeText = () => {
    if (USER_PLAN === "basic") return "Fazer Upgrade para Premium"
    if (USER_PLAN === "premium") return "Fazer Upgrade para Diamante"
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-rose-500">
                  <Image
                    src="/images/profile-avatar.jpg"
                    alt="Isabelle Lua"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-zinc-900"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Isabelle Lua</h1>
                <div className="flex items-center gap-2">
                  <Badge className={`${currentPlan.badge} text-white text-xs`}>Você é {currentPlan.name}</Badge>
                  <span className="text-zinc-400 text-sm">{currentPlan.price}/mês</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {getUpgradeText() && (
                <Button
                  onClick={() => setSelectedModal({ type: "upgrade-main" })}
                  className={`bg-gradient-to-r ${currentPlan.color} hover:opacity-90 text-white font-medium px-6`}
                >
                  {getUpgradeText()}
                </Button>
              )}
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stories Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Destaques</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {STORIES_DATA.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleStoryClick(story)}
                className="flex-shrink-0 cursor-pointer"
              >
                <div className="relative">
                  <div
                    className={`h-20 w-20 rounded-full p-1 ${
                      story.isCloseFriends
                        ? "bg-gradient-to-tr from-green-400 to-green-600"
                        : story.hasNew
                          ? "bg-gradient-to-tr from-rose-500 to-red-500"
                          : "bg-zinc-700"
                    }`}
                  >
                    <div className="h-full w-full rounded-full overflow-hidden bg-zinc-800">
                      <Image
                        src={story.thumbnail || "/placeholder.svg"}
                        alt={story.title}
                        width={72}
                        height={72}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  {story.isCloseFriends && !currentPlan.canAccessCloseFriends && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-zinc-400 text-center mt-2 max-w-[80px] truncate">{story.title}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Content Grid */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4">Conteúdo Exclusivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTENT_GRID.map((item) => {
              const hasAccess = checkAccess(item.requiredPlan)
              const Icon = item.icon

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  onClick={() => handleFeatureClick(item)}
                  className={`bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-rose-500/50 ${
                    !hasAccess ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        hasAccess ? "bg-gradient-to-r from-rose-500 to-red-500" : "bg-zinc-700"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {!hasAccess && <Lock className="h-5 w-5 text-zinc-500" />}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm mb-3">{item.description}</p>

                  {item.count && <p className="text-rose-400 text-sm font-medium">{item.count}</p>}

                  {item.isPurchase && <Badge className="bg-amber-600 text-white text-xs mt-2">Compra Avulsa</Badge>}

                  {!hasAccess && (
                    <div className="mt-3 pt-3 border-t border-zinc-700">
                      <p className="text-xs text-zinc-500">Requer plano {PLAN_CONFIG[item.requiredPlan].name}</p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Upgrade CTA */}
        {USER_PLAN !== "diamond" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gradient-to-r from-rose-900/20 to-red-900/20 border border-rose-500/30 rounded-2xl p-8 text-center"
          >
            <Crown className="h-12 w-12 text-rose-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Desbloqueie Tudo com o Plano Diamante</h3>
            <p className="text-zinc-300 mb-6">
              Acesso completo a todos os conteúdos, videochamadas exclusivas e muito mais!
            </p>
            <Button
              onClick={() => setSelectedModal({ type: "upgrade-main" })}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold px-8 py-3 text-lg"
            >
              Assinar Diamante - R$99,90/mês
            </Button>
          </motion.section>
        )}
      </div>

      {/* Modals */}
      <Dialog open={!!selectedModal} onOpenChange={() => setSelectedModal(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          {selectedModal?.type === "upgrade" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-rose-500" />
                  Conteúdo Bloqueado
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-zinc-300 mb-4">
                  <strong>{selectedModal.feature.title}</strong> é exclusivo para assinantes do plano{" "}
                  <strong>{PLAN_CONFIG[selectedModal.requiredPlan].name}</strong>.
                </p>
                <p className="text-zinc-400 text-sm mb-6">{selectedModal.feature.description}</p>
                <Button
                  onClick={() => {
                    setSelectedModal(null)
                    // Redirect to upgrade
                  }}
                  className={`w-full bg-gradient-to-r ${PLAN_CONFIG[selectedModal.requiredPlan].color} hover:opacity-90 text-white font-medium`}
                >
                  Fazer Upgrade - {PLAN_CONFIG[selectedModal.requiredPlan].price}/mês
                </Button>
              </div>
            </>
          )}

          {selectedModal?.type === "upgrade-main" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white flex items-center gap-2">
                  <Diamond className="h-5 w-5 text-blue-500" />
                  Escolha seu Plano
                </DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                {Object.entries(PLAN_CONFIG).map(([key, plan]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border ${
                      key === USER_PLAN ? "border-rose-500 bg-rose-500/10" : "border-zinc-700 bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-white">{plan.name}</h4>
                        <p className="text-zinc-400 text-sm">{plan.price}/mês</p>
                      </div>
                      {key === USER_PLAN ? (
                        <Badge className="bg-rose-600 text-white">Atual</Badge>
                      ) : (
                        <Button size="sm" className={`bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`}>
                          Assinar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Story Modal */}
      <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-sm p-0">
          {selectedStory && (
            <div className="relative aspect-[9/16] w-full">
              <Image
                src={selectedStory.thumbnail || "/placeholder.svg"}
                alt={selectedStory.title}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden border border-white">
                    <Image
                      src="/images/profile-avatar.jpg"
                      alt="Isabelle"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">Isabelle Lua</span>
                </div>
                <button onClick={() => setSelectedStory(null)} className="text-white hover:text-zinc-300">
                  ✕
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
