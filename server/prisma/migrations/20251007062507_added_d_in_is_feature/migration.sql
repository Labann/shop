/*
  Warnings:

  - You are about to drop the column `isFeature` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isFeature",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
