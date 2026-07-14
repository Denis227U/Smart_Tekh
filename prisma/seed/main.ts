import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { Prisma, PrismaClient } from '@/src/shared/api/prisma/generated/client';
import { ASSET_PATHS } from '@/src/shared/config';
import { getAssetUrl } from '@/src/shared/lib';
import { categories } from './data/categories';
import { products } from './data/products';
import { users } from './data/users';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Очистка базы данных ---');

  await prisma.$executeRaw`
    TRUNCATE TABLE
      "verification_tokens",
      "accounts",
      "sessions",
      "users",
      "categories",
      "products"
    RESTART IDENTITY CASCADE;
  `;

  console.log('🌱 Seeding started...');

  // --- ЮЗЕРЫ ---
  console.log('📦 Seeding users...');
  let usersCount = 0;
  for (const u of users) {
    const { password, ...uData } = u;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        ...(hashedPassword && { password: hashedPassword }),
      },
      create: {
        ...uData,
        password: hashedPassword,
      },
    });

    usersCount++;
  }
  console.log(`✅ Seeding users finished. Processed ${usersCount} users.`);

  // --- КАТЕГОРИИ ---
  console.log('📦 Seeding categories...');
  let categoriesCount = 0;
  const categoriesSlugToId: Record<string, string> = {};
  for (const cat of categories) {
    const { icon: iconFile, ...catData } = cat;

    const iconUrl = iconFile
      ? getAssetUrl(ASSET_PATHS.CATEGORIES, iconFile, false)
      : undefined;

    const savedCategory = await prisma.category.create({
      data: {
        ...catData,
        icon: iconUrl,
      },
    });

    categoriesCount++;
    categoriesSlugToId[cat.slug] = savedCategory.id;
  }
  console.log(
    `✅ Seeding categories finished. Processed ${categoriesCount} categories.`,
  );

  // --- ПРОДУКТЫ ---
  console.log('📦 Seeding products...');
  let productsCount = 0;

  for (const productData of products) {
    const categoryId = categoriesSlugToId[productData.categorySlug];

    if (!categoryId) {
      console.warn(
        `⚠️ Категория со slug "${productData.categorySlug}" не найдена. Пропускаем товар: ${productData.title}`,
      );
      continue;
    }

    const { categorySlug: _, price, rating, ...restProductData } = productData;

    await prisma.product.create({
      data: {
        ...restProductData,
        price: new Prisma.Decimal(Number(price)),
        rating: rating ? new Prisma.Decimal(Number(rating)) : undefined,
        category: {
          connect: { id: categoryId },
        },
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
