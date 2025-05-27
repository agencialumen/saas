"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Calendar,
  Video,
  Diamond,
  Lock,
  Check,
  Star,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

// Simulação do plano do usuário - em produção viria do Supabase
const USER_PLAN = "diamond" // "basic" | "premium" | "diamond"

const PLAN_CONFIG = {
  basic: { name: "Básico", level: 1 },
  premium: { name: "Premium", level: 2 },
  diamond: { name: "Diamante", level: 3 },
}

// Opções de duração das chamadas
const DURATION_OPTIONS = [
  {
    id: "15min",
    duration: 15,
    price: 69.9,
    title: "Conversa Rápida",
    description: "Perfeito para um bate-papo íntimo",
    popular: false,
  },
  {
    id: "30min",
    duration: 30,
    price: 129.9,
    title: "Momento Especial",
    description: "Tempo ideal para nos conhecermos melhor",
    popular: true,
  },
  {
    id: "60min",
    duration: 60,
    price: 199.9,
    title: "Experiência Completa",
    description: "Uma hora só nossa, sem pressa",
    popular: false,
  },
]

// Horários disponíveis simulados
const AVAILABLE_SLOTS = {
  "2024-01-20": ["14:00", "16:00", "20:00", "22:00"],
  "2024-01-21": ["15:00", "18:00", "21:00"],
  "2024-01-22": ["14:00", "16:00", "19:00", "21:00", "23:00"],
  "2024-01-23": ["16:00", "20:00", "22:00"],
  "2024-01-24": ["15:00", "17:00", "19:00", "21:00"],
}

// Histórico de chamadas simulado
const CALL_HISTORY = [
  {
    id: 1,
    date: "2024-01-15",
    time: "20:00",
    duration: 30,
    status: "completed",
    rating: 5,
  },
  {
    id: 2,
    date: "2024-01-18",
    time: "21:00",
    duration: 60,
    status: "confirmed",
    rating: null,
  },
]

