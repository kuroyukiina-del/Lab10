// app/api/change-password/route.ts
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';
import { changePasswordSchema } from '@/lib/schemas';
import { findUserById, updateUserPassword } from '@/lib/users';

export async function POST(request: Request) {
  // ── L4 Authorization: อ่าน userId จาก session cookie เท่านั้น (ไม่รับจาก body) ──
  const cookieStore = await cookies();
  const userId = cookieStore.get('session')?.value;

  if (!userId) {
    return Response.json(
      { error: 'กรุณาเข้าสู่ระบบก่อน' },
      { status: 401 }
    );
  }

  // ── L4 Validation: ตรวจ input ด้วย Zod ก่อนทุกครั้ง ──
  let oldPassword: string;
  let newPassword: string;
  try {
    const body = await request.json();
    ({ oldPassword, newPassword } = changePasswordSchema.parse(body));
  } catch (err) {
    if (err instanceof ZodError) {
      return Response.json(
        { error: err.issues[0].message },
        { status: 400 }
      );
    }
    return Response.json({ error: 'ข้อมูลไม่ถูกต้อง' }, { status: 400 });
  }

  // ── L4 Authorization: ตรวจว่า userId ใน session มีอยู่จริงในฐานข้อมูล ──
  const user = await findUserById(userId);
  if (!user) {
    return Response.json(
      { error: 'ไม่พบผู้ใช้' },
      { status: 404 }
    );
  }

  // ── L1 Hashing: เปรียบเทียบ oldPassword กับ hash ที่เก็บไว้ด้วย bcrypt.compare ──
  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) {
    return Response.json(
      { error: 'รหัสผ่านเดิมไม่ถูกต้อง' },
      { status: 401 }
    );
  }

  // ── L1 Hashing: hash newPassword ด้วย bcrypt ก่อนบันทึก ──
  await updateUserPassword(userId, newPassword);

  return Response.json({ ok: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
}
