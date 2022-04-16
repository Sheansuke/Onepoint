/*
  Warnings:

  - Added the required column `lastName` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referencePlace` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `DeliveryAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryAddress" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "referencePlace" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
