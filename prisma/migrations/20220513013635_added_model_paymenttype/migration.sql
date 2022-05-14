/*
  Warnings:

  - You are about to drop the column `paymentType` on the `Order` table. All the data in the column will be lost.
  - Added the required column `paymentTypeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentType",
ADD COLUMN     "paymentTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'efectivo contra entrega',

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_name_key" ON "PaymentType"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
