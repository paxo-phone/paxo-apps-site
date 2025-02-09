-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "extUrl" TEXT,
    "repoUrl" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "category" INTEGER NOT NULL,
    "underRevision" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_App" ("category", "createdAt", "downloads", "extUrl", "id", "imageUrl", "name", "repoUrl", "shortDesc", "updatedAt", "userId") SELECT "category", "createdAt", "downloads", "extUrl", "id", "imageUrl", "name", "repoUrl", "shortDesc", "updatedAt", "userId" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
CREATE TABLE "new_Release" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "changelogUrl" TEXT,
    "downloadUrl" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "underRevision" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appId" INTEGER NOT NULL,
    CONSTRAINT "Release_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Release" ("appId", "changelogUrl", "createdAt", "downloadUrl", "id", "name", "sourceUrl") SELECT "appId", "changelogUrl", "createdAt", "downloadUrl", "id", "name", "sourceUrl" FROM "Release";
DROP TABLE "Release";
ALTER TABLE "new_Release" RENAME TO "Release";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
