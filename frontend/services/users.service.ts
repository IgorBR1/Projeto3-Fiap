import { fetchApi } from "./api"
import type { User } from "@/types/User"

export const usersService = {
  async getAll(): Promise<User[]> {
    return fetchApi("/users")
  },

  async getById(id: string): Promise<User> {
    return fetchApi(`/users/${id}`)
  },

  async update(id: string, data: Partial<User>) {
    return fetchApi(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  async delete(id: string) {
    return fetchApi(`/users/${id}`, {
      method: "DELETE",
    })
  },
}
