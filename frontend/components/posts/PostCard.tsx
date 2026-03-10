import { Post } from "@/types/Post";
import Link from "next/dist/client/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    console.log(post);

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "15px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.authorId ?? "No author ID"}</p>
      <p>{`Criado por: ${post.author?.name ?? "Sem autor"}`}</p>
                    <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline border border-blue-500 px-2 py-1 rounded mt-2 inline-block">
                Ver Detalhes
              </Link>

    </div>
  );
}