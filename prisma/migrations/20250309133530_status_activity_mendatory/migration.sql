/*
  Warnings:

  - Made the column `status` on table `activities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "status" SET NOT NULL;
