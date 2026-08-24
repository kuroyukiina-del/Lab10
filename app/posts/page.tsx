import Link from 'next/link';
import type { Metadata } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const metadata: Metadata = {
  title: 'บทความทั้งหมด',
  description: 'รวมบทความทั้งหมดในบล็อก',
};

export default async function PostsPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10",
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("โหลดข้อมูลไม่สําเร็จ");
  const posts: Post[] = await res.json();
  return (
    <main className="p-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        📝 บทความทั้งหมด ({posts.length})
      </h1>
      <div className="space-y-4">
        {posts.map((post: Post) => (
          <article
            key={post.id}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <span className="text-xs text-gray-400 font-mono">#{post.id}</span>
            <h2 className="text-xl font-bold text-blue-800 mt-1 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {post.body.slice(0, 120)}...
            </p>
            <Link
              href={`/posts/${post.id}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              อ่านบทความและแสดงความคิดเห็น →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

