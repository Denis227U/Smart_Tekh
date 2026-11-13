/*
  Warnings:

  - Changed the type of `code` on the `payment_methods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodCode" AS ENUM ('CARD_ONLINE', 'SBP', 'CASH_ON_DELIVERY', 'CARD_ON_DELIVERY');

-- AlterTable
ALTER TABLE "payment_methods" DROP COLUMN "code",
ADD COLUMN     "code" "PaymentMethodCode" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_code_key" ON "payment_methods"("code");
