-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "productCost" DROP NOT NULL,
ALTER COLUMN "productCost" SET DEFAULT 0;
