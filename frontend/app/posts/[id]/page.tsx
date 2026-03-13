'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { api } from "@/services/api"
import Link from "next/link"

interface Author {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  content: string
  authorId: string
  author?: Author
  createdAt?: string
}

interface User {
  id: string
  name: string
  email: string
}

export default function PostPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`)
        setPost(res.data)
      } catch (err: any) {
        setError(err.response?.data?.message || "Não foi possível carregar a publicação.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [id])

  async function deletePost() {
    if (!post) return
    
    const confirmDelete = window.confirm("Tem certeza que deseja apagar esta publicação?")
    if (!confirmDelete) return

    setIsDeleting(true)
    try {
      await api.delete(`/posts/${post.id}`)
      router.push("/dashboard")
    } catch (err: any) {
      alert(err.response?.data?.error || "Erro ao deletar publicação")
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center max-w-md dark:border-red-900/50 dark:bg-red-950/30">
          <svg className="mx-auto h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-2">Erro ao carregar</h3>
          <p className="text-red-700 dark:text-red-300 mb-6">{error || "Publicação não encontrada."}</p>
          <Link href="/posts" className="inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900">
            Voltar ao Mural
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-73px)] bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/posts" className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors dark:text-zinc-400 dark:hover:text-indigo-400">
            &larr; Voltar para o Mural
          </Link>
        </div>

        <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 sm:p-12 dark:bg-zinc-900 dark:ring-zinc-800">
          <header className="mb-8 border-b border-zinc-100 pb-8 dark:border-zinc-800">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-zinc-200">
                Por {post.author?.name ?? "Membro da Comunidade"}
              </span>
              {post.createdAt && (
                <>
                  <span className="mx-2">•</span>
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </>
              )}
            </div>
          </header>

          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {user?.id === post.authorId && (
            <footer className="mt-12 flex items-center justify-end gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <Link
                href={`/posts/${post.id}/edit`}
                className="inline-flex items-center rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
              >
                Editar Publicação
              </Link>
              <button
                onClick={deletePost}
                disabled={isDeleting}
                className={`inline-flex items-center rounded-lg bg-red-50(text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:focus:ring-offset-zinc-900 border border-transparent ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deletando...' : 'Excluir'}
              </button>
            </footer>
          )}
        </article>
      </div>
    </div>
  )
}