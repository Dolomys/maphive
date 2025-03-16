-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('draft', 'published', 'archived');

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "status" "ActivityStatus" DEFAULT 'draft';
