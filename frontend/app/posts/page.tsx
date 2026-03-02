/*'use client'

import { useEffect, useState } from "react";
import { getPosts } from "@/services/post.service";
import PostList from "./PostList";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getPosts();
      setPosts(data);
    }

    load();
  }, []);

  return <PostList posts={posts} />;
}
*/



/* Versão anterior, sem usar o serviço:
'use client'

import { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3001/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar posts");
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>

      {error && <p>{error}</p>}

      {posts.length === 0 && <p>Nenhum post encontrado</p>}

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
*/

'use client'

import { useEffect, useState } from "react";
import { getPosts } from "@/services/post.service";
import PostList from "@/components/posts/PostList";
import { Post } from "@/types/Post";
import Link from "next/dist/client/link";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar posts");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-zinc-50 font-sans dark:bg-black p-4">
      <h1>Posts</h1>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {!loading && posts.length === 0 && <p>Nenhum post encontrado</p>}

      {!loading && posts.length > 0 && (
        <PostList posts={posts} />
      )}

              <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Voltar
        </Link>

    </div>
  );
}