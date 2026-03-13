'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface User {
  name: string;
  role: string;
}

export default function Home() {
    const [user, setUser] = useState<User | null>(null)

      const router = useRouter()
    
      function loadUser() {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)
        }
      }
    
      useEffect(() => {
        loadUser()
    
        window.addEventListener("storage", loadUser)
    
        return () => {
          window.removeEventListener("storage", loadUser)
        }
      }, [])
    
  
  return (
    <div className="flex min-h-[calc(100vh-73px)] flex-col bg-zinc-50 font-sans dark:bg-zinc-950">

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">

        <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span>
          Ambiente Acadêmico Digital
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
          Aprenda e compartilhe conhecimento
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Uma plataforma dedicada para professores e estudantes trocarem artigos, materiais de estudo e vivências acadêmicas de forma simples e direta.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-x-6 gap-y-4 sm:flex-row">
          <Link
            href="/posts"
            className="w-full sm:w-auto rounded-lg bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Explorar Todos os Posts
          </Link>


      {user ? (
        <div className="flex items-center gap-4">

                    {user.role === "USER" && (

                  <Link
            href="/create-post"
            className="text-base font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:hover:text-indigo-400"
          >
            Comece a escrever <span aria-hidden="true">→</span>
          </Link>
                    )}


          {user.role === "ADMIN" && (
    <Link
            href="/admin"
            className="text-base font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:hover:text-indigo-400"
          >
            Admin <span aria-hidden="true">→</span>
          </Link>
)}


        </div>
      ) : (
        <div className="flex gap-4">

<Link
            href="/register"
            className="text-base font-semibold leading-6 text-zinc-900 hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:hover:text-indigo-400"
          >
            Crie uma conta para começar a criar posts <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

          
        </div>

      </main>
    </div>
  );
}