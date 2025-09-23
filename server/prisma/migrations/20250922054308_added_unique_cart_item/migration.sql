/*
  Warnings:

  - A unique constraint covering the columns `[productId,cartId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_cartId_key" ON "public"."CartItem"("productId", "cartId");
