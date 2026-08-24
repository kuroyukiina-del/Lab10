import { createMessage, listMessages, editMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';
import { cookies } from 'next/headers';

// helper อ่าน sessionUserId จาก cookie
async function getSessionUserId(request: Request): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get('userId')?.value ?? '';
}

type Ctx = { params: { id: string } };

export const dynamic = 'force-dynamic';

export const GET = withErrorHandling(async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') ?? undefined;
  const messages = await listMessages({ search });
  return Response.json({ messages });
});

export const POST = withErrorHandling(async (request: Request) => {
  const body = await request.json();
  const saved = await createMessage(body);
  return Response.json({ ok: true, item: saved }, { status: 201 });
});
// app/api/messages/[id]/route.ts — ส่ง sessionUserId เข้าไปให้Service
export const PATCH = withErrorHandling(async (request: Request, ctx) => {
  const { params } = ctx as Ctx;
  const sessionUserId = await getSessionUserId(request); // อ่าน cookie session
  const updates = await request.json();
  const updated = await editMessage(params.id, updates, sessionUserId);
  return Response.json({ ok: true, item: updated });
});