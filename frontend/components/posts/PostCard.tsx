import { Post } from "@/types/Post";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800">
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {post.author?.name ? `Autor: ${post.author.name}` : "Autor desconhecido"}
          </span>
        </div>
        <div className="group relative mt-3">
          <h3 className="text-xl font-semibold leading-6 text-zinc-900 group-hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:group-hover:text-indigo-400">
            <Link href={`/posts/${post.id}`}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.content}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Ler artigo completo <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </article>
  );
}
