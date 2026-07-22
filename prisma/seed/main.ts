import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { Prisma, PrismaClient } from '@/src/shared/api/prisma/generated/client';
import { ASSET_PATHS } from '@/src/shared/config';
import { generateUniqueSlug, getAssetUrl } from '@/src/shared/lib';
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
      "products",
      "product_images",
      "product_characteristics"
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
    const productSlug = generateUniqueSlug(productData.title);
    const coverImageAlt = `Главное фото товара ${productData.title.trim()}`;

    if (!categoryId) {
      console.warn(
        `⚠️ Категория со slug "${productData.categorySlug}" не найдена. Пропускаем товар: ${productData.title}`,
      );
      continue;
    }

    const {
      title,
      description,
      brand,
      price,
      oldPrice,
      discount,
      rating,
      stock,
      views,
      coverImage,
      coverThumbnail,
      images,
      characteristics,
    } = productData;

    const imagesWithAlt = images.map((image, index) => ({
      url: image.url,
      thumbnail: image.thumbnail || null,
      priority: image.priority || index,
      alt: `Фото ${index + 1} товара ${title.trim()}`,
    }));

    await prisma.product.create({
      data: {
        title: title.trim(),
        description: description || null,
        slug: productSlug,
        brand: brand,

        price: new Prisma.Decimal(String(price)),
        oldPrice: oldPrice ? new Prisma.Decimal(String(oldPrice)) : null,
        discount: discount ? Number(discount) : 0,

        rating: rating ? Number(rating) : 0,
        stock: stock ? Number(stock) : 0,
        views: views ? Number(views) : 0,

        coverImage: coverImage || null,
        coverThumbnail: coverThumbnail || null,
        coverImageAlt: coverImageAlt,

        categoryId: categoryId,

        characteristics: {
          create: characteristics.map((char) => ({
            name: char.name,
            value: char.value,
            isSearchable: char.isSearchable ?? false,
            priority: char.priority ?? 0,
          })),
        },
        images: {
          create: imagesWithAlt,
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
