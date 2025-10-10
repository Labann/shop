/*
  Warnings:

  - A unique constraint covering the columns `[cartItemId]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "cartItemId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_cartItemId_key" ON "OrderItem"("cartItemId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_cartItemId_fkey" FOREIGN KEY ("cartItemId") REFERENCES "CartItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
