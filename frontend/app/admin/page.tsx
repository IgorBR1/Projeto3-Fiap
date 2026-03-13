'use client'

import Link from "next/link"

export default function AdminPage() {

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-4">

        <Link href="/admin/posts">
          <button className="border p-3">
            Gerenciar Posts
          </button>
        </Link>



      </div>

    </div>
  )
}