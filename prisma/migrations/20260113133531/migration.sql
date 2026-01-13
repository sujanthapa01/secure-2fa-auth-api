/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "adminRole" AS ENUM ('SUPER_ADMIN', 'ADMIN');

-- DropTable
DROP TABLE "Admin";

-- DropEnum
DROP TYPE "AdminRole";

-- CreateTable
CREATE TABLE "admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "adminRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_adminId_key" ON "admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
