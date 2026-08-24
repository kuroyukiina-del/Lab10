// lib/users.ts — แทนที่ mock array เดิมทั้งหมด
import bcrypt from 'bcrypt';
import { prisma } from './prisma';

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(email: string, plainPassword: string) {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  return prisma.user.create({ data: { email, password: hashedPassword } });
}

// L1: hash รหัสผ่านใหม่ก่อนบันทึกเสมอ
export async function updateUserPassword(id: string, newPlainPassword: string) {
  const hashedPassword = await bcrypt.hash(newPlainPassword, 10);
  return prisma.user.update({ where: { id }, data: { password: hashedPassword } });
}