-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "is_paid" BOOLEAN,
ADD COLUMN     "missions" TEXT[],
ADD COLUMN     "rating" INTEGER;
