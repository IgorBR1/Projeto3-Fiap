import { api } from "./api";
import { storage } from "@/utils/storage";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}
class AuthService {
  async login(data: LoginData) {
    const response = await api.post<LoginResponse>("/login", data);

    const { token } = response.data;

    storage.set("token", token);

    return token;
  }

  async register(data: LoginData) {
    await api.post("/users", data);
  }

  logout() {
    storage.remove("token");
  }
}

export const authService = new AuthService();