export default function ChamadaPage() {
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [notes, setNotes] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(0)

  const currentPlan = PLAN_CONFIG[USER_PLAN]
  const hasAccess = currentPlan.level >= 3 // Diamond required

  // Gerar datas da semana atual
  const getWeekDates = (weekOffset = 0) => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + weekOffset * 7)

    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = getWeekDates(currentWeek)

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    })
  }

  const handleBooking = () => {
    if (!selectedDuration || !selectedDate || !selectedTime) return

    setShowConfirmation(true)
  }

  const confirmBooking = () => {
    // Aqui seria a integração com Stripe/Hotmart
    console.log("Booking confirmed:", {
      duration: selectedDuration,
      date: selectedDate,
      time: selectedTime,
      notes,
    })
    setShowConfirmation(false)
    // Redirect to payment
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-600"
      case "confirmed":
        return "bg-blue-600"
      case "pending":
        return "bg-yellow-600"
      default:
        return "bg-zinc-600"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Concluída"
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
        {/* Header */}
        <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Videochamada Exclusiva</h1>
                <p className="text-zinc-400 text-sm">Acesso restrito ao plano Diamante</p>
              </div>
            </div>
          </div>
        </header>

        {/* Access Denied */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-2xl p-12 max-w-md mx-auto">
              <div className="bg-zinc-700/50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Lock className="h-12 w-12 text-zinc-300" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">Recurso Exclusivo</h2>
              <p className="text-zinc-300 mb-2">
                Este recurso é exclusivo para assinantes do plano <strong>Diamante 💎</strong>
              </p>
              <p className="text-zinc-400 text-sm mb-8">
                Faça upgrade e tenha acesso a videochamadas privadas de até 60 minutos
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold w-full"
              >
                Fazer Upgrade Agora - R$99,90/mês
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Agendar Videochamada Exclusiva</h1>
                <p className="text-zinc-400 text-sm">Você pode agendar uma chamada de até 60 minutos com a modelo</p>
              </div>
            </div>

            <Badge className="bg-blue-600 text-white">
              <Diamond className="h-4 w-4 mr-1" />
              Plano {currentPlan.name}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Duration Selection */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-teal-400" />
                Escolha a Duração
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DURATION_OPTIONS.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDuration(option)}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedDuration?.id === option.id ? "ring-2 ring-teal-400" : ""
                    }`}
                  >
                    <Card
                      className={`bg-zinc-800/50 border-zinc-700 hover:border-teal-500/50 transition-all duration-300 ${
                        selectedDuration?.id === option.id ? "border-teal-400 bg-teal-500/10" : ""
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-lg">{option.title}</CardTitle>
                          {option.popular && <Badge className="bg-rose-600 text-white text-xs">Popular</Badge>}
                        </div>
                        <p className="text-zinc-400 text-sm">{option.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-teal-400">
                            <Clock className="h-5 w-5" />
                            <span className="font-medium">{option.duration} min</span>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-white">
                              R${option.price.toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                        </div>

                        <Button
                          className={`w-full ${
                            selectedDuration?.id === option.id
                              ? "bg-teal-500 hover:bg-teal-600"
                              : "bg-zinc-700 hover:bg-zinc-600"
                          } text-white transition-all duration-300`}
                        >
                          {selectedDuration?.id === option.id ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Selecionado
                            </>
                          ) : (
                            "Selecionar"
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Date and Time Selection */}
            {selectedDuration && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-teal-400" />
                  Escolha Data e Horário
                </h2>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                    disabled={currentWeek === 0}
                    className="text-zinc-400 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <h3 className="text-lg font-medium text-white">
                    {weekDates[0].toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                  </h3>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentWeek(currentWeek + 1)}
                    disabled={currentWeek >= 2}
                    className="text-zinc-400 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weekDates.map((date) => {
                    const dateStr = formatDate(date)
                    const slots = AVAILABLE_SLOTS[dateStr] || []
                    const isSelected = selectedDate === dateStr
                    const isPast = date < new Date()

                    return (
                      <motion.button
                        key={dateStr}
                        whileHover={!isPast && slots.length > 0 ? { scale: 1.05 } : {}}
                        whileTap={!isPast && slots.length > 0 ? { scale: 0.95 } : {}}
                        onClick={() => {
                          if (!isPast && slots.length > 0) {
                            setSelectedDate(dateStr)
                            setSelectedTime(null)
                          }
                        }}
                        disabled={isPast || slots.length === 0}
                        className={`p-3 rounded-lg text-center transition-all duration-300 ${
                          isPast || slots.length === 0
                            ? "bg-zinc-800/30 text-zinc-600 cursor-not-allowed"
                            : isSelected
                              ? "bg-teal-500 text-white"
                              : "bg-zinc-800/50 text-white hover:bg-zinc-700"
                        }`}
                      >
                        <div className="text-sm font-medium">{formatDisplayDate(date)}</div>
                        <div className="text-xs mt-1">
                          {slots.length > 0 ? `${slots.length} slots` : "Indisponível"}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && AVAILABLE_SLOTS[selectedDate] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-lg font-medium text-white mb-4">Horários Disponíveis</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {AVAILABLE_SLOTS[selectedDate].map((time) => (
                        <Button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`${
                            selectedTime === time ? "bg-teal-500 hover:bg-teal-600" : "bg-zinc-700 hover:bg-zinc-600"
                          } text-white transition-all duration-300`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.section>
            )}

            {/* Notes Section */}
            {selectedTime && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-teal-400" />
                  Observações (Opcional)
                </h2>

                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardContent className="p-6">
                    <Label htmlFor="notes" className="text-white mb-2 block">
                      Deixe uma mensagem para Isabelle
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Conte o que você gostaria de conversar ou qualquer preferência especial..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="bg-zinc-700/50 border-zinc-600 text-white placeholder:text-zinc-400 min-h-[100px] resize-none"
                      maxLength={500}
                    />
                    <p className="text-zinc-400 text-xs mt-2">{notes.length}/500 caracteres</p>
                  </CardContent>
                </Card>
              </motion.section>
            )}

            {/* Book Button */}
            {selectedDuration && selectedDate && selectedTime && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Button
                  size="lg"
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-bold py-4 text-lg"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Agendar Minha Chamada 🔥
                </Button>

                <p className="text-zinc-400 text-sm text-center mt-4">
                  As chamadas são gravadas apenas com autorização. Seja respeitoso e aproveite a experiência.
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Model Info */}
            <Card className="bg-zinc-800/50 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image src="/images/profile-avatar.jpg" alt="Isabelle Lua" fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Isabelle Lua</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-zinc-400 text-sm ml-2">(4.9)</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm">
                  Oi amor! Estou ansiosa para nossa conversa privada. Vamos ter um momento especial só nosso 💋
                </p>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedDuration && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="bg-zinc-800/50 border-zinc-700">
                  <CardHeader>
                    <CardTitle className="text-white">Resumo do Agendamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Duração:</span>
                      <span className="text-white">{selectedDuration.duration} minutos</span>
                    </div>

                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Data:</span>
                        <span className="text-white">{new Date(selectedDate).toLocaleDateString("pt-BR")}</span>
                      </div>
                    )}

                    {selectedTime && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Horário:</span>
                        <span className="text-white">{selectedTime}</span>
                      </div>
                    )}

                    <div className="border-t border-zinc-700 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total:</span>
                        <span className="text-teal-400">R${selectedDuration.price.toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Call History */}
            {CALL_HISTORY.length > 0 && (
              <Card className="bg-zinc-800/50 border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Chamadas Anteriores</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {CALL_HISTORY.map((call) => (
                    <div key={call.id} className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg">
                      <div>
                        <p className="text-white text-sm font-medium">
                          {new Date(call.date).toLocaleDateString("pt-BR")} - {call.time}
                        </p>
                        <p className="text-zinc-400 text-xs">{call.duration} minutos</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(call.status)} text-white text-xs`}>
                          {getStatusText(call.status)}
                        </Badge>
                        {call.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(call.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Video className="h-5 w-5 text-teal-400" />
              Confirmar Agendamento
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-zinc-800/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Duração:</span>
                <span className="text-white">{selectedDuration?.duration} minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Data:</span>
                <span className="text-white">{selectedDate && new Date(selectedDate).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Horário:</span>
                <span className="text-white">{selectedTime}</span>
              </div>
              <div className="border-t border-zinc-700 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-teal-400">R${selectedDuration?.price.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </div>

            {notes && (
              <div className="bg-zinc-800/50 p-4 rounded-lg">
                <p className="text-zinc-400 text-sm mb-2">Sua mensagem:</p>
                <p className="text-white text-sm">{notes}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={confirmBooking}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium"
              >
                Confirmar e Pagar
              </Button>

              <Button
                variant="ghost"
                onClick={() => setShowConfirmation(false)}
                className="w-full text-zinc-400 hover:text-white"
              >
                Voltar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
