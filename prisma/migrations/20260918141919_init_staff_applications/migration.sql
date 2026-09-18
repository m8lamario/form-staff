-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('RACCHETTA_PALLE', 'CASSA', 'INTERVISTE', 'GIORNALE', 'FOTOGRAFIA', 'SOCIAL', 'BUTTA_FUORI');

-- CreateTable
CREATE TABLE "StaffApplication" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "participatedLastYear" BOOLEAN NOT NULL,
    "role" "StaffRole" NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
    "privacyConsentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "privacyPolicyVersion" TEXT NOT NULL DEFAULT '1.0',
    "mediaConsent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffApplication_email_key" ON "StaffApplication"("email");

-- CreateIndex
CREATE INDEX "StaffApplication_role_idx" ON "StaffApplication"("role");

-- CreateIndex
CREATE INDEX "StaffApplication_createdAt_idx" ON "StaffApplication"("createdAt");

-- CreateIndex
CREATE INDEX "StaffApplication_email_idx" ON "StaffApplication"("email");
