'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Post } from "@/types/Post"
import Link from "next/link";

export default function AdminPostsPage() {

  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()

  async function getPosts() {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    const res = await fetch("http://localhost:3001/api/admin/posts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) {
      alert("Acesso negado")
      router.push("/")
      return
    }
    const data = await res.json()
    setPosts(data)
  }

  async function deletePost(id: number) {

    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:3001/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (res.ok) {
      setPosts(posts.filter(post => Number(post.id) !== id))
    } else {
      alert("Erro ao deletar post")
    }
  }

  useEffect(() => {

    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    const user = JSON.parse(storedUser)

    if (user.role !== "ADMIN") {
      router.push("/")
      return
    }

    getPosts()

  }, [])

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Todos os Posts
      </h1>

      {posts.length === 0 && (
        <p>Nenhum post encontrado.</p>
      )}

      {posts.map(post => (
        <div>
  <article className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800">
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {post.author?.name ? `Autor: ${post.author.name}` : "Autor desconhecido"}
          </span>
        </div>
        <div className="group relative mt-3">
          <h3 className="text-xl font-semibold leading-6 text-zinc-900 group-hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:group-hover:text-indigo-400">
            <Link href={`/posts/${post.id}/edit`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.content}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Ler artigo completo <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </article>
          <button
            onClick={() => deletePost(Number(post.id))}
                className={`inline-flex items-center rounded-lg bg-red-50(text-red-700 px-4 py-2 text-sm font-medium hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:focus:ring-offset-zinc-900 border border-transparent ${
                  false ? 'opacity-50 cursor-not-allowed' : ''                }`}
              >
            Deletar
          </button>

        </div>

      ))}

    </div>
  )
}