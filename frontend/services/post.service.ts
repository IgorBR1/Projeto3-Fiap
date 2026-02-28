import { api } from "./api";



export async function getPosts() {
  const response = await api.get("/posts");
    console.log("RESPONSE:", response.data);

  return response.data;
}

export async function getPostById(id: string) {
  const response = await api.get(`/posts/${id}`);
  return response.data;
}