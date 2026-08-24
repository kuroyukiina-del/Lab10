import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 เริ่ม Seed ข้อมูล...');



  // Seed Messages (3 รายการ)
  const msg1 = await prisma.message.upsert({
    where: { email: 'somchai@example.com' },
    update: {},
    create: {
      name: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      message: 'สอบถามสินค้าครับ มีของพร้อมส่งไหม?',
    },
  });

  const msg2 = await prisma.message.upsert({
    where: { email: 'malee@example.com' },
    update: {},
    create: {
      name: 'มาลี รักไทย',
      email: 'malee@example.com',
      message: 'ต้องการสั่งซื้อ MacBook Pro จำนวน 2 เครื่องค่ะ',
    },
  });

  const msg3 = await prisma.message.upsert({
    where: { email: 'wichai@example.com' },
    update: {},
    create: {
      name: 'วิชัย ดีงาม',
      email: 'wichai@example.com',
      message: 'ขอใบเสนอราคาสำหรับบริษัทได้ไหมครับ',
    },
  });

  // Seed Admin User (1 รายการ)
  const hashed = await bcrypt.hash('1234', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@tsu.ac.th' },
    update: { password: hashed },
    create: { email: 'admin@tsu.ac.th', password: hashed },
  });
  console.log('✅ Admin User:', user);

  console.log('\n🎉 Seed สำเร็จ!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed ล้มเหลว:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
