/*
  Warnings:

  - A unique constraint covering the columns `[user_hash]` on the table `signees` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."signees" ADD COLUMN     "privacy_level" TEXT NOT NULL DEFAULT 'full',
ADD COLUMN     "show_profile_pic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "signees_user_hash_key" ON "public"."signees"("user_hash");
