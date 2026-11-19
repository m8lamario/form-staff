-- AlterEnum
ALTER TYPE "TokenPurpose" ADD VALUE 'reinform';

-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('queued', 'sent', 'error');

-- AlterTable
ALTER TABLE "staff_tokens" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "email_outbox" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "kind" TEXT NOT NULL,
    "to_email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "text_body" TEXT NOT NULL,
    "status" "OutboxStatus" NOT NULL DEFAULT 'queued',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "next_attempt_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_error" TEXT,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_outbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limit_hits" (
    "id" SERIAL NOT NULL,
    "bucket" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rate_limit_hits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "email_outbox_status_next_attempt_at_idx" ON "email_outbox"("status", "next_attempt_at");

-- CreateIndex
CREATE INDEX "email_outbox_application_id_idx" ON "email_outbox"("application_id");

-- CreateIndex
CREATE INDEX "rate_limit_hits_bucket_created_at_idx" ON "rate_limit_hits"("bucket", "created_at");

-- AddForeignKey
ALTER TABLE "email_outbox" ADD CONSTRAINT "email_outbox_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "StaffApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
