'use client'

import { useEffect, useState } from "react";
import { getPosts } from "@/services/post.service";
import PostList from "@/components/posts/PostList";
import { Post } from "@/types/Post";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os artigos acadêmicos.");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Mural Acadêmico
            </h2>
            <p className="mt-2 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Explore os materiais, artigos e publicações dos professores e estudantes da plataforma.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-zinc-200 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-300 transition-all dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            &larr; Voltar ao Início
          </Link>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <span className="flex h-4 w-4 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="ml-4 text-zinc-500 font-medium">Buscando publicações...</span>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-950/30 dark:border-red-900/50">
              <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
              <p className="text-zinc-500 dark:text-zinc-400 text-lg">Nenhum artigo publicado ainda.</p>
              <Link href="/create-post" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium">
                Seja o primeiro a compartilhar conhecimento!
              </Link>
            </div>
          )}

          {!loading && posts.length > 0 && <PostList posts={posts} />}
        </div>
      </div>
    </div>
  );
}