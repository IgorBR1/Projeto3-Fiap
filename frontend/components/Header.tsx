'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/dist/client/link";
interface User {
  name: string;
  [key: string]: any;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

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
    <header className="flex justify-between items-center p-4 border-b bg-green-100">

      <Link href="/">
        <h1 className="font-bold text-xl bg-red-500">Post List</h1>
      </Link>

      {user ? (
        <div className="flex items-center gap-4">

          <span className="text-gray-700">
            Olá, <h1>{user.name}</h1>
          </span>

          <Link className="bg-red-500" href="/dashboard">
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>
      ) : (
        <div className="flex gap-4">

          <Link className="bg-green-500 text-white px-4 py-2 rounded" href="/login">
            Login
          </Link>

          <Link className="bg-blue-500 text-white px-4 py-2 rounded" href="/register">
            Registrar
          </Link>

        </div>
      )}

    </header>
  );


}