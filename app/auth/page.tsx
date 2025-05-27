"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
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

const AuthenticationPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const validateForm = (): boolean => {
    let isValid = true
    const newErrors: Errors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      if (activeTab === "login") {
        // Login com Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          console.error("Erro no login:", error)
          setErrors({ general: error.message })
        } else {
          console.log("Login bem-sucedido:", data)
          // Redirecionar para o dashboard após login bem-sucedido
          router.push("/dashboard")
        }
      } else {
        // Cadastro com Supabase
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          console.error("Erro no cadastro:", error)
          setErrors({ general: error.message })
        } else {
          console.log("Cadastro bem-sucedido:", data)
          // Aqui você pode mostrar uma mensagem de confirmação de email
        }
      }
    } catch (error) {
      console.error("Erro inesperado:", error)
      setErrors({ general: "Ocorreu um erro inesperado. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-zinc-900/80" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-6 w-6" />
          Acme Corp
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and helped me deliver stunning designs to my
              clients faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis · Designer</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold">{activeTab === "login" ? "Login" : "Create an account"}</h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === "login"
                ? "Enter your email and password to login"
                : "Enter your email and password to create an account"}
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
              </div>
              {/* Error Display */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <p className="text-red-400 text-sm text-center">{errors.general}</p>
                </motion.div>
              )}
              <button className={cn(buttonVariants(), "w-full")} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : activeTab === "login" ? (
                  "Login"
                ) : (
                  "Create account"
                )}
              </button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <button type="button" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {activeTab === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                  onClick={() => setActiveTab("register")}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                  onClick={() => setActiveTab("login")}
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPage
