// app/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "หน้าแรก",
};
interface Post {
  id: number;
  title: string;
  body: string;
}
async function getRecentPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
    { cache: "no-store" },
  );
  return res.json();
}
export default async function Home() {
  const posts: Post[] = await getRecentPosts();
  return (
    <div>
      <main className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/image/background.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        {/* Card */}
        <div className="z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center max-w-lg w-[90%]">

          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/image/profile.jpg"
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="mt-8 text-5xl font-bold text-blue-900">
            สวัสดี! 👋
          </h1>

          <p className="mt-4 text-xl text-gray-600">
            บล็อกของ <strong>นายศุภกร ยางสมบูรณ์</strong> • นิสิตปี 3 CS
          </p>
          <p className="mt-4 text-xl text-gray-600">คติประจำใจ <strong>ทุกคนเก่งในแบบของตัวเอง</strong> </p>

          <Link
            href="/posts"
            className="inline-block mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg"
          >
            อ่านบทความ →
          </Link>

        </div>
      </main>

      <section className="max-w-6xl mx-auto py-12 px-5">
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/image/Idol.png"
              alt="Web"
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold">Yuika</h3>
              <p className="text-gray-600 mt-2">
                เป็นนักร้องและนักแต่งเพลง J-Pop ที่ชอบที่สุดเพราะเพลงน่ารักและเพราะมาก
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/image/game.jpg"
              alt="Web"
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold">Deadlock</h3>
              <p className="text-gray-600 mt-2">
                เป็นเกมที่ชอบที่สุดเพราะเป็นเกมที่แปลกใหม่เป็นเกม Moba ที่ผสมผสานกับเกมแนว FPS
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/image/1.jpg"
              alt="Web"
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold">Re:ZERO</h3>
              <p className="text-gray-600 mt-2">
                นิยายที่ผมชอบที่สุดเพราะเนื้อเรื่องที่ดีต่อใจและการพัฒนาของตัวละคร
              </p>
            </div>
          </div>

        </div>
      </section>




      <section className="max-w-6xl mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          บทความล่าสุด
        </h2>

        <div className="grid gap-4">
          {posts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300"
            >
              <h3 className="font-bold text-blue-800 mb-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {post.body.slice(0, 80)}...
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
