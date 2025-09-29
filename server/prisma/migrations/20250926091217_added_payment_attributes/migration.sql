/*
  Warnings:

  - You are about to drop the column `transaction_details` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "transaction_details",
ADD COLUMN     "amount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "cardBrand" TEXT,
ADD COLUMN     "cardHolderName" TEXT,
ADD COLUMN     "cardLast4" TEXT,
ADD COLUMN     "cardTransactionId" TEXT,
ADD COLUMN     "checkoutRequestId" TEXT,
ADD COLUMN     "merchantRequestId" TEXT,
ADD COLUMN     "mpesaReceiptNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "rawCallback" JSONB,
ADD COLUMN     "transactionDate" TIMESTAMP(3);
