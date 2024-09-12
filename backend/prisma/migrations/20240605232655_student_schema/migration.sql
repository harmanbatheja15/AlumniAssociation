/*
  Warnings:

  - Made the column `course` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "course" SET NOT NULL;
