/*
  Warnings:

  - Added the required column `delivery_cost` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `items_total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_cost" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "items_total" DECIMAL(10,2) NOT NULL;
