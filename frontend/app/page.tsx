import Link from "next/dist/client/link";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <Link href="/posts" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Todos os Posts
        </Link>

       
      </div>
    </div>
  );
}
