/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userRoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "userRoleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
