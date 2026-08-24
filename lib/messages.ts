import { prisma } from './prisma';

export async function addMessage(data: {
  name: string;
  email: string;
  message: string;
}) {
  return prisma.message.create({ data });
}

export async function getMessages(options?: { search?: string }) {
  if (options?.search) {
    return prisma.message.findMany({
      where: {
        OR: [
          { name: { contains: options.search, mode: 'insensitive' } },
          { email: { contains: options.search, mode: 'insensitive' } },
          { message: { contains: options.search, mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  return prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getMessageById(id: string) {
  return prisma.message.findUnique({
    where: { id },
  });
}

export const findMessageById = getMessageById;

export async function updateMessage(
  id: string,
  updates: { message?: string; name?: string; email?: string }
) {
  return prisma.message.update({ where: { id }, data: updates });
}

export async function deleteMessage(id: string) {
  return prisma.message.delete({ where: { id } });
}

