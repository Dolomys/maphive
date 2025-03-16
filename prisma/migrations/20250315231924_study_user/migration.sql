-- CreateEnum
CREATE TYPE "StudyType" AS ENUM ('PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'PS6');

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "StudyType" NOT NULL,
    "level" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Study_userId_key" ON "Study"("userId");

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
