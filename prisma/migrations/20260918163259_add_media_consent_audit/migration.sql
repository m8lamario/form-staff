-- AlterTable
ALTER TABLE "StaffApplication" ADD COLUMN     "mediaConsentAt" TIMESTAMP(3),
ADD COLUMN     "mediaPolicyVersion" TEXT NOT NULL DEFAULT '1.0';
