'use client'

import Link from "next/link"

export default function AdminPage() {

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6 justify-center items-center flex">
        Admin Dashboard
      </h1>


        <Link href="/admin/posts" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all justify-center items-center flex">
            Gerenciar Posts
        </Link>



    
    </div>
  )
}