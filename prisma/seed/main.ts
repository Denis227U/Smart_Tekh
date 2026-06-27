import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/src/shared/api/prisma/generated/client';

import { products } from './data/products';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Очистка базы данных ---');

  await prisma.$executeRaw`
  TRUNCATE TABLE
    "products"
  RESTART IDENTITY CASCADE;
`;

  console.log('🌱 Seeding started...');

  // --- ПРОДУКТЫ ---
  console.log('📦 Seeding products...');
  let productsCount = 0;

  for (const productData of products) {
    await prisma.product.create({
      data: {
        ...productData,
      },
    });

    productsCount++;
  }

  console.log(
    `✅ Seeding products finished. Processed ${productsCount} products.`,
  );

  console.log('✅ Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
