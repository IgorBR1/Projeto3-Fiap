export const storage = {
  get<T = unknown>(key: string): T | null {
    if (typeof window === "undefined") return null

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) as T : null
    } catch {
      return null
    }
  },

  set(key: string, value: unknown) {
    if (typeof window === "undefined") return
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string) {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(key)
  },
}