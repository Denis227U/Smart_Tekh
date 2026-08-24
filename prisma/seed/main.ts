import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { Prisma, PrismaClient } from '@/src/shared/api/prisma/generated/client';
import { ASSET_PATHS } from '@/src/shared/config';
import { generateUniqueSlug, getAssetUrl } from '@/src/shared/lib';
import { categories } from './data/categories';
import { products } from './data/products';
import { dummyReviews } from './data/reviews';
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
      "product_characteristics",
      "product_reviews"
    RESTART IDENTITY CASCADE;
  `;

  console.log('🌱 Seeding started...');

  // --- USERS ---
  console.log('📦 Seeding users...');
  let usersCount = 0;
  let createdUsers: { id: string; username: string | null }[] = [];

  for (const u of users) {
    const { password, avatar, ...uData } = u;

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const avatarSrc = avatar
      ? getAssetUrl(ASSET_PATHS.USER_AVATARS, avatar, false)
      : undefined;

    const savedUser = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        ...(hashedPassword && { password: hashedPassword }),
      },
      create: {
        ...uData,
        avatar: avatarSrc,
        password: hashedPassword,
      },
    });

    createdUsers.push({ id: savedUser.id, username: savedUser.username });
    usersCount++;
  }
  createdUsers = createdUsers.filter(
    (user) => user.username !== 'Admin' && user.username !== 'Test User',
  );
  console.log(`✅ Seeding users finished. Processed ${usersCount} users.`);

  // --- CATEGORIES ---
  console.log('📦 Seeding categories...');
  let categoriesCount = 0;
  const categoriesSlugToId: Record<string, string> = {};
  for (const cat of categories) {
    const { icon: iconFile, ...catData } = cat;

    const iconSrc = iconFile
      ? getAssetUrl(ASSET_PATHS.CATEGORIES, iconFile, false)
      : undefined;

    const savedCategory = await prisma.category.create({
      data: {
        ...catData,
        icon: iconSrc,
      },
    });

    categoriesCount++;
    categoriesSlugToId[cat.slug] = savedCategory.id;
  }
  console.log(
    `✅ Seeding categories finished. Processed ${categoriesCount} categories.`,
  );

  // --- PRODUCTS AND REVIEWS ---
  console.log('📦 Seeding products...');
  let productsCount = 0;
  let totalReviewsCount = 0;

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

    await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          title: title.trim(),
          description: description || null,
          slug: productSlug,
          brand: brand,

          price: new Prisma.Decimal(String(price)),
          oldPrice: oldPrice ? new Prisma.Decimal(String(oldPrice)) : null,
          discount: discount ? Number(discount) : 0,

          rating: 0,
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

      // There is a 30% chance of the product having no reviews
      const skipReviews = Math.random() < 0.3;

      if (!skipReviews && createdUsers.length > 0) {
        const MIN_REVIEWS_PER_PRODUCT = 2;
        const MAX_REVIEWS_PER_PRODUCT = 5;

        // Limit reviews by real user count
        const maxPossibleReviews = Math.min(
          createdUsers.length,
          MAX_REVIEWS_PER_PRODUCT,
        );
        const reviewsToCreateCount =
          Math.floor(
            Math.random() * (maxPossibleReviews - MIN_REVIEWS_PER_PRODUCT + 1),
          ) + MIN_REVIEWS_PER_PRODUCT;

        // Track unique users for current product
        const reviewedUserIds = new Set<string>();

        for (let i = 0; i < reviewsToCreateCount; i++) {
          const availableUsers = createdUsers.filter(
            (u) => !reviewedUserIds.has(u.id),
          );
          if (availableUsers.length === 0) break;

          const randomUser =
            availableUsers[Math.floor(Math.random() * availableUsers.length)];
          reviewedUserIds.add(randomUser.id);

          const reviewTemplate =
            dummyReviews[Math.floor(Math.random() * dummyReviews.length)];

          await tx.productReview.create({
            data: {
              productId: product.id,
              userId: randomUser.id,
              authorName: randomUser.username || 'Покупатель',
              rating: reviewTemplate.rating,
              text: reviewTemplate.text,
            },
          });
          totalReviewsCount++;
        }

        // Aggregate review count and average rating for current product
        const aggregates = await tx.productReview.aggregate({
          where: { productId: product.id },
          _count: { id: true },
          _avg: { rating: true },
        });

        const count = aggregates._count.id;
        const averageRating = aggregates._avg.rating
          ? Math.round(aggregates._avg.rating * 10) / 10
          : 0;

        await tx.product.update({
          where: { id: product.id },
          data: {
            rating: new Prisma.Decimal(averageRating),
            reviewsCount: count,
          },
        });
      }
    });

    productsCount++;
  }

  console.log(
    `✅ Seeding products finished. Processed ${productsCount} products.`,
  );
  console.log(
    `✅ Seeding reviews finished. Created ${totalReviewsCount} reviews.`,
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
