'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditPostAdminPage() {
  const { id } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`http://localhost:3001/api/admin/posts/${id}`)
      const data = await res.json()

      setTitle(data.title)
      setContent(data.content)
    }

    fetchPost()
  }, [id])

  async function updatePost(e: React.FormEvent) {
    e.preventDefault()

    await fetch(`http://localhost:3001/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    })

    alert("Post atualizado!")
    router.push("/posts")
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Editar Post (Admin)</h1>

      <form onSubmit={updatePost} className="flex flex-col gap-4">
        <input
          className="border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
        />

        <textarea
          className="border p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Conteúdo"
        />

        <button className="bg-blue-600 text-white p-2">
          Atualizar Post
        </button>
      </form>
    </div>
  )
}
