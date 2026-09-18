-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaffApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "participatedLastYear" BOOLEAN NOT NULL,
    "role" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
    "privacyConsentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "privacyPolicyVersion" TEXT NOT NULL DEFAULT '1.0',
    "mediaConsent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_StaffApplication" ("createdAt", "email", "firstName", "id", "lastName", "participatedLastYear", "phone", "role", "updatedAt") SELECT "createdAt", "email", "firstName", "id", "lastName", "participatedLastYear", "phone", "role", "updatedAt" FROM "StaffApplication";
DROP TABLE "StaffApplication";
ALTER TABLE "new_StaffApplication" RENAME TO "StaffApplication";
CREATE UNIQUE INDEX "StaffApplication_email_key" ON "StaffApplication"("email");
CREATE INDEX "StaffApplication_role_idx" ON "StaffApplication"("role");
CREATE INDEX "StaffApplication_createdAt_idx" ON "StaffApplication"("createdAt");
CREATE INDEX "StaffApplication_email_idx" ON "StaffApplication"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
