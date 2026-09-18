-- CreateTable
CREATE TABLE "StaffApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "participatedLastYear" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffApplication_email_key" ON "StaffApplication"("email");

-- CreateIndex
CREATE INDEX "StaffApplication_role_idx" ON "StaffApplication"("role");

-- CreateIndex
CREATE INDEX "StaffApplication_createdAt_idx" ON "StaffApplication"("createdAt");

-- CreateIndex
CREATE INDEX "StaffApplication_email_idx" ON "StaffApplication"("email");
