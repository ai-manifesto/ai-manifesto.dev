-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('github', 'linkedin');

-- CreateTable
CREATE TABLE "public"."signees" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "display_name" TEXT,
    "avatar_url" TEXT NOT NULL,
    "profile_url" TEXT NOT NULL,
    "signed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "signees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "signees_signed_at_idx" ON "public"."signees"("signed_at" DESC);

-- CreateIndex
CREATE INDEX "signees_provider_idx" ON "public"."signees"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "signees_provider_id_provider_key" ON "public"."signees"("provider_id", "provider");
