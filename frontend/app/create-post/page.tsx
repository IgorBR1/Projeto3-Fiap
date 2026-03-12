'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Sua sessão expirou. Faça login novamente.");
        setIsSubmitting(false);
        return;
      }

      await api.post("/posts", {
        title,
        content,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Ocorreu um erro ao publicar o seu post.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8 font-sans dark:bg-zinc-950">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-10 shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Criar Novo Post
          </h2>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Cancelar
          </Link>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Compartilhe um artigo, descoberta ou reflexão com a comunidade acadêmica.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleCreatePost}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-950/30 dark:border-red-900/50">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                    Não foi possível publicar
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
              href="/dashboard"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-4 py-2 rounded-lg transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Voltar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-zinc-900 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}