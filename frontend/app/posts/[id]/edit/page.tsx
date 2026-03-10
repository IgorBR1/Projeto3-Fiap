'use client'

import { use, useEffect, useState } from "react"
import { Post } from "@/types/Post"

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function getPost() {
    const res = await fetch(`http://localhost:3001/api/posts/${id}`)

    const data = await res.json()

    setTitle(data.title)
    setContent(data.content)
  }

  async function editPost(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content
      }),
    })

    if (res.ok) {
      alert("Post atualizado")
      window.location.href = `/posts/${id}`
    } else {
      alert("Erro ao atualizar post")
    }
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="min-h-screen p-8">

      <h1 className="text-2xl font-bold mb-4">
        Editar Post
      </h1>

      <form onSubmit={editPost} className="flex flex-col gap-4 max-w-md">

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />

        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2"
        >
          Salvar
        </button>

      </form>

    </div>
  )
}