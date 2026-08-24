// app/api/login/route.ts
import bcrypt from 'bcrypt';
import { findUserByEmail } from '@/lib/users';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return Response.json({ error: 'กรุณากรอกอีเมลและรหัสผ่าน' }, { status: 400 });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return Response.json({ error: 'อีเมล/รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return Response.json({ error: 'อีเมล/รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
  }

  const res = Response.json({ ok: true });
  const isProd = process.env.NODE_ENV === 'production';
  res.headers.set(
    'Set-Cookie',
    `session=${user.id}; Path=/; HttpOnly; SameSite=Strict${isProd ? '; Secure' : ''}`
  );
  return res;
}