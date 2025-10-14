/*
  Warnings:

  - Made the column `userId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "userId" SET NOT NULL;
