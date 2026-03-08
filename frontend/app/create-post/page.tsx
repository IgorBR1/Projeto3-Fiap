'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/dist/client/link";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

async function handleCreatePost(e: React.FormEvent) {
  e.preventDefault();
    try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("Usuário não autenticado");
            return;
          }
        const response = await api.post("/posts", {
            title,
            content,
        });

        router.push("/dashboard");
    }  
    catch (error: any) {
        alert(error.response?.data?.message || "Erro ao criar post");
    }


}

return (
    <div className= "flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form onSubmit={handleCreatePost} className="flex flex-col items-center gap-4 rounded bg-mauve-800 p-8 shadow-md">)
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Criar Post</h2>
      <input 
      value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-2 py-2 mb-2 " type="text" placeholder="Título" />
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded px-2 py-2 mb-2 " placeholder="Conteúdo" />
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-100"   >Criar</button>
        </form>
    </div>
)

}