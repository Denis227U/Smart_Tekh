/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "comments_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cover_image_alt" TEXT,
ADD COLUMN     "cover_thumbnail" TEXT,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "old_price" DECIMAL(10,2),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "product_characteristics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "is_searchable" BOOLEAN NOT NULL DEFAULT false,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_characteristics_product_id_priority_idx" ON "product_characteristics"("product_id", "priority" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "product_characteristics_product_id_name_value_key" ON "product_characteristics"("product_id", "name", "value");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_category_id_price_idx" ON "products"("category_id", "price");

-- CreateIndex
CREATE INDEX "products_category_id_created_at_idx" ON "products"("category_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "products_category_id_rating_idx" ON "products"("category_id", "rating" DESC);

-- CreateIndex
CREATE INDEX "products_category_id_views_idx" ON "products"("category_id", "views" DESC);

-- CreateIndex
CREATE INDEX "products_brand_idx" ON "products"("brand");

-- AddForeignKey
ALTER TABLE "product_characteristics" ADD CONSTRAINT "product_characteristics_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
