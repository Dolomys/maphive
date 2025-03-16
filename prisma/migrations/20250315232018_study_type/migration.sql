/*
  Warnings:

  - The values [PS1,PS2,PS3,PS4,PS5,PS6] on the enum `StudyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StudyType_new" AS ENUM ('GACO', 'MDFS', 'MCMO', 'MACAST', 'CJ', 'INFOCOM');
ALTER TABLE "Study" ALTER COLUMN "type" TYPE "StudyType_new" USING ("type"::text::"StudyType_new");
ALTER TYPE "StudyType" RENAME TO "StudyType_old";
ALTER TYPE "StudyType_new" RENAME TO "StudyType";
DROP TYPE "StudyType_old";
COMMIT;
