"use client"

import { createContext, useState, type ReactNode } from "react"
import type { User } from "@/types/User"

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  async function login(email: string, password: string) {
    // Implementar lógica de login
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
