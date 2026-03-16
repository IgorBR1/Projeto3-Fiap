'use client'

import { useState } from "react"
import PostList from "./PostList"

export default function SearchPosts() {
  const [query, setQuery] = useState("")
  const [posts, setPosts] = useState([])

  async function searchPosts() {
    const res = await fetch(`http://localhost:3001/api/posts/search?q=${query}`)
    const data = await res.json()
    if (!res.ok) {
      alert("Erro ao buscar posts: " + data.error)
      return
    }


    setPosts(data)
  }

  return (
    <div>
      <input className="border border-gray-300 rounded px-4 py-2 mr-2"
        type="text"
        placeholder="Buscar posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={searchPosts} className="bg-blue-500 text-white px-4 py-2 rounded">
        Buscar
      </button>

      <div>
        <PostList posts={posts} />
      </div>
    </div>
  )
}
