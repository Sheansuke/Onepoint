-- CreateTable
CREATE TABLE "DeliveryAddress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DeliveryAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "inStock" INTEGER NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "items" JSONB[],
    "numberOfItems" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "orderStatusId" INTEGER NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryAddress_userId_key" ON "DeliveryAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatus_name_key" ON "OrderStatus"("name");

-- AddForeignKey
ALTER TABLE "DeliveryAddress" ADD CONSTRAINT "DeliveryAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "OrderStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
