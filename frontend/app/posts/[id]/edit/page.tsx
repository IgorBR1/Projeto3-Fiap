'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { api } from "@/services/api"
import Link from "next/link"

export default function EditPostPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`)
        setTitle(res.data.title)
        setContent(res.data.content)
      } catch (err: any) {
        setError(err.response?.data?.message || "Não foi possível carregar a publicação para edição.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [id])

  async function handleEditPost(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await api.put(`/posts/${id}`, {
        title,
        content
      })
      
      router.push(`/posts/${id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar as alterações da publicação.")
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8 font-sans dark:bg-zinc-950">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-10 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Editar Post
          </h2>
          <Link
            href={`/posts/${id}`}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Cancelar
          </Link>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Atualize as informações do seu artigo acadêmico.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleEditPost}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-950/30 dark:border-red-900/50">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                    Falha na operação
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5 rounded-md shadow-sm">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Título da Publicação
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="relative block w-full appearance-none rounded-lg border border-zinc-300 px-3 py-3 text-zinc-900 placeholder-zinc-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
                placeholder="Ex: Novos paradigmas em inteligência artificial"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Conteúdo
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="relative block w-full appearance-none rounded-lg border border-zinc-300 px-3 py-3 text-zinc-900 placeholder-zinc-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-base dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 resize-y"
                placeholder="Escreva os detalhes, fundamentos e conclusões sobre o tema..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href={`/posts/${id}`}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-4 py-2 rounded-lg transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Voltar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-zinc-900 ${
                (isSubmitting || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}