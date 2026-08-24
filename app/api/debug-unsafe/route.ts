// app/api/debug-unsafe/route.ts — ไฟล์ทดลองชั่วคราว (ลบทิ้งหลังทํา Task นี้เสร็จ)
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    const email = new URL(request.url).searchParams.get('email') ?? '';
    const rows = await prisma.$queryRawUnsafe(
        `SELECT * FROM "User" WHERE email = '${email}'`
    );
    return Response.json(rows);
}