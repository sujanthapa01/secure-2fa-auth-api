-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "totpSecret" TEXT;
