/*
  Warnings:

  - You are about to drop the column `sender_email` on the `feedbacks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "sender_email",
ADD COLUMN     "senderEmail" TEXT;
