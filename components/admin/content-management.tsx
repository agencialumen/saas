// components/content-management.tsx

"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import Image from "next/image"

export default function ContentManagement() {
  const supabase = createClientComponentClient<Database>()
  const [conteudos, setConteudos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("conteudos")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Erro ao buscar conteúdos:", error)
      } else {
        setConteudos(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [supabase])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Gerenciamento de Conteúdos</h2>

      {loading ? (
        <p>Carregando conteúdos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {conteudos.map((conteudo) => (
            <div
              key={conteudo.id}
              className="border rounded-xl shadow p-4 flex flex-col gap-2"
            >
              <h3 className="text-lg font-semibold">{conteudo.titulo}</h3>
              <p className="text-sm text-gray-600">{conteudo.descricao}</p>
              {conteudo.url_arquivo && (
                <Image
                  src={conteudo.url_arquivo}
                  alt="Preview"
                  width={400}
                  height={300}
                  className="rounded-md object-cover"
                />
              )}
              <span className="text-xs text-gray-500">
                Visibilidade: {conteudo.visibilidade}
              </span>
              <span className="text-xs text-gray-500">
                Tipo: {conteudo.tipo}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}