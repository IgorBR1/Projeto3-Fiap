'use client'

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Post } from "@/types/Post";
import Link from "next/link";
import PostList from "@/components/posts/PostList";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) {
          return;
        }

        const parsedUser = JSON.parse(userStorage);
        setUser(parsedUser);

        const response = await api.get(`/posts/author/${parsedUser.id}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 font-sans dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Meu Painel
            </h1>
            {user && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Bem-vindo(a) de volta, <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.name}</span>. Gerencie seus conteúdos acadêmicos.
              </p>
            )}
          </div>
          <Link
            href="/create-post"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-zinc-900"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo Post
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <svg className="mx-auto h-12 w-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">Nenhum post publicado</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Comece a compartilhar suas ideias, artigos e conhecimentos com a comunidade.
            </p>
            <div className="mt-6">
              <Link
                href="/create-post"
                className="inline-flex items-center rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50"
              >
                Criar seu primeiro post
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <PostList posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}