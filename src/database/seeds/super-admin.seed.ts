import 'dotenv/config';
import { PrismaClient, adminRole } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

prisma.$on('query', (e) => {
  console.log('Query executed:', e.query);
});

prisma.$on('error', (e) => {
  console.error('Prisma error event:', e.message);
});

export const seedSuperAdmin = async () => {
  await prisma.$connect();
  console.log('Prisma connected');

  // Check which database we are connected to
  const result: { current_database: string }[] =
    await prisma.$queryRaw`SELECT current_database();`;
  console.log('Connected to DB:', result[0].current_database);

  const email = process.env.SUPER_ADMIN_EMAIL!;
  const password = process.env.SUPER_ADMIN_PASSWORD!;
  const name = process.env.SUPER_ADMIN_NAME!;

  if (!email || !password || !name) {
    console.error('Missing environment variables for super admin!');
    await prisma.$disconnect();
    return;
  }

  try {
    const existed = await prisma.admin.findFirst({ where: { email } });
    if (existed) {
      console.log('Super Admin already exists:', email);
      await prisma.$disconnect();
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: adminRole.SUPER_ADMIN,
      },
    });

    console.log('Super Admin seeded successfully:', admin);
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
  }
};

// If run directly, seed
(async () => {
  if (require.main === module) {
    await seedSuperAdmin();
  }
})();
