/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shop_name_key" ON "public"."Shop"("name");
