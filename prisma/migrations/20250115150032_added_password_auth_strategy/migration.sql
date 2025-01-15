-- CreateTable
CREATE TABLE "PasswordAuthStrategy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "passwordHash" TEXT NOT NULL,
    CONSTRAINT "PasswordAuthStrategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordAuthStrategy_userId_key" ON "PasswordAuthStrategy"("userId");
