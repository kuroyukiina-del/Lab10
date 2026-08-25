import 'dotenv/config';
import { createUser, findUserByEmail } from '../lib/users';
import { prisma } from '../lib/prisma';

// รับค่า email และ password จาก command-line arguments หรือใช้ค่า default
const email = process.argv[2] || 'student@tsu.ac.th';
const password = process.argv[3] || '123456';

async function main() {
  console.log(`⏳ กำลังสร้างบัญชีสำหรับ: ${email}...`);
  
  const existing = await findUserByEmail(email);
  if (existing) {
    console.log(`⚠️ บัญชีอีเมล ${email} มีอยู่ในระบบแล้ว`);
    return;
  }

  const user = await createUser(email, password);
  console.log('🎉 สร้างบัญชีผู้ใช้ใหม่สำเร็จ!');
  console.log(`   - ID: ${user.id}`);
  console.log(`   - Email: ${user.email}`);
  console.log(`   - Password: ${password}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ เกิดข้อผิดพลาด:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
