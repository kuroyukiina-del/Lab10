import Image from "next/image";

// ✨ TypeScript: กำหนด interface ให้ข้อมูลวิชา
interface Course {
  id: string;
  name: string;
  credits: number;
}

const courses: Course[] = [
  { id: "0214321", name: "Web App Design & Dev", credits: 3 },
  { id: "0214101", name: "Programming Fundamentals", credits: 3 },
  { id: "0214201", name: "Data Structures", credits: 3 },
];

export default function Courses() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100">
      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

          <div>
            <span className="inline-block bg-sky-200 text-sky-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              📚 My Courses
            </span>

            <h1 className="text-5xl font-extrabold text-sky-900 leading-tight">
              รายวิชาของฉัน
            </h1>

            <p className="mt-4 text-slate-600 text-lg">
              รายวิชาที่ลงทะเบียนในภาคการศึกษานี้
            </p>
          </div>

          {/* Chibi Character */}
          <div className="relative w-[260px] h-[260px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="/image/animeted.gif"
              alt="Chibi"
              width={260}
              height={260}
              className="w-full h-full object-cover hover:scale-110 transition duration-300"
              priority
            />
          </div>
        </div>

        {/* Card List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((c) => (
            <div
              key={c.id}
              className="
              group
              rounded-3xl
              bg-white/80
              backdrop-blur-md
              border border-sky-100
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-sky-300 to-cyan-300"></div>

              <div className="p-6">

                <div className="flex items-center justify-between mb-4">

                  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center text-3xl">
                    📘
                  </div>

                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {c.credits} Credits
                  </span>

                </div>

                <h2 className="text-xl font-bold text-sky-900 mb-2">
                  {c.id}
                </h2>

                <p className="text-slate-600 mb-5">
                  {c.name}
                </p>

                <button
                  className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-sky-400
                  to-cyan-400
                  text-white
                  py-2
                  font-semibold
                  hover:from-sky-500
                  hover:to-cyan-500
                  transition"
                >
                  ดูรายละเอียด →
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </main>
  );
}