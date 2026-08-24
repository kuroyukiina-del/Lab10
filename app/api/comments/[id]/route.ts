// app/api/comments/[id]/route.ts
import { cookies } from 'next/headers';
import { editComment, deleteComment } from '@/lib/commentService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PATCH /api/comments/:id
// L4: เฉพาะเจ้าของ comment เท่านั้น — คนอื่นได้ 403 ForbiddenError
export const PATCH = withErrorHandling(async (request: Request, { params }: RouteContext) => {
  const { id } = await params;

  // L4: อ่าน sessionUserId จาก cookie — ไม่รับจาก body
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get('session')?.value;

  if (!sessionUserId) {
    return Response.json({ error: 'กรุณาเข้าสู่ระบบก่อน' }, { status: 401 });
  }

  const body = await request.json();
  const updated = await editComment(id, body, sessionUserId);
  return Response.json({ ok: true, item: updated });
});

// DELETE /api/comments/:id
// L4: เฉพาะเจ้าของ comment เท่านั้น — คนอื่นได้ 403 ForbiddenError
export const DELETE = withErrorHandling(async (request: Request, { params }: RouteContext) => {
  const { id } = await params;

  // L4: อ่าน sessionUserId จาก cookie — ไม่รับจาก body
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get('session')?.value;

  if (!sessionUserId) {
    return Response.json({ error: 'กรุณาเข้าสู่ระบบก่อน' }, { status: 401 });
  }

  await deleteComment(id, sessionUserId);
  return Response.json({ ok: true, message: 'ลบ comment สำเร็จ' });
});
