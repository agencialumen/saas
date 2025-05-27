"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, Lock, Mail, Shield, CheckCircle, Heart } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

type FormData = {
  email: string
  password: string
}

type Errors = {
  email?: string
  password?: string
  general?: string
}

type SuccessMessage = {
  type: "signup" | "login"
  message: string
}

const AuthenticationPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<SuccessMessage | null>(null)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Errors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: Errors = {}

    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const showSuccessAndRedirect = (type: "signup" | "login") => {
    const messages = {
      signup: "Conta criada com sucesso! 🔥 Agora faça login para acessar o conteúdo exclusivo",
      login: "Bem-vinda de volta, safadinha! 😈 Preparando seu acesso...",
    }

    setSuccessMessage({ type, message: messages[type] })

    if (type === "signup") {
      // Para signup: mostrar mensagem por 3s e mudar para login
      setTimeout(() => {
        setSuccessMessage(null)
        setActiveTab("login")
        setFormData({ email: formData.email, password: "" }) // Manter email, limpar senha
      }, 3000)
    } else {
      // Para login: mostrar mensagem por 2s e redirecionar
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      if (activeTab === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          console.error("Erro no login:", error)
          setErrors({ general: "Email ou senha incorretos. Tente novamente!" })
        } else {
          console.log("Login bem-sucedido:", data)
          showSuccessAndRedirect("login")
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          console.error("Erro no cadastro:", error)
          setErrors({ general: error.message })
        } else {
          console.log("Cadastro bem-sucedido:", data)
          showSuccessAndRedirect("signup")
        }
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      setErrors({ general: "Ops! Algo deu errado. Tente novamente em alguns segundos." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (tab: "login" | "register") => {
    if (!isLoading && !successMessage) {
      setActiveTab(tab)
      setErrors({})
      setFormData({ email: "", password: "" })
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Overlay Effects */}
      <div className="absolute inset-0">
        {/* Red gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/20 via-transparent to-red-800/10" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-red-500/8 rounded-full blur-2xl" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-8">
        <div className="w-full max-w-sm mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600/20 border border-red-600/30 rounded-xl mb-6">
              <Shield className="w-6 h-6 text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              {activeTab === "login" ? "Acesso Privado" : "Área Exclusiva"}
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed">
              {activeTab === "login"
                ? "Entre na sua conta e acesse conteúdos exclusivos criados especialmente para você"
                : "Crie sua conta e tenha acesso ilimitado ao conteúdo mais íntimo e personalizado"}
            </p>
          </motion.div>

          {/* Success Message Overlay */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              >
                <div className="bg-gray-900 border border-red-600/30 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4"
                  >
                    {successMessage.type === "signup" ? (
                      <CheckCircle className="w-8 h-8 text-red-400" />
                    ) : (
                      <Heart className="w-8 h-8 text-red-400" />
                    )}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-lg font-medium mb-2"
                  >
                    {successMessage.type === "signup" ? "Perfeito!" : "Oi, gostoso! 😈"}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {successMessage.message}
                  </motion.p>

                  {successMessage.type === "login" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4"
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 shadow-2xl"
          >
            {/* Tab Switcher */}
            <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
              <button
                onClick={() => handleTabChange("login")}
                disabled={isLoading || !!successMessage}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50",
                  activeTab === "login"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-gray-400 hover:text-white",
                )}
              >
                Entrar
              </button>
              <button
                onClick={() => handleTabChange("register")}
                disabled={isLoading || !!successMessage}
                className={cn(
                  "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50",
                  activeTab === "register"
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                    : "text-gray-400 hover:text-white",
                )}
              >
                Cadastrar
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading || !!successMessage}
                    className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:ring-red-500/20 h-12 rounded-xl disabled:opacity-50"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading || !!successMessage}
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-red-500/50 focus:ring-red-500/20 h-12 rounded-xl disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading || !!successMessage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Error Display */}
              <AnimatePresence>
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-red-900/20 border border-red-800/30 rounded-xl"
                  >
                    <p className="text-red-300 text-sm text-center">{errors.general}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !!successMessage}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-12 rounded-xl shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {activeTab === "login" ? "Entrando..." : "Criando conta..."}
                  </>
                ) : activeTab === "login" ? (
                  "Acessar Conteúdo"
                ) : (
                  "Criar Acesso VIP"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                {activeTab === "login" ? (
                  <>
                    Ainda não tem acesso?{" "}
                    <button
                      onClick={() => handleTabChange("register")}
                      disabled={isLoading || !!successMessage}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                    >
                      Cadastre-se agora
                    </button>
                  </>
                ) : (
                  <>
                    Já tem uma conta?{" "}
                    <button
                      onClick={() => handleTabChange("login")}
                      disabled={isLoading || !!successMessage}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
                    >
                      Fazer login
                    </button>
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Bottom Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 text-xs leading-relaxed">
              🔒 Conteúdo exclusivo para maiores de 18 anos
              <br />
              Seus dados estão protegidos e criptografados
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPage
