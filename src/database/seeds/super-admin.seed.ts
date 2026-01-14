import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Prisma } from '../../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
});

export const seedSuperAdmin = async () => {
  await prisma.$connect();
  console.log('Prisma connected');

  const db =
    await prisma.$queryRaw<{ current_database: string }[]>`
      SELECT current_database();
    `;
  console.log('Connected DB:', db[0].current_database);

  const email = process.env.SUPER_ADMIN_EMAIL!;
  const password = process.env.SUPER_ADMIN_PASSWORD!;
  const name = process.env.SUPER_ADMIN_NAME!;

  if (!email || !password || !name) {
    throw new Error('Missing SUPER_ADMIN env vars');
  }

  const existed = await prisma.admin.findFirst({ where: { email } });
  if (existed) {
    console.log('Super Admin already exists:', email);
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name,
      email,
      password: hashPassword,
      role: 'SUPER_ADMIN',
      isTotpEnabled: false,
      isActive: true,
    },
  });

  console.log('Super Admin seeded:', admin);
};

seedSuperAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
