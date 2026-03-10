'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/dist/client/link"

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
}

interface User {
  id: string
  name: string
}

export default function PostPage() {

  const params = useParams()
  const id = params.id as string

  const router = useRouter()

  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {

    async function fetchPost() {

      const res = await fetch(`http://localhost:3001/api/posts/${id}`)
      const data = await res.json()

      setPost(data)
    }

    fetchPost()

    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [id])


  async function deletePost() {

    if (!post) return

    const res = await fetch(`http://localhost:3001/api/posts/${post.id}`, {
      method: "DELETE"
    })

    if (res.ok) {
      alert("Post deletado")
      router.push("/posts")
    } else {
      alert("Erro ao deletar post")
    }

  }


  if (!post) {
    return <p>Carregando...</p>
  }


  async function editPost() {

    if (!post) return
    const res = await fetch(`http://localhost:3001/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content
      })
    })
  }


  return (

    <div className="min-h-screen p-8">

      <div className="border p-4">

        <h1 className="text-2xl font-bold mb-4">
          {post.title}
        </h1>

        <p className="mb-4">
          {post.content}
        </p>

        <p className="text-sm text-gray-400">
          Criado por: {post.author?.name ?? "Sem autor"}
        </p>

        {user?.id === post.authorId && (
          <button
            onClick={deletePost}
            className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Deletar
          </button>
        )}

        {user?.id === post.authorId && (
        <Link href={`/posts/${post.id}/edit`} className="ml-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Editar
        </Link>
        
        )}
      </div>

    </div>

  )
}