'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  name: string;
  [key: string]: any;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white border-b border-zinc-200 shadow-sm backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 dark:border-zinc-800">
      <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-80">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold shadow-md">
          P
        </div>
        <h1 className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
          Post<span className="text-zinc-500 font-medium">List</span>
        </h1>
      </Link>

      {user ? (
        <div className="flex justify-end items-center gap-6">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Olá, <strong className="text-zinc-900 dark:text-zinc-100">{user.name}</strong>
          </span>

          <nav className="flex items-center gap-3">
            <Link
              className="text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors dark:text-zinc-400 dark:hover:text-indigo-400"
              href="/dashboard"
            >
              Dashboard
            </Link>

            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700"></div>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Sair
            </button>
          </nav>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 px-4 py-2 rounded-lg transition-all dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
            href="/login"
          >
            Entrar
          </Link>
          <Link
            className="text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
            href="/register"
          >
            Criar conta
          </Link>
        </div>
      )}
    </header>
  );
}
