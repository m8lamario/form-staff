-- CreateEnum
CREATE TYPE "AgeBand" AS ENUM ('adult', 'minor16_17');

-- CreateEnum
CREATE TYPE "AgeDeclaration" AS ENUM ('adult', 'minor16_17');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending_guardian', 'submitted', 'accepted', 'rejected');

-- CreateEnum
CREATE TYPE "GuardianRelation" AS ENUM ('GENITORE', 'TUTORE', 'AFFIDATARIO');

-- CreateEnum
CREATE TYPE "G3Choice" AS ENUM ('other_parent', 'sole_holder');

-- CreateEnum
CREATE TYPE "ConsentActor" AS ENUM ('candidate', 'guardian1', 'guardian2', 'admin');

-- CreateEnum
CREATE TYPE "TokenPurpose" AS ENUM ('guardian1', 'guardian2', 'revoke');

-- AlterTable
ALTER TABLE "StaffApplication"
ADD COLUMN "birthDate" DATE,
ADD COLUMN "ageBand" "AgeBand",
ADD COLUMN "ageDeclaration" "AgeDeclaration",
ADD COLUMN "applicationStatus" "ApplicationStatus",
ADD COLUMN "guardianFirstName" TEXT,
ADD COLUMN "guardianLastName" TEXT,
ADD COLUMN "guardianRelation" "GuardianRelation",
ADD COLUMN "guardianEmail" TEXT,
ADD COLUMN "guardianPhone" TEXT,
ADD COLUMN "g3" "G3Choice",
ADD COLUMN "secondGuardianFirstName" TEXT,
ADD COLUMN "secondGuardianLastName" TEXT,
ADD COLUMN "secondGuardianEmail" TEXT;

-- CreateIndex
CREATE INDEX "StaffApplication_applicationStatus_idx" ON "StaffApplication"("applicationStatus");

-- CreateTable
CREATE TABLE "staff_consents" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "actor" "ConsentActor" NOT NULL,
    "document" TEXT,
    "document_version" TEXT,
    "text_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "user_agent" TEXT,
    "revoked_at" TIMESTAMP(3),
    "revoked_by" "ConsentActor",
    "revocation_note" TEXT,

    CONSTRAINT "staff_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff_tokens" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "purpose" "TokenPurpose" NOT NULL,
    "actor" "ConsentActor",
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "reminder_sent_at" TIMESTAMP(3),

    CONSTRAINT "staff_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staff_consents_application_id_idx" ON "staff_consents"("application_id");

-- CreateIndex
CREATE INDEX "staff_consents_key_idx" ON "staff_consents"("key");

-- CreateIndex
CREATE UNIQUE INDEX "staff_tokens_token_hash_key" ON "staff_tokens"("token_hash");

-- CreateIndex
CREATE INDEX "staff_tokens_application_id_idx" ON "staff_tokens"("application_id");

-- CreateIndex
CREATE INDEX "staff_tokens_purpose_idx" ON "staff_tokens"("purpose");

-- AddForeignKey
ALTER TABLE "staff_consents" ADD CONSTRAINT "staff_consents_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "StaffApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_tokens" ADD CONSTRAINT "staff_tokens_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "StaffApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
