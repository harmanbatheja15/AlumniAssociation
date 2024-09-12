/*
  Warnings:

  - The `phoneVisibility` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PhoneVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneVisibility",
ADD COLUMN     "phoneVisibility" "PhoneVisibility" NOT NULL DEFAULT 'PUBLIC';
