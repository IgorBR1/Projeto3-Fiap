import Link from "next/dist/client/link";

export default function LoginPage() {
  return (
    <div className= "flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
      <input className="border border-gray-300 rounded px-2 py-2 mb-2 " type="email" placeholder="Email" />
      <input className="border border-gray-300 rounded px-2 py-2 mb-2 " type="password" placeholder="Password" />
      <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"  >Login</button>
      <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Voltar</Link>
    </div>
  )
}
