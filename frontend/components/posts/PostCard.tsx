import { Post } from "@/types/Post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}