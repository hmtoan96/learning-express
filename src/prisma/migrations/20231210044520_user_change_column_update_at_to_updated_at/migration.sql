/*
  Warnings:

  - You are about to drop the column `udpateAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "udpateAt",
ADD COLUMN     "udpatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
