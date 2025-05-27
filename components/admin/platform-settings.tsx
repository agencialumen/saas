"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Settings, DollarSign, MessageSquare, Link } from "lucide-react"

export function PlatformSettings() {
  const [settings, setSettings] = useState({
    // Pricing
    basicPrice: "19.90",
    premiumPrice: "39.90",
    diamantePrice: "59.90",

    // Messages
    welcomeMessage: "Bem-vindo(a) ao meu mundo exclusivo! ❤️",
    thankYouMessage: "Obrigada pelo carinho, amor! Você é incrível! 💕",

    // Platform Info
    platformName: "Isabelle Lua VIP",
    modelBio: "Criadora de conteúdo sensual e exclusivo. Aqui você encontra meu lado mais íntimo e especial.",

    // Payment
    pixKey: "isabelle.lua@email.com",
    stripeKey: "",

    // Social
    instagramUrl: "https://instagram.com/belinha.ofc",
    twitterUrl: "https://twitter.com/belinha.ofc",

    // Features
    enableChat: true,
    enableGifts: true,
    enableCalls: true,
    enableCustomRequests: true,
  })

  const handleSave = (section: string) => {
    console.log(`Salvando configurações de ${section}:`, settings)
    // Here would be the API call to save settings
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configurações da Plataforma</h1>
        <p className="text-gray-400">Gerencie valores, textos e configurações gerais</p>
      </div>

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="pricing" className="data-[state=active]:bg-rose-600">
            <DollarSign className="h-4 w-4 mr-2" />
            Preços
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-rose-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Mensagens
          </TabsTrigger>
          <TabsTrigger value="platform" className="data-[state=active]:bg-rose-600">
            <Settings className="h-4 w-4 mr-2" />
            Plataforma
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-rose-600">
            <Link className="h-4 w-4 mr-2" />
            Pagamentos
          </TabsTrigger>
        </TabsList>

        {/* Pricing Settings */}
        <TabsContent value="pricing">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configurações de Preços</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="basic-price" className="text-gray-300">
                    Plano Básico (R$)
                  </Label>
                  <Input
                    id="basic-price"
                    value={settings.basicPrice}
                    onChange={(e) => setSettings({ ...settings, basicPrice: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="19.90"
                  />
                  <p className="text-gray-500 text-sm">Preço mensal do plano básico</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="premium-price" className="text-gray-300">
                    Plano Premium (R$)
                  </Label>
                  <Input
                    id="premium-price"
                    value={settings.premiumPrice}
                    onChange={(e) => setSettings({ ...settings, premiumPrice: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="39.90"
                  />
                  <p className="text-gray-500 text-sm">Preço mensal do plano premium</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diamante-price" className="text-gray-300">
                    Plano Diamante (R$)
                  </Label>
                  <Input
                    id="diamante-price"
                    value={settings.diamantePrice}
                    onChange={(e) => setSettings({ ...settings, diamantePrice: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="59.90"
                  />
                  <p className="text-gray-500 text-sm">Preço mensal do plano diamante</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Preços de Serviços Adicionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Chamada 15min (R$)</Label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="60.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Chamada 30min (R$)</Label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="120.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Vídeo Personalizado (R$)</Label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="150.00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Foto Personalizada (R$)</Label>
                    <Input className="bg-gray-800 border-gray-700 text-white" placeholder="80.00" />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("pricing")} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar Preços
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Settings */}
        <TabsContent value="messages">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Mensagens Padrão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="welcome-message" className="text-gray-300">
                  Mensagem de Boas-vindas
                </Label>
                <Textarea
                  id="welcome-message"
                  value={settings.welcomeMessage}
                  onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="Mensagem enviada para novos assinantes..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thank-you-message" className="text-gray-300">
                  Mensagem de Agradecimento por Mimo
                </Label>
                <Textarea
                  id="thank-you-message"
                  value={settings.thankYouMessage}
                  onChange={(e) => setSettings({ ...settings, thankYouMessage: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="Mensagem enviada quando receber um mimo..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Mensagem para Pedidos Personalizados</Label>
                <Textarea
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="Obrigada pelo pedido, amor! Vou produzir com muito carinho para você ❤️"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Mensagem de Confirmação de Chamada</Label>
                <Textarea
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  placeholder="Sua chamada foi confirmada! Mal posso esperar para conversar com você 💕"
                />
              </div>

              <Button onClick={() => handleSave("messages")} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar Mensagens
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings */}
        <TabsContent value="platform">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Informações da Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-name" className="text-gray-300">
                  Nome da Plataforma
                </Label>
                <Input
                  id="platform-name"
                  value={settings.platformName}
                  onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model-bio" className="text-gray-300">
                  Bio da Modelo
                </Label>
                <Textarea
                  id="model-bio"
                  value={settings.modelBio}
                  onChange={(e) => setSettings({ ...settings, modelBio: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Redes Sociais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Instagram URL</Label>
                    <Input
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Twitter URL</Label>
                    <Input
                      value={settings.twitterUrl}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Funcionalidades Ativas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Chat Privado</Label>
                      <p className="text-gray-500 text-sm">Permite conversas diretas com clientes</p>
                    </div>
                    <Switch
                      checked={settings.enableChat}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableChat: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Recebimento de Mimos</Label>
                      <p className="text-gray-500 text-sm">Permite receber presentes dos clientes</p>
                    </div>
                    <Switch
                      checked={settings.enableGifts}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableGifts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Chamadas de Vídeo</Label>
                      <p className="text-gray-500 text-sm">Permite agendamento de videochamadas</p>
                    </div>
                    <Switch
                      checked={settings.enableCalls}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableCalls: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Pedidos Personalizados</Label>
                      <p className="text-gray-500 text-sm">Permite solicitações de conteúdo personalizado</p>
                    </div>
                    <Switch
                      checked={settings.enableCustomRequests}
                      onCheckedChange={(checked) => setSettings({ ...settings, enableCustomRequests: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("platform")} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Configurações de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-medium">PIX</h3>
                <div className="space-y-2">
                  <Label htmlFor="pix-key" className="text-gray-300">
                    Chave PIX
                  </Label>
                  <Input
                    id="pix-key"
                    value={settings.pixKey}
                    onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="E-mail, telefone ou chave aleatória"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Stripe</h3>
                <div className="space-y-2">
                  <Label htmlFor="stripe-key" className="text-gray-300">
                    Chave Pública do Stripe
                  </Label>
                  <Input
                    id="stripe-key"
                    value={settings.stripeKey}
                    onChange={(e) => setSettings({ ...settings, stripeKey: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="pk_live_..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Chave Secreta do Stripe</Label>
                  <Input type="password" className="bg-gray-800 border-gray-700 text-white" placeholder="sk_live_..." />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Links de Pagamento</h3>
                <div className="space-y-2">
                  <Label className="text-gray-300">Link Plano Básico</Label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://checkout.stripe.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Link Plano Premium</Label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://checkout.stripe.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Link Plano Diamante</Label>
                  <Input
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://checkout.stripe.com/..."
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("payment")} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações de Pagamento
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
