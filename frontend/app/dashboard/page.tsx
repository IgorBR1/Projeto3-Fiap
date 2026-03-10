'use client'

import { useEffect, useState } from "react";
import { getPostById } from "@/services/post.service";
import { Post } from "@/types/Post";
import Link from "next/dist/client/link";
import PostList from "@/components/posts/PostList";
interface User {
  name: string;
  [key: string]: any;
}


export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
useEffect(() => {
  async function fetchPosts() {
    const userStorage = localStorage.getItem("user");

    if (!userStorage) {
      console.log("Usuário não encontrado");
      return;
    }

        const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const user = JSON.parse(userStorage);

    const response = await fetch(
      `http://localhost:3001/api/posts/author/${user.id}`
    );

  console.log("Usuário parseado:", user);
  console.log("ID do usuário:", user?.id);
    const data = await response.json();
    setPosts(data);
  }

  fetchPosts();
}, []);
  return (
    <div className="min-h-screen p-8 bg-zinc-50 dark:bg-black">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Meus Posts
      </h1>
      <h2>Bem vindo, {user?.name}!</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhum post encontrado.</p>
      ) : (
        /*<ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 bg-white dark:bg-zinc-800 rounded shadow"
            >
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-500">{post.content}</p>
              <p className="text-xs text-gray-400">Autor: {post.author?.name}</p>
                    <p>Autor:{post.authorId ?? "No author ID"}</p>
                 <p>{`Criado por: ${post.author?.name ?? "Sem autor"}`}</p>
              <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline border border-blue-500 px-2 py-1 rounded mt-2 inline-block">
                Ver Detalhes
              </Link>
            </li>
          ))}
        </ul>
        */
          <PostList posts={posts} />
       
      )}
                   

       <Link href="/create-post" className="bg-green-500 text-white px-4 py-2 rounded">
          Criar Post
        </Link>
        
    </div>
  );
}