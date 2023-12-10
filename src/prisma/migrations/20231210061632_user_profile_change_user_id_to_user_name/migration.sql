/*
  Warnings:

  - You are about to drop the column `userId` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userUsername]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userUsername` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_userId_fkey";

-- DropIndex
DROP INDEX "UserProfile_userId_key";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userId",
ADD COLUMN     "userUsername" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userUsername_key" ON "UserProfile"("userUsername");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
