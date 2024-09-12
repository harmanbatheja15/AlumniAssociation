/*
  Warnings:

  - Changed the type of `branch` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "branch",
ADD COLUMN     "branch" TEXT NOT NULL;
