import { getMessageById, editMessage, removeMessage } from '@/lib/messageService';
import { withErrorHandling } from '@/lib/withErrorHandling';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = withErrorHandling(async (request: Request, { params }: RouteContext) => {
  const { id } = await params;
  const message = await getMessageById(id);
  return Response.json({ message });
});

export const PATCH = withErrorHandling(async (request: Request, { params }: RouteContext) => {
  const { id } = await params;
  const updates = await request.json();
  const updated = await editMessage(id, updates, '');
  return Response.json({ ok: true, item: updated });
});

export const DELETE = withErrorHandling(async (request: Request, { params }: RouteContext) => {
  const { id } = await params;
  await removeMessage(id);
  return Response.json({ ok: true, message: 'ลบข้อมูลสำเร็จ' }, { status: 200 });
});