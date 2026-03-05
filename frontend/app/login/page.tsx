'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Link from "next/dist/client/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/dashboard");

    } catch (error: any) {
      alert(error.response?.data?.message || "Erro ao logar");
    }
  }

  return (
    <div className= "flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 rounded bg-mauve-800 p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Login</h2>
      <input 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-300 rounded px-2 py-2 mb-2 " type="email" placeholder="Email" />
      <input 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border border-gray-300 rounded px-2 py-2 mb-2 " type="password" placeholder="Password" />
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-100"   >Login</button>
      </form>
      <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Voltar</Link>
    </div>
  )
}
