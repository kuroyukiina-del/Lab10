import { getMessages } from '@/lib/messages';
import LogoutButton from '@/components/LogoutButton';
import ChangePasswordForm from '@/components/ChangePasswordForm';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const messages = await getMessages();

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard (ต้อง Login ก่อน)</h1>
        <LogoutButton />
      </div>
 <ChangePasswordForm />
      <p className="mb-4 text-gray-700">จํานวนข้อความที่ได้รับ: {messages.length}</p>

      {messages.length === 0 ? (
        <p className="rounded border border-dashed border-gray-300 bg-white p-4 text-gray-500">
          ยังไม่มีข้อความที่ถูกส่งมา
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article key={message.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="font-semibold text-blue-800">{message.name}</h2>
                <span className="text-xs text-gray-400">
                  {new Date(message.createdAt).toLocaleString('th-TH')}
                </span>
              </div>
              <p className="text-sm text-gray-600">Email: {message.email}</p>
              <p className="mt-2 text-sm text-gray-700">{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